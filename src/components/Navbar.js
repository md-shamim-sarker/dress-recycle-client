import React, {useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {RiMenu2Fill} from 'react-icons/ri';
import {AuthContext} from '../contexts/UserContext';



const Navbar = () => {
    const {user, logOut} = useContext(AuthContext);

    const logOutHandler = () => {
        logOut()
            .then(() => {
                console.log("Logout Successfull!");
            }).catch(err => console.log(err));
    };

    const menuItems = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/blog"}>Blog</NavLink></li>
        <li><NavLink to={"/allProducts"}>All Products</NavLink></li>
        <li><NavLink to={"/addProducts"}>Add Products</NavLink></li>
        <li><NavLink to={"/myProducts"}>My Products</NavLink></li>
        <li><NavLink to={"/myWishList"}>My Wishlist</NavLink></li>
        <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
    </>;
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
                <Link to={"/"} className="upper-case text-xl lg:text-2xl font-bold">Dress Recycle</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.uid
                        ? <img src={user.photoURL} alt="..." className='w-8 h-8 rounded-full mr-2' title={user.displayName} />
                        : ""
                }

                {
                    user?.uid
                        ? <button onClick={logOutHandler} className="btn btn-primary btn-sm">Logout</button>
                        : <NavLink to={"/login"} className="btn btn-primary btn-sm">Login</NavLink>
                }

            </div>
        </div>
    );
};

export default Navbar;