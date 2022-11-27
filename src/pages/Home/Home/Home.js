import React from 'react';
import Advertise from '../Advertise/Advertise';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import Description from '../Description/Description';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <div className='w-4/5 mx-auto'>
                <Advertise></Advertise>
                <Categories></Categories>
                <Description></Description>
                <Testimonial></Testimonial>
            </div>
        </>
    );
};

export default Home;