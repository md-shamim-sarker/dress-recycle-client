import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../contexts/UserContext';
import Admin from './Admin';

const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const {render} = useContext(AuthContext);

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
                            ></Admin>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admins;