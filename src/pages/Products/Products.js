import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useLoaderData} from 'react-router-dom';
import {AuthContext} from '../../contexts/UserContext';
import Product from './Product';
import ProductBanner from './ProductBanner';

const Products = () => {
    const {user, dataAddToDb} = useContext(AuthContext);
    const products = useLoaderData();
    const categoryImage = products[0].categoryImage;
    const [modalInfo, setModalInfo] = useState({});
    const {register, handleSubmit} = useForm();

    const modalInfoHandler = (data) => {
        const ordersInfo = {
            userName: user.displayName,
            email: user.email,
            productId: data._id,
            productName: data.productName,
            price: data.resalePrice + " Taka",
            date: Date().slice(4, 24)
        };
        setModalInfo(ordersInfo);
    };

    const onSubmit = data => {
        const orders = {
            userName: modalInfo.userName,
            email: modalInfo.email,
            phone: data.phone,
            productName: modalInfo.productName,
            price: modalInfo.price + " Taka",
            meetingLocation: data.meetingLocation,
            productId: modalInfo.productId,
            orderDate: modalInfo.date
        };
        dataAddToDb(orders, 'http://localhost:5000/orders')
            .then(() => {
                alert("Successfull!!!");
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <ProductBanner categoryImage={categoryImage}></ProductBanner>
            <div className='w-4/5 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        user={user}
                        modalInfo={modalInfo}
                        setModalInfo={setModalInfo}
                        modalInfoHandler={modalInfoHandler}
                    ></Product>)
                }
            </div>

            {/* *************Modal*********** */}
            <input type="checkbox" id="order-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="order-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-2xl font-bold text-center">Order Information</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3 mt-3'>
                        <div className="form-control w-full">
                            <input {...register("userName")} type="text" defaultValue={modalInfo.userName} readOnly className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("email")} type="text" defaultValue={modalInfo.email} readOnly className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("phone")} type="text" placeholder='Phone Number' className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("product")} type="text" defaultValue={modalInfo.productName} readOnly className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("price")} type="text" defaultValue={modalInfo.price} readOnly className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("meetingLocation")} type="text" placeholder='Meeting Location' className="input input-bordered w-full" />
                        </div>
                        <button type='submit' className="btn btn-primary w-full">Order Now</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Products;