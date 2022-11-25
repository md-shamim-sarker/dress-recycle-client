import React, {useContext} from 'react';
import {AuthContext} from '../../../contexts/UserContext';
import {GoVerified} from 'react-icons/go';

const Seller = ({seller, sl}) => {
    const {render, setRender} = useContext(AuthContext);

    const makeAdminHandler = user => {
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
            alert("Make Admin Successfull!!!");
        }).catch(err => console.log(err));
    };

    const verifyHandler = user => {
        fetch(`http://localhost:5000/users/seller/${user._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
            alert("Verified Successfull!!!");
        }).catch(err => console.log(err));
    };

    const handleDelete = user => {
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                setRender(!render);
                alert("Delete Successfully!!!");
            })
            .catch(err => console.log(err));
    };

    return (
        <tr>
            <th>
                <label>
                    {sl}
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            {
                                seller?.image
                                    ? <img src={seller?.image} alt="Avatar Tailwind CSS Component" />
                                    : <img src='https://simg.nicepng.com/png/small/301-3012856_account-user-profile-avatar-comments-free-image-user.png' alt="Avatar Tailwind CSS Component" />
                            }

                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className='flex items-center gap-2'>
                    <span>{seller?.fullName}</span>
                    <span>{
                        seller?.isVerified && <GoVerified className='text-blue-500'></GoVerified>
                    }</span>
                </div>
            </td>
            <td>{seller?.phone}</td>
            <td>{seller?.email}</td>
            <td>{seller?.role}</td>
            <td>
                {
                    seller?.isVerified
                        ? <button disabled className="btn bg-green-500 btn-sm">Verify</button>
                        : <button onClick={() => verifyHandler(seller)} className="btn bg-green-500 btn-sm">Verify</button>
                }
            </td>
            <td>
                <button onClick={() => makeAdminHandler(seller)} className="btn btn-primary btn-sm">Make Admin</button>
            </td>
            <td>
                <button onClick={() => handleDelete(seller)} className="btn btn-warning btn-sm">Delete</button>
            </td>
        </tr>
    );
};

export default Seller;