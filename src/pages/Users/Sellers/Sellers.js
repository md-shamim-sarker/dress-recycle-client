import React, {useEffect, useState} from 'react';
import Seller from './Seller';

const Sellers = () => {
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users/role/seller')
            .then(res => res.json())
            .then(data => setSellers(data))
            .catch(err => console.log(err));
    }, []);

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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, sl) => <Seller
                                key={seller?._id}
                                seller={seller}
                                sl={sl + 1}
                            ></Seller>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Sellers;