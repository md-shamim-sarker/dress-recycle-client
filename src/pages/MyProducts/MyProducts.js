import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/UserContext';
import MyProduct from './MyProduct';

const MyProducts = () => {
    const {user, render, setRender} = useContext(AuthContext);
    const [myProducts, setMyProducts] = useState([]);

    const advertiseHandler = product => {
        console.log(product._id);
        fetch(`http://localhost:5000/products/advertise2/${product._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
            alert("Advertise Successfull!!!");
        }).catch(err => console.log(err));
    };

    const unAdvertiseHandler = product => {
        console.log(product._id);
        fetch(`http://localhost:5000/products/unAdvertise2/${product._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
            alert("Unadvertise Successfull!!!");
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        fetch(`http://localhost:5000/products/${user?.email}`)
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
                            myProducts.map((myProduct, sl) => <MyProduct
                                key={myProduct?._id}
                                myProduct={myProduct}
                                sl={sl + 1}
                                advertiseHandler={advertiseHandler}
                                unAdvertiseHandler={unAdvertiseHandler}
                            ></MyProduct>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;