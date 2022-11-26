import React from 'react';

const MyWishList = ({myWishList: product, sl, modalInfoHandler}) => {
    // console.log(product);
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
                <div className="btn btn-primary btn-sm">Cancel</div>
            </td>
            <td>
                <label onClick={() => modalInfoHandler(product)} htmlFor="order-modal" className="btn btn-primary btn-sm">Order Now</label>
            </td>
        </tr>
    );
};

export default MyWishList;