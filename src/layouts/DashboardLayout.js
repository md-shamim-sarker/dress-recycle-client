import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side border-r">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><NavLink to={"/"}>Sidebar Item 1</NavLink></li>
                        <li><NavLink to={"/"}>Sidebar Item 1</NavLink></li>
                        <li><NavLink to={"/"}>Sidebar Item 1</NavLink></li>
                        <li><NavLink to={"/"}>Sidebar Item 1</NavLink></li>
                        <li><NavLink to={"/"}>Sidebar Item 1</NavLink></li>
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;