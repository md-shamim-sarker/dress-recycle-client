import React from 'react';

const AdCard = ({adItem}) => {
    return (
        <div className="card card-compact bg-base-100 shadow-xl mb-20">
            <figure><img src={adItem.image} alt="..." className='w-full' /></figure>
            <div className="card-body">
                <h2 className="card-title">{adItem.productName}</h2>
                <p>{adItem.description.slice(0, 100)}...</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary w-full">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default AdCard;