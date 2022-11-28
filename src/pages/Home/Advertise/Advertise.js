import React, {useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {AuthContext} from '../../../contexts/UserContext';
import OrderModal from '../../OrderModal/OrderModal';
import AdCard from './AdCard';

const Advertise = () => {
    const {user, reportConfirmation} = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);

    const wishListHandler = (product) => {
        const wishList = {
            userName: user?.displayName,
            userEmail: user?.email,
            sellerName: product.sellerName,
            sellerEmail: product.sellerEmail,
            sellerPhone: product.sellerPhone,
            productId: product._id,
            productName: product.productName,
            productImage: product.image,
            productPrice: product.resalePrice,
            wishDate: Date().slice(4, 24)
        };
        console.log(wishList);
        fetch('https://dress-recycle-server.vercel.app/wishLists', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(wishList)
        }).then(() => {
            toast.success('Successfully Add to Wishlist!');
        }).catch(error => {
            console.error(error.message);
        });
    };

    const reportHandler = (product) => {
        reportConfirmation()
            .then((result) => {
                if(result.isConfirmed) {
                    fetch(`https://dress-recycle-server.vercel.app/products/report/${product._id}`, {
                        method: 'PUT',
                    }).then(() => {
                        toast.success('Successfully Reported!');
                    }).catch(err => console.log(err));
                } else {
                    toast.success('Thank you for change your decision!');
                }
            });
    };

    const modalHandler = (product) => {
        const orderData = {
            productId: product._id,
            productName: product.productName,
            productImage: product.image,
            productPrice: product.resalePrice + " TK",
            orderDate: Date().slice(4, 24),
            sellerName: product.sellerName,
            sellerEmail: product.sellerEmail,
            sellerPhone: product.sellerPhone,
        };
        setProduct(orderData);
    };

    useEffect(() => {
        fetch('https://dress-recycle-server.vercel.app/products/all/advertise')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            {
                products.length > 0 && <h2 className='text-4xl text-blue-600 font-bold text-center my-10'>Advertisement</h2>
            }

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    products.map(adItem => <AdCard
                        key={adItem._id}
                        adItem={adItem}
                        modalHandler={modalHandler}
                        wishListHandler={wishListHandler}
                        reportHandler={reportHandler}
                    ></AdCard>)
                }
            </div>
            {
                product && <OrderModal
                    product={product}
                    setProduct={setProduct}
                ></OrderModal>
            }
        </>
    );
};

export default Advertise;