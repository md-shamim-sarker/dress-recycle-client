import React from 'react';
import demo from '../../../assets/demo.png';

const card = <>
    <div className="card card-compact bg-base-100 shadow-xl mb-20">
        <figure><img src={demo} alt="..." className='w-full' /></figure>
        <div className="card-body">
            <h2 className="card-title">Demo Cloth</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
    </div>
</>;

const Advertise = () => {
    return (
        <>
            <h2 className='text-2xl font-bold text-center my-10'>Advertisement</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((c, i) => <div key={i}>{card}</div>)
                }
            </div>
        </>
    );
};

export default Advertise;