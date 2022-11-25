import React, {useEffect, useState} from 'react';
import Buyer from './Buyer';

const Buyers = () => {
    const [buyers, setBuyers] = useState([]);
    const [render, setRender] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/users/role/buyer')
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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, sl) => <Buyer
                                key={buyer?._id}
                                buyer={buyer}
                                sl={sl + 1}
                                setRender={setRender}
                                render={render}
                            ></Buyer>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Buyers;