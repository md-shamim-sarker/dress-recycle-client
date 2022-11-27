import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../contexts/UserContext';
import OrderModal from '../../OrderModal/OrderModal';
import AdCard from './AdCard';

const Advertise = () => {
    const {user} = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const {render, setRender} = useContext(AuthContext);


    useEffect(() => {
        fetch('http://localhost:5000/products/all/advertise')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, []);

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
        fetch('http://localhost:5000/wishLists', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(wishList)
        }).then(() => {
            alert("Add to wishlist successfull!!");
        }).catch(error => {
            console.error(error.message);
        });
    };


    const reportHandler = (product) => {
        fetch(`http://localhost:5000/products/${product._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
            alert(`Report to Admin Success for ${product.productName}`);
        }).catch(err => console.log(err));
    };

    const modalHandler = (product) => {
        const orderData = {
            productName: product.productName,
            productPrice: product.resalePrice + " TK",
            productId: product._id,
            orderDate: Date().slice(4, 24),
            sellerName: product.sellerName,
            sellerEmail: product.sellerEmail,
            sellerPhone: product.sellerPhone,
        };
        setProduct(orderData);
    };

    return (
        <>
            <h2 className='text-4xl text-blue-600 font-bold text-center my-10'>Advertisement</h2>
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