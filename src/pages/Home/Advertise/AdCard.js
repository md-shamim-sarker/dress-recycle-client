import React, {useContext, useEffect, useState} from 'react';
import {GiEternalLove} from 'react-icons/gi';
import {GoVerified} from 'react-icons/go';
import {MdOutlineReportProblem} from 'react-icons/md';
import {AuthContext} from '../../../contexts/UserContext';

const AdCard = ({adItem: product, modalHandler, wishListHandler, reportHandler}) => {
    const [userInfo, setUserInfo] = useState();
    const {render} = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:5000/users/${product?.sellerEmail}`)
            .then((res) => res.json())
            .then(data => setUserInfo(data))
            .catch(err => console.log(err.message));
    }, [product?.sellerEmail, render]);

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={product.image} alt="cloth" className='w-full' /></figure>
            <div className="card-body">
                <div className='flex items-center justify-between'>
                    <h2 className="card-title">
                        {product.productName}
                    </h2>
                    <div className='flex gap-4 text-xl'>
                        <button onClick={() => wishListHandler(product)}>
                            <GiEternalLove title='Already add to wishlist' className='text-rose-600'></GiEternalLove>
                        </button>
                        <button onClick={() => reportHandler(product)}>
                            <MdOutlineReportProblem title='Already report to admin' className='text-orange-600'></MdOutlineReportProblem>
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
                    <label onClick={() => modalHandler(product)} htmlFor="order-modal" className="btn btn-primary w-full">Order Now</label>
                </div>
            </div>
        </div>
    );
};

export default AdCard;