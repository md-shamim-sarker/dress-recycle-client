import React from 'react';

const Seller = ({seller, sl}) => {
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
                                seller?.image
                                    ? <img src={seller?.image} alt="Avatar Tailwind CSS Component" />
                                    : <img src='https://simg.nicepng.com/png/small/301-3012856_account-user-profile-avatar-comments-free-image-user.png' alt="Avatar Tailwind CSS Component" />
                            }

                        </div>
                    </div>
                </div>
            </td>
            <td>{seller?.fullName}</td>
            <td>{seller?.phone}</td>
            <td>{seller?.email}</td>
            <td>{seller?.role}</td>
            <td>
                <button className="btn bg-green-500 btn-sm">Verify</button>
            </td>
            <td>
                <button onClick={() => handleDelete(seller)} className="btn btn-warning btn-sm">Delete</button>
            </td>
        </tr>
    );
};

export default Seller;