import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {AuthContext} from '../../../contexts/UserContext';
import AdCard from './AdCard';

const Advertise = () => {
    const {user, dataAddToDb} = useContext(AuthContext);
    const [adItems, setAdItems] = useState([]);
    const [modalInfo, setModalInfo] = useState({});
    const {register, handleSubmit} = useForm();

    const modalInfoHandler = (product) => {
        const modalInfos = {
            userName: user?.displayName,
            email: user?.email,
            productName: product.productName,
            productId: product._id,
            price: product.resalePrice,
            date: Date().slice(4, 24)
        };
        setModalInfo(modalInfos);
        console.log(modalInfo.price);
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

    useEffect(() => {
        fetch('http://localhost:5000/products/all/advertise')
            .then(res => res.json())
            .then(data => setAdItems(data))
            .catch(err => console.log(err));
    }, []);
    // console.log(adItems);

    return (
        <>
            <h2 className='text-4xl text-blue-600 font-bold text-center my-10'>Advertisement</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    adItems.map(adItem => <AdCard
                        key={adItem._id}
                        adItem={adItem}
                        setModalInfo={setModalInfo}
                        modalInfoHandler={modalInfoHandler}
                    ></AdCard>)
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
                            <input {...register("userName")} type="text" defaultValue={modalInfo?.userName} className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("email")} type="text" defaultValue={modalInfo?.email} className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("phone")} type="text" placeholder='Phone Number' className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("product")} type="text" defaultValue={modalInfo?.productName} className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("price")} type="text" defaultValue={modalInfo.price} className="input input-bordered w-full" />
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

export default Advertise;