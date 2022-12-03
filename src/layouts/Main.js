import React, {useContext} from 'react';
import {Outlet} from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import {AuthContext} from '../contexts/UserContext';

const Main = () => {
    const {setOpen} = useContext(AuthContext);
    return (
        <div>
            <Navbar></Navbar>
            <div onClick={() => setOpen(false)} className="mt-16">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;