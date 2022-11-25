import React from 'react';

const User = ({user, sl}) => {
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
                                user?.image
                                    ? <img src={user?.image} alt="Avatar Tailwind CSS Component" />
                                    : <img src='https://simg.nicepng.com/png/small/301-3012856_account-user-profile-avatar-comments-free-image-user.png' alt="Avatar Tailwind CSS Component" />
                            }

                        </div>
                    </div>
                </div>
            </td>
            <td>{user?.fullName}</td>
            <td>{user?.phone}</td>
            <td>{user?.email}</td>
            <td>{user?.role}</td>
            <td>
                <div className="btn btn-primary btn-sm">Make Admin</div>
            </td>
            <td>
                <div className="btn btn-warning btn-sm">Delete</div>
            </td>
        </tr>
    );
};

export default User;