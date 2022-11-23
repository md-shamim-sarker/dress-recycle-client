import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {RiMenu2Fill} from 'react-icons/ri';

const menuItems = <>
    <li><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/blog"}>Blog</NavLink></li>
    <li><NavLink to={"/allProducts"}>All Products</NavLink></li>
    <li><NavLink to={"/addProducts"}>Add Products</NavLink></li>
    <li><NavLink to={"/myProducts"}>My Products</NavLink></li>
    <li><NavLink to={"/myWishList"}>My Wishlist</NavLink></li>
    <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
    <li><NavLink to={"/login"}>Login</NavLink></li>
</>;

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <RiMenu2Fill className='text-2xl'></RiMenu2Fill>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to={"/"} className="upper-case text-2xl font-bold">Dress Recycle</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 rounded-box bg-blue-100">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;