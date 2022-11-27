import React, {useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {AuthContext} from '../../../contexts/UserContext';
import Admin from './Admin';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const {render, setRender, deleteConfirmation} = useContext(AuthContext);

    const cancelAdminHandler = user => {
        fetch(`http://localhost:5000/users/cancelAdmin/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            toast.success('Successfully Canceled Admin!');
            setRender(!render);
        }).catch(err => console.log(err));
    };

    const handleDelete = user => {
        deleteConfirmation()
            .then((result) => {
                if(result.isConfirmed) {
                    fetch(`http://localhost:5000/users/${user._id}`, {
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
        fetch('http://localhost:5000/users/role2/admin')
            .then(res => res.json())
            .then(data => setAdmins(data))
            .catch(err => console.log(err));
    }, [render]);

    return (
        <div>
            <h2 className='text-2xl font-bold text-center my-10'>All Admins</h2>
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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map((admin, sl) => <Admin
                                key={admin?._id}
                                admin={admin}
                                sl={sl + 1}
                                cancelAdminHandler={cancelAdminHandler}
                                handleDelete={handleDelete}
                            ></Admin>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admins;