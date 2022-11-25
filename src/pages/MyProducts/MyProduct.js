import React from 'react';

const MyProduct = ({myProduct, sl}) => {
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
                            <img src={myProduct?.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{myProduct?.productName}</td>
            <td>{myProduct?.resalePrice} Taka</td>
            <td>
                {/* <div className="btn btn-primary btn-sm">Available</div> */}
                <select className="select select-bordered w-full text-center">
                    <option value={false}>Available</option>
                    <option value={true}>Soldout</option>
                </select>
            </td>
            <td>
                <div className="btn btn-primary btn-sm">Advertise</div>
            </td>
            <td>
                <div className="btn btn-primary btn-sm">Update</div>
            </td>
            <td>
                <div className="btn btn-warning btn-sm">Delete</div>
            </td>
        </tr>
    );
};

export default MyProduct;