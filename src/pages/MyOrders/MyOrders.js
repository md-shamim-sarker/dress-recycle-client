import React, {useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {AuthContext} from '../../contexts/UserContext';
import MyOrder from './MyOrder';

const MyOrders = () => {
    const {user, render, setRender} = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    const handleDelete = order => {
        fetch(`http://localhost:5000/orders/${order._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Successfully Cancelled!');
                setRender(!render);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetch(`http://localhost:5000/orders/${user?.email}`, {
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

    return (
        <div>
            <h2 className='text-2xl font-bold text-center my-10'>My Orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Picture</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Cancel Order</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, sl) => <MyOrder
                                key={product?._id}
                                product={product}
                                sl={sl + 1}
                                handleDelete={handleDelete}
                            // modalHandler={modalHandler}
                            // handleDelete={handleDelete}
                            ></MyOrder>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;