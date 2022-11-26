import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {AuthContext} from '../../contexts/UserContext';
import MyWishList from './MyWishList';

const MyWishLists = () => {
    const {user} = useContext(AuthContext);
    const [myWishLists, setMyWishLists] = useState([]);
    const [modalInfo, setModalInfo] = useState({});
    const {register, handleSubmit} = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    useEffect(() => {
        fetch(`http://localhost:5000/wishLists/${user?.email}`)
            .then(res => res.json())
            .then(data => setMyWishLists(data))
            .catch(err => console.log(err));
    }, [user?.email]);

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
                                myWishLists.map((myWishList, sl) => <MyWishList
                                    key={myWishList?._id}
                                    myWishList={myWishList}
                                    sl={sl + 1}
                                    setModalInfo={setModalInfo}
                                ></MyWishList>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* *************Modal*********** */}
            <input type="checkbox" id="order-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="order-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-2xl font-bold text-center">Order Information</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3 mt-3'>
                        <div className="form-control w-full">
                            <input {...register("userName")} type="text" value={modalInfo.userName} className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("email")} type="text" value={modalInfo.email} className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("phone")} type="text" placeholder='Phone Number' className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("product")} type="text" value={modalInfo.productName} className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input {...register("price")} type="text" value={`${modalInfo.price} Taka`} className="input input-bordered w-full" />
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

export default MyWishLists;