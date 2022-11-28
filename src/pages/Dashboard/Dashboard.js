import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/UserContext';

const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(res => res.json())
            .then(data => setUserInfo(data))
            .catch(err => console.log(err));
    }, [user?.email]);

    return (
        <div>
            <h2 className='text-5xl font-bold text-center p-5 text-blue-600 mb-6'>Dashboard</h2>
            <div className='w-2/5 mx-auto flex flex-col items-center justify-center gap-y-3'>
                {
                    userInfo?.isAdmin && <>
                        <Link to={"/dashboard/role/admins"} className="btn btn-primary w-full">All Admins</Link>
                        <Link to={"/dashboard/role/sellers"} className="btn btn-primary w-full">All Sellers</Link>
                        <Link to={"/dashboard/role/buyers"} className="btn btn-primary w-full">All Buyers</Link>
                        <Link to={"/dashboard/reportedItems"} className="btn btn-primary w-full">Reported Items</Link>
                    </>
                }
                {
                    userInfo?.role === 'seller' && <>
                        <Link to={"/dashboard/addProducts"} className="btn btn-primary w-full">Add Products</Link>
                        <Link to={"/dashboard/myProducts"} className="btn btn-primary w-full">My Products</Link>
                    </>
                }
                {
                    userInfo?.role === 'buyer' && <>
                        <Link to={"/dashboard/myOrders"} className="btn btn-primary w-full">My Orders</Link>
                        <Link to={"/dashboard/myWishList"} className="btn btn-primary w-full">My Wishlist</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Dashboard;