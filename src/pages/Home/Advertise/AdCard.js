import React, {useContext, useEffect, useState} from 'react';
import {GiEternalLove} from 'react-icons/gi';
import {GoVerified} from 'react-icons/go';
import {MdOutlineReportProblem} from 'react-icons/md';
import {AuthContext} from '../../../contexts/UserContext';

const AdCard = ({adItem: product, modalHandler, wishListHandler, reportHandler}) => {
    const [userInfo, setUserInfo] = useState({});
    const {user, render, buyerConfirmation} = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(res => res.json())
            .then(data => setUserInfo(data))
            .catch(err => console.log(err));
    }, [user?.email, render]);

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={product.image} alt="cloth" className='w-full' /></figure>
            <div className="card-body">
                <div className='flex items-center justify-between'>
                    <h2 className="card-title">
                        {product.productName}
                    </h2>
                    <div className='flex gap-4 text-xl'>
                        {
                            userInfo.role === 'buyer'
                                ? <button onClick={() => wishListHandler(product)}>
                                    <GiEternalLove title='Add to wishlist' className='text-rose-600'></GiEternalLove>
                                </button>
                                : <button onClick={buyerConfirmation}>
                                    <GiEternalLove title='Add to wishlist' className='text-gray-600'></GiEternalLove>
                                </button>
                        }
                        <button onClick={() => reportHandler(product)}>
                            <MdOutlineReportProblem title='Report to admin' className='text-orange-600'></MdOutlineReportProblem>
                        </button>
                    </div>
                </div>
                <div>
                    <div className='text-lg flex items-center gap-2'>
                        <span><strong>Seller Name:</strong> {product.sellerName}</span>
                        <span>
                            {
                                userInfo?.isVerified
                                && <GoVerified className='text-blue-500' title='Verified'></GoVerified>
                            }
                        </span>
                    </div> <br />
                    <strong>Location:</strong> {product.location} <br />
                    <strong>Original Price:</strong> <strike>{product.originalPrice}</strike> TK <br />
                    <strong>Resale Price:</strong> {product.resalePrice} TK <br />
                    <strong>Years of Use:</strong> {product.yearsOfUse} <br />
                    <strong>Date & Time:</strong> {product.date} <br />
                </div>

                <p>{product.description.slice(0, 150)}.</p>
                <div className="card-actions justify-end">
                    {
                        userInfo.role === 'buyer'
                            ? <label onClick={() => modalHandler(product)} htmlFor="order-modal" className="btn btn-primary w-full">Order Now</label>
                            : <label onClick={buyerConfirmation} className="btn btn-primary w-full">Order Now</label>
                    }
                </div>
            </div>
        </div>
    );
};

export default AdCard;