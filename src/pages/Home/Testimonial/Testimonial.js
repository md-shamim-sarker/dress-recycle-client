import React from 'react';
import bill from '../../../assets/bill.jpg';

const card = <>
    <div className="card bg-base-100 shadow-xl mb-20">
        <figure className="px-10 pt-10">
            <img src={bill} alt="..." className="w-28 h-28 rounded-full" />
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">Mr. Sarker</h2>
            <p>Some forms of personal protective equipment amount to clothing, such as coveralls, chaps or a doctor's white coat, with similar requirements for maintenance and cleaning as other textiles boxing gloves function both as protective equipment and as a sparring weapon, so the equipment aspect rises above the glove aspect.</p>
        </div>
    </div>
</>;

const Testimonial = () => {
    return (
        <>
            <h2 className='text-3xl font-bold text-center my-10 text-blue-600'>Testimonial</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    [1, 2, 3].map((c, i) => <div key={i}>{card}</div>)
                }
            </div>
        </>
    );
};

export default Testimonial;