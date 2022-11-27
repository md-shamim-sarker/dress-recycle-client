import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/UserContext';
import OrderModal from '../OrderModal/OrderModal';
import MyWishList from './MyWishList';

const MyWishLists = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const {user, render} = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/wishLists/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => console.log(err));
    }, [user?.email, render]);

    console.log(products);

    const modalHandler = (product) => {
        const orderData = {
            productName: product.productName,
            productPrice: product.productPrice + " TK",
            productId: product.productId,
            orderDate: Date().slice(4, 24),
            sellerName: product.sellerName,
            sellerEmail: product.sellerEmail,
            sellerPhone: product.sellerPhone,
        };
        setProduct(orderData);
    };

    return (
        <>
            <div>
                <h2 className='text-2xl font-bold text-center my-10'>My Wish Lists</h2>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Picture</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Cancel</th>
                                <th>Order Now</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((myWishList, sl) => <MyWishList
                                    key={myWishList?._id}
                                    myWishList={myWishList}
                                    sl={sl + 1}
                                    modalHandler={modalHandler}
                                ></MyWishList>)
                            }
                        </tbody>
                    </table>
                </div>
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

export default MyWishLists;