import React from 'react';
import {GoVerified} from 'react-icons/go';

const Seller = ({
    sl,
    seller,
    makeAdminHandler,
    cancelAdminHandler,
    verifyHandler,
    unVerifyHandler,
    handleDelete
}) => {
    // console.log("SELLER", seller);
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
                        ? <button onClick={() => unVerifyHandler(seller)} className="btn bg-green-500 btn-sm">UnVerify</button>
                        : <button onClick={() => verifyHandler(seller)} className="btn bg-green-500 btn-sm">Verify</button>
                }
            </td>
            <td>
                {
                    seller?.isAdmin
                        ? <button onClick={() => cancelAdminHandler(seller)} className="btn btn-primary btn-sm">Cancel Admin</button>
                        : <button onClick={() => makeAdminHandler(seller)} className="btn btn-primary btn-sm">Make Admin</button>
                }

            </td>
            <td>
                <button onClick={() => handleDelete(seller)} className="btn btn-warning btn-sm">Delete</button>
            </td>
        </tr>
    );
};

export default Seller;