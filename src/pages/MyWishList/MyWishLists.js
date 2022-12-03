import React, {useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {AuthContext} from '../../contexts/UserContext';
import OrderModal from '../OrderModal/OrderModal';
import MyWishList from './MyWishList';

const MyWishLists = () => {
    const {user, render, setRender} = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://dress-recycle-server.vercel.app/wishLists/${user?.email}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => console.log(err));
    }, [user?.email, render]);

    const handleDelete = product => {
        fetch(`https://dress-recycle-server.vercel.app/wishLists/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Successfully Cancelled!');
                setRender(!render);
            })
            .catch(err => console.log(err));
    };

    const modalHandler = (product) => {
        const orderData = {
            productId: product.productId,
            productName: product.productName,
            productImage: product.productImage,
            productPrice: product.productPrice + " TK",
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
                                    handleDelete={handleDelete}
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