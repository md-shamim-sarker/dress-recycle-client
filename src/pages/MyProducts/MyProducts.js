import React, {useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {AuthContext} from '../../contexts/UserContext';
import MyProduct from './MyProduct';

const MyProducts = () => {
    const {user, render, setRender, deleteConfirmation} = useContext(AuthContext);
    const [myProducts, setMyProducts] = useState([]);

    const advertiseHandler = product => {
        // console.log(product._id);
        fetch(`http://localhost:5000/products/advertise2/${product._id}`, {
            method: 'PUT',
        }).then(() => {
            toast.success('Successfully Add to Advertise!');
            setRender(!render);
        }).catch(err => console.log(err));
    };

    const unAdvertiseHandler = product => {
        // console.log(product._id);
        fetch(`http://localhost:5000/products/unAdvertise2/${product._id}`, {
            method: 'PUT',
        }).then(() => {
            toast.success('Successfully Remove from Advertise!');
            setRender(!render);
        }).catch(err => console.log(err));
    };

    const unSoldOutHandler = product => {
        fetch(`http://localhost:5000/products/unSoldOut/${product._id}`, {
            method: 'PUT',
        }).then(() => {
            toast.success('Successfully Make Available!');
            setRender(!render);
        }).catch(err => console.log(err));
    };

    const handleDelete = product => {
        deleteConfirmation()
            .then((result) => {
                if(result.isConfirmed) {
                    fetch(`http://localhost:5000/products/${product._id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(() => {
                            toast.success('Successfully Deleted!');
                            setRender(!render);
                        })
                        .catch(err => console.log(err));
                } else {
                    toast.success('Delete Cancel!');
                }

            });
    };

    useEffect(() => {
        fetch(`http://localhost:5000/products/${user?.email}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => setMyProducts(data))
            .catch(err => console.log(err));
    }, [user?.email, render]);

    return (
        <div>
            <h2 className='text-2xl font-bold text-center my-10'>My All Products</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Picture</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Advertise</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // myProducts.length > 0 &&
                            myProducts.map((myProduct, sl) => <MyProduct
                                key={myProduct?._id}
                                myProduct={myProduct}
                                sl={sl + 1}
                                advertiseHandler={advertiseHandler}
                                unAdvertiseHandler={unAdvertiseHandler}
                                handleDelete={handleDelete}
                                unSoldOutHandler={unSoldOutHandler}
                            ></MyProduct>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;