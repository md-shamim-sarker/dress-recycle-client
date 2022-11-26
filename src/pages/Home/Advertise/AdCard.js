import React, {useContext, useEffect, useState} from 'react';
import {GiEternalLove} from 'react-icons/gi';
import {GoVerified} from 'react-icons/go';
import {MdOutlineReportProblem} from 'react-icons/md';
import {AuthContext} from '../../../contexts/UserContext';

const AdCard = ({adItem: product, setModalInfo}) => {
    const {user} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState();
    const productId = product._id;

    const modalInfoHandler = () => {
        const modalInfo = {
            userName: user?.displayName,
            email: user?.email,
            productName: product.productName,
            productId: product._id,
            price: product.resalePrice,
            date: Date().slice(4, 24)
        };
        setModalInfo(modalInfo);
    };

    useEffect(() => {
        fetch(`http://localhost:5000/users/${product.sellerEmail}`)
            .then((res) => res.json())
            .then(data => setUserInfo(data))
            .catch(err => console.log(err.message));
    }, [product.sellerEmail]);

    const wishList = {
        userName: product.sellerName,
        userEmail: product.sellerEmail,
        productId: product._id,
        productName: product.productName,
        productImage: product.image,
        productPrice: product.resalePrice,
        wishDate: Date().slice(4, 24)
    };

    const wishListHandler = (wishList) => {
        fetch('http://localhost:5000/wishLists', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(wishList)
        }).then(() => {
            alert("Add to wishlist successfull!!");
        }).catch(error => {
            console.error(error.message);
        });
    };

    const onUpdateHandler = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT',
        }).then(() => {
            alert(`Report to Admin Success for ${product.productName}`);
        }).catch(err => console.log(err));
    };
    // console.log(adItem);
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={product.image} alt="cloth" className='w-full' /></figure>
            <div className="card-body">
                <div className='flex items-center justify-between'>
                    <h2 className="card-title">
                        {product.productName}
                    </h2>
                    <div className='flex gap-4 text-xl'>
                        <button onClick={() => wishListHandler(wishList)}>
                            <GiEternalLove title='Already add to wishlist' className='text-rose-600'></GiEternalLove>
                        </button>
                        <button onClick={() => onUpdateHandler(productId)}>
                            {
                                product.reportToAdmin
                                    ? <MdOutlineReportProblem title='Already report to admin' className='text-orange-600'></MdOutlineReportProblem>
                                    : <MdOutlineReportProblem title='Report to Admin'></MdOutlineReportProblem>
                            }
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
                    <label onClick={modalInfoHandler} htmlFor="order-modal" className="btn btn-primary w-full">Order Now</label>
                </div>
            </div>
        </div>
    );
};

export default AdCard;




/*
<div className="card card-compact bg-base-100 shadow-xl mb-20">
            <figure><img src={adItem.image} alt="..." className='w-full' /></figure>
            <div className="card-body">
                <h2 className="card-title">{adItem.productName}</h2>
                <p>{adItem.description.slice(0, 100)}...</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary w-full">Order Now</button>
                </div>
            </div>
        </div>
*/