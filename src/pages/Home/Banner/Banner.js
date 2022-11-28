import React from 'react';
import homeBanner from '../../../assets/home-banner.jpg';

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{backgroundImage: `url(${homeBanner})`}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">This website is used for recycling old but good clothes in minimum price.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;