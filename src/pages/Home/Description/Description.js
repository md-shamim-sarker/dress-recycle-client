import React from 'react';

const Description = () => {
    return (
        <>
            <h2 className='text-3xl font-bold text-center my-10 text-blue-600'>Description</h2>
            <div className="hero mb-20">
                <div className="hero-content flex-col gap-x-5 lg:flex-row-reverse">
                    <img src="https://static.standard.co.uk/2022/02/16/08/newFile-1.jpg" className="rounded-lg shadow-2xl w-full lg:w-1/2" alt='...' />
                    <div className='w-full lg:w-1/2'>
                        <h1 className="text-2xl font-bold text-blue-600">About Dress Recycling</h1>
                        <p className="py-6">Clothing has significant social factors as well. Wearing clothes is a variable social norm. It may connote modesty. Being deprived of clothing in front of others may be embarrassing. In many parts of the world, not wearing clothes in public so that genitals, breasts, or buttocks are visible could be considered indecent exposure. Pubic area or genital coverage is the most frequently encountered minimum found cross-culturally and regardless of climate, implying social convention as the basis of customs. </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Description;