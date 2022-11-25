import React from 'react';

const Admin = ({admin, sl}) => {
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
                                admin?.image
                                    ? <img src={admin?.image} alt="Avatar Tailwind CSS Component" />
                                    : <img src='https://simg.nicepng.com/png/small/301-3012856_account-user-profile-avatar-comments-free-image-user.png' alt="Avatar Tailwind CSS Component" />
                            }

                        </div>
                    </div>
                </div>
            </td>
            <td>{admin?.fullName}</td>
            <td>{admin?.phone}</td>
            <td>{admin?.email}</td>
            <td>{admin?.role}</td>
            <td>
                <button onClick={() => handleDelete(admin)} className="btn btn-warning btn-sm">Delete</button>
            </td>
        </tr>
    );
};

export default Admin;