import React from 'react';

const MyWishList = ({myWishList, sl}) => {
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
                            <img src={myWishList?.productImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{myWishList?.productName}</td>
            <td>{myWishList?.productPrice} Taka</td>
            <td>
                <div className="btn btn-primary btn-sm">Cancel</div>
            </td>
            <td>
                <div className="btn btn-primary btn-sm">Book Now</div>
            </td>
        </tr>
    );
};

export default MyWishList;