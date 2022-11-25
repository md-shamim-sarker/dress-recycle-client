import React from 'react';

const User = ({user, sl}) => {

    const makeAdminHandler = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
        }).then(() => {
            alert(`Make Admin Successfully!!!`);
        }).catch(err => console.log(err));
    };

    const handleDelete = user => {
        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
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
                {
                    user?.role === 'admin'
                        ? <button className="btn btn-primary btn-sm" disabled>Make Admin</button>
                        : <button onClick={() => makeAdminHandler(user?._id)} className="btn btn-primary btn-sm">Make Admin</button>
                }

            </td>
            <td>
                <button onClick={() => handleDelete(user)} className="btn btn-warning btn-sm">Delete</button>
            </td>
        </tr>
    );
};

export default User;