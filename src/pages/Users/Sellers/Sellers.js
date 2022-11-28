import React, {useContext} from 'react';
import {AuthContext} from '../../../contexts/UserContext';
import Seller from './Seller';
import toast from 'react-hot-toast';
import {useQuery} from '@tanstack/react-query';

const Sellers = () => {
    const {deleteConfirmation} = useContext(AuthContext);

    const makeAdminHandler = user => {
        fetch(`https://dress-recycle-server.vercel.app/users/makeAdmin/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            toast.success('Successfully Made Admin!');
            refetch();
        }).catch(err => console.log(err));
    };

    const verifyHandler = user => {
        fetch(`https://dress-recycle-server.vercel.app/users/seller/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            toast.success('Successfully Seller Verified!');
            refetch();
        }).catch(err => console.log(err));
    };

    const unVerifyHandler = user => {
        fetch(`https://dress-recycle-server.vercel.app/users/seller2/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            toast.success('Successfully Seller Unverified!');
            refetch();
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
                            refetch();
                        })
                        .catch(err => console.log(err));
                } else {
                    toast.success('Delete Cancelled!');
                }
            });
    };

    const {data: sellers = [], refetch} = useQuery({
        queryKey: ['users/role2/seller'],
        queryFn: async () => {
            const res = await fetch('https://dress-recycle-server.vercel.app/users/role2/seller');
            const data = await res.json();
            return data;
        }
    });

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