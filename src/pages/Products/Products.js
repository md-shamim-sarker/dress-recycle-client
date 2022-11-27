import React, {useContext, useState} from 'react';
import {useLoaderData} from 'react-router-dom';
import {AuthContext} from '../../contexts/UserContext';
import OrderModal from '../OrderModal/OrderModal';
import Product from './Product';
import ProductBanner from './ProductBanner';

const Products = () => {
    const {user} = useContext(AuthContext);
    const products = useLoaderData();
    const [product, setProduct] = useState(null);
    const categoryImage = products[0].categoryImage;

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
            <ProductBanner categoryImage={categoryImage}></ProductBanner>
            <div className='w-4/5 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        modalHandler={modalHandler}
                        wishListHandler={wishListHandler}
                    ></Product>)
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

export default Products;