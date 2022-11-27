import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {RiMenu2Fill} from 'react-icons/ri';
import {AiOutlineClose} from 'react-icons/ai';
import {HiDotsVertical} from 'react-icons/hi';
import {AuthContext} from '../contexts/UserContext';

const Navbar = () => {
    const {user, logOut, open, setOpen} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setUserInfo(data))
            .catch(err => console.log(err));
    }, [user?.email]);

    const logOutHandler = () => {
        logOut()
            .then(() => {
                console.log("Logout Successfull!");
            }).catch(err => console.log(err));
    };

    const menuItems = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/blog"}>Blog</NavLink></li>
        {
            user?.uid && <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
        }
    </>;

    return (
        <div className="navbar border-b bg-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <label onClick={() => setOpen(!open)} tabIndex={0} className="lg:hidden cursor-pointer">
                        {
                            open
                                ? <AiOutlineClose className='text-2xl'></AiOutlineClose>
                                : <RiMenu2Fill className='text-2xl'></RiMenu2Fill>
                        }
                    </label>
                    <ul onClick={() => setOpen(!open)} tabIndex={1} className={`${open || 'hidden'} menu menu-compact absolute top-10 z-50 mt-3 p-2 shadow-lg border bg-base-100 rounded-box w-52`}>
                        {menuItems}
                    </ul>
                </div>
                <Link to={"/"} className="uppercase text-primary text-xl lg:text-2xl font-bold ml-2">Dress Recycle</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <p className='text-lg font-bold mr-2'>
                    {
                        userInfo?.role?.toUpperCase()
                    }
                </p>
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
            <label htmlFor="dashboard-drawer" className="lg:hidden">
                <HiDotsVertical className='text-2xl ml-2'></HiDotsVertical>
            </label>
        </div>
    );
};

export default Navbar;