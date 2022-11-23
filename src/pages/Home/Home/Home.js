import React from 'react';
import Advertise from '../Advertise/Advertise';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import Description from '../Description/Description';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='w-4/5 mx-auto'>
                <Advertise></Advertise>
                <Category></Category>
                <Description></Description>
                <Testimonial></Testimonial>
            </div>
        </div>
    );
};

export default Home;