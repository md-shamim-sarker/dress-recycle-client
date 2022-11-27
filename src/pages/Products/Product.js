import React from 'react';
import {GiEternalLove} from 'react-icons/gi';
import {MdOutlineReportProblem} from 'react-icons/md';

const Product = ({product, modalHandler, wishListHandler, reportHandler}) => {
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={product.image} alt="cloth" className='w-full' /></figure>
            <div className="card-body">
                <div className='flex justify-between'>
                    <h2 className="card-title">{product.productName}</h2>
                    <div className='flex gap-x-3'>
                        <button onClick={() => wishListHandler(product)}>
                            <GiEternalLove title='Add to wishlist success!!!' className='text-rose-600'></GiEternalLove>
                        </button>
                        <button onClick={() => reportHandler(product)}>
                            <MdOutlineReportProblem title='Report to admin success!!!' className='text-orange-600'></MdOutlineReportProblem>
                        </button>
                    </div>
                </div>
                <div className='text-md items-center gap-2'>
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

export default Product;