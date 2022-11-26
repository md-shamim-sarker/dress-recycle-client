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
                <div className="drawer-content p-10">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side border-r">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-60 bg-base-100 text-base-content gap-y-2">
                        <li><NavLink to={"/dashboard/role/sellers"}>All Sellers</NavLink></li>
                        <li><NavLink to={"/dashboard/role/buyers"}>All Buyers</NavLink></li>
                        <li><NavLink to={"/dashboard/reportedItems"}>Reported Items</NavLink></li>

                        <li><NavLink to={"/dashboard/addProducts"}>Add Products</NavLink></li>
                        <li><NavLink to={"/dashboard/myProducts"}>My Products</NavLink></li>

                        <li><NavLink to={"/dashboard/myOrders"}>My Orders</NavLink></li>
                        <li><NavLink to={"/dashboard/myWishList"}>My Wishlist</NavLink></li>
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;