import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../contexts/UserContext';
import Buyer from './Buyer';

const Buyers = () => {
    const [buyers, setBuyers] = useState([]);
    const {render} = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:5000/users/role2/buyer')
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
                            ></Buyer>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Buyers;