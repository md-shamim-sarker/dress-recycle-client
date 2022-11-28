import React, {useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {AuthContext} from '../../../contexts/UserContext';
import Buyer from './Buyer';

const Buyers = () => {
    const [buyers, setBuyers] = useState([]);
    const {render, setRender, deleteConfirmation} = useContext(AuthContext);

    const makeAdminHandler = user => {
        fetch(`https://dress-recycle-server.vercel.app/users/makeAdmin/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
            toast.success('Successfully Made Admin!');
        }).catch(err => console.log(err));
    };

    const handleDelete = user => {
        deleteConfirmation()
            .then((result) => {
                if(result.isConfirmed) {
                    fetch(`https://dress-recycle-server.vercel.app/users/${user._id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(() => {
                            toast.success('Delete Successfully!');
                            setRender(!render);
                        })
                        .catch(err => console.log(err));
                } else {
                    toast.success('Delete Cancelled!');
                }

            });
    };

    useEffect(() => {
        fetch('https://dress-recycle-server.vercel.app/users/role2/buyer', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => setBuyers(data))
            .catch(err => console.log(err));
    }, [render]);

    return (
        <div>
            <h2 className='text-2xl font-bold text-center my-10'>All Buyers</h2>
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
                            <th>Make Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, sl) => <Buyer
                                key={buyer?._id}
                                buyer={buyer}
                                sl={sl + 1}
                                makeAdminHandler={makeAdminHandler}
                                handleDelete={handleDelete}
                            ></Buyer>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Buyers;