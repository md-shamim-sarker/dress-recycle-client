import React from 'react';
import {useLoaderData} from 'react-router-dom';
import RoleUser from './RoleUser';

const RoleUsers = () => {
    const roleUsers = useLoaderData();
    return (
        <div>
            <h2 className='text-2xl font-bold text-center my-10'>All Users By Role</h2>
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
                            roleUsers.map((roleUser, sl) => <RoleUser
                                key={roleUser?._id}
                                roleUser={roleUser}
                                sl={sl + 1}
                            ></RoleUser>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoleUsers;