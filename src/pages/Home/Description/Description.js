import React from 'react';

const Description = () => {
    return (
        <>
            <h2 className='text-2xl font-bold text-center my-10'>Description</h2>
            <div className="hero mb-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="https://placeimg.com/500/400/arch" className="rounded-lg shadow-2xl" alt='...' />
                    <div>
                        <h1 className="text-5xl font-bold">Box Office News!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Description;