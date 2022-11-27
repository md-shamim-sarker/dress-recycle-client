import React from 'react';

const MyOrder = ({sl, product, handleDelete}) => {

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
                            <img src={product?.productImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{product?.productName}</td>
            <td>{product?.productPrice} Taka</td>
            <td>
                <button onClick={() => handleDelete(product)} className="btn btn-primary btn-sm">Cancel Order</button>
            </td>
            <td>
                <label htmlFor="order-modal" className="btn btn-primary btn-sm">Payment</label>
            </td>
        </tr>
    );
};

export default MyOrder;