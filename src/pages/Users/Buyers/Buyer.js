import React from 'react';

const Buyer = ({buyer, sl, makeAdminHandler, handleDelete}) => {

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
                                buyer?.image
                                    ? <img src={buyer?.image} alt="Avatar Tailwind CSS Component" />
                                    : <img src='https://simg.nicepng.com/png/small/301-3012856_account-user-profile-avatar-comments-free-image-user.png' alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                </div>
            </td>
            <td>{buyer?.fullName}</td>
            <td>{buyer?.phone}</td>
            <td>{buyer?.email}</td>
            <td>{buyer?.role}</td>
            <td>
                <button onClick={() => makeAdminHandler(buyer)} className="btn btn-warning btn-sm">Make Admin</button>
            </td>
            <td>
                <button onClick={() => handleDelete(buyer)} className="btn btn-warning btn-sm">Delete</button>
            </td>
        </tr>
    );
};

export default Buyer;