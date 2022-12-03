import React, {useContext, useEffect, useState} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {AuthContext} from '../../contexts/UserContext';
import toast from 'react-hot-toast';

const CheckoutForm = ({product}) => {
    const {dataAddToDb, render, setRender} = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        fetch(`https://dress-recycle-server.vercel.app/products2/${product?.productId}`)
            .then(res => res.json())
            .then(data => setProductInfo(data))
            .catch(err => console.log(err));
    }, [product?.productId, render]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if(card == null) {
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if(error) {
            console.log('[error]', error);
        } else {
            const paymentsDetails = {
                ...product,
                paymentDate: Date().slice(4, 24),
            };
            dataAddToDb(paymentsDetails, 'https://dress-recycle-server.vercel.app/payments')
                .then((result) => {
                    if(result.ok) {
                        fetch(`https://dress-recycle-server.vercel.app/products/soldOut/${product?.productId}`, {
                            method: 'PUT',
                        }).then(() => {
                            toast.success('Payment Successfull!');
                            setRender(!render);
                        }).catch(err => console.log(err));
                    }
                }).catch(console.dir);
            console.log(paymentMethod);
        }
    };

    return (
        <div className='w-4/5 mx-auto'>
            <h2 className='text-3xl font-bold text-blue-600 text-center mt-16 mb-10'>Payment Gateway</h2>
            <form onSubmit={handleSubmit}>
                <CardElement className='border p-6 bg-blue-100 rounded-xl'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    productInfo?.soldOut
                        ? <button className='btn btn-primary btn-sm w-20 mt-3' disabled>
                            Paid
                        </button>
                        : <button className='btn btn-primary btn-sm w-20 mt-3' type="submit" disabled={!stripe}>
                            Pay
                        </button>
                }
                <label htmlFor="fake-card-number" className="btn btn-primary btn-sm ml-3">Fake Card Number</label>
            </form>

            {
                productInfo?.soldOut && <>
                    <div className="card card-side bg-base-100 shadow-xl my-6">
                        <figure><img src={product?.productImage} alt="..." /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Payment Successfull!</h2>
                            <p>
                                Product Name: {product.productName} <br />
                                Product Price: {product.productPrice} <br />
                                Seller Name: {product.sellerName} <br />
                                Seller Phone: {product.sellerPhone} <br />
                                Buyer Name: {product.userName} <br />
                                Buyer Phone: {product.userPhone} <br />
                                Payment Date: {product.paymentDate}
                            </p>
                        </div>
                    </div>
                </>
            }

            {/* Modal */}
            <input type="checkbox" id="fake-card-number" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="fake-card-number" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Some Fake Card Numbers</h3>
                    <p>Any Future Date, 3 Digits CVC and 5 Digits ZIP</p>
                    <pre className="py-4">
                        <strong>Visa</strong>	4242424242424242<br />
                        <strong>Visa(debit)</strong>	4000056655665556<br />
                        <strong>Mastercard</strong>	5555555555554444<br />
                        <strong>Mastercard(debit)</strong>	5200828282828210<br />
                        <strong>Mastercard(prepaid)</strong>	5105105105105100
                    </pre>
                </div>
            </div>
        </div >
    );
};

export default CheckoutForm;

