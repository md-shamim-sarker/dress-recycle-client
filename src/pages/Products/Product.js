import React, {useContext, useEffect, useState} from 'react';
import {GoVerified} from 'react-icons/go';
import {GiEternalLove} from 'react-icons/gi';
import {MdOutlineReportProblem} from 'react-icons/md';
import {AuthContext} from '../../contexts/UserContext';

const Product = ({product}) => {
    const {userInfo, user} = useContext(AuthContext);
    const [wishLists, setWishLists] = useState(null);

    const productId = product._id;

    useEffect(() => {
        fetch(`http://localhost:5000/wishLists/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setWishLists(data);
            })
            .catch(err => console.log(err));
    }, [user?.email]);

    console.log(wishLists);

    const wishList = {
        userName: user.displayName,
        userEmail: user.email,
        productId: product._id,
        productName: product.productName,
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
    console.log(user.email, wishLists.userEmail);
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
                            {/* {
                                user?.email === wishLists?.userEmail
                                    ? <GiEternalLove title='Already add to wishlist' className='text-orange-500'></GiEternalLove>
                                    : <GiEternalLove title='Add to wishlist'></GiEternalLove>
                            } */}

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
                                    ? <GoVerified className='text-blue-500' title='Verified'></GoVerified>
                                    : <GoVerified className='text-gray-500' title='Not Verified'></GoVerified>
                            }
                        </span>
                    </div> <br />
                    <strong>Location:</strong> {product.location} <br />
                    <strong>Original Price:</strong> <strike>{product.originalPrice}</strike> TK <br />
                    <strong>Resale Price:</strong> {product.resalePrice} TK <br />
                    <strong>Years of Use:</strong> {product.yearsOfUse} <br />
                    <strong>Date & Time:</strong> {product.date} <br />
                </div>

                <p>{product.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary w-full">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Product;