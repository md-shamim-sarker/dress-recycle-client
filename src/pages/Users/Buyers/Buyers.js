import {useQuery} from '@tanstack/react-query';
import React, {useContext} from 'react';
import toast from 'react-hot-toast';
import {AuthContext} from '../../../contexts/UserContext';
import Buyer from './Buyer';

const Buyers = () => {
    const {deleteConfirmation} = useContext(AuthContext);

    const makeAdminHandler = user => {
        fetch(`http://localhost:5000/users/makeAdmin/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            toast.success('Successfully Made Admin!');
            refetch();
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
                            refetch();
                        })
                        .catch(err => console.log(err));
                } else {
                    toast.success('Delete Cancelled!');
                }

            });
    };

    const {data: buyers = [], refetch} = useQuery({
        queryKey: ['users/role2/buyer'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/role2/buyer');
            const data = await res.json();
            return data;
        }
    });

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