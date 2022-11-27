import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../contexts/UserContext';
import Seller from './Seller';

const Sellers = () => {
    const [sellers, setSellers] = useState([]);
    const {render, setRender} = useContext(AuthContext);

    const makeAdminHandler = user => {
        fetch(`http://localhost:5000/users/makeAdmin/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
        }).catch(err => console.log(err));
    };

    const cancelAdminHandler = user => {
        fetch(`http://localhost:5000/users/cancelAdmin/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
        }).catch(err => console.log(err));
    };

    const verifyHandler = user => {
        fetch(`http://localhost:5000/users/seller/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
        }).catch(err => console.log(err));
    };

    const unVerifyHandler = user => {
        fetch(`http://localhost:5000/users/seller2/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
        }).catch(err => console.log(err));
    };

    const handleDelete = user => {
        const confirmation = window.confirm('You are going to delete a user!!!');
        confirmation &&
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => {
                    setRender(!render);
                    alert("Delete Successfully!!!");
                })
                .catch(err => console.log(err));
    };

    useEffect(() => {
        fetch('http://localhost:5000/users/role2/seller')
            .then(res => res.json())
            .then(data => setSellers(data))
            .catch(err => console.log(err));
    }, [render]);

    return (
        <div>
            <h2 className='text-2xl font-bold text-center my-10'>All Sellers</h2>
            <div className="overflow-x-auto w-full mb-20">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Verification</th>
                            <th>Make Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, sl) => <Seller
                                key={seller?._id}
                                seller={seller}
                                sl={sl + 1}
                                makeAdminHandler={makeAdminHandler}
                                cancelAdminHandler={cancelAdminHandler}
                                verifyHandler={verifyHandler}
                                unVerifyHandler={unVerifyHandler}
                                handleDelete={handleDelete}
                            ></Seller>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Sellers;