import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/UserContext';
import MyWishList from './MyWishList';

const MyWishLists = () => {
    const {user} = useContext(AuthContext);
    const [myWishLists, setMyWishLists] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/wishLists/${user?.email}`)
            .then(res => res.json())
            .then(data => setMyWishLists(data))
            .catch(err => console.log(err));
    }, [user?.email]);

    return (
        <div>
            <h2 className='text-2xl font-bold text-center my-10'>My Wish Lists</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Picture</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Cancel</th>
                            <th>Book Now</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myWishLists.map((myWishList, sl) => <MyWishList
                                key={myWishList?._id}
                                myWishList={myWishList}
                                sl={sl + 1}
                            ></MyWishList>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyWishLists;