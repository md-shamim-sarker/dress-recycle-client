import React, {useContext, useState} from 'react';
import toast from 'react-hot-toast';
import {useLoaderData} from 'react-router-dom';
import {AuthContext} from '../../contexts/UserContext';
import OrderModal from '../OrderModal/OrderModal';
import Product from './Product';
import ProductBanner from './ProductBanner';

const Products = () => {
    const {user, reportConfirmation} = useContext(AuthContext);
    const products = useLoaderData();
    const [product, setProduct] = useState(null);
    const categoryImage = products[0]?.categoryImage;

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
                        reportHandler={reportHandler}
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