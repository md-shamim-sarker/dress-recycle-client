import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

const MyOrder = ({sl, product, handleDelete}) => {

    const [productInfo, setProductInfo] = useState(null);
    useEffect(() => {
        fetch(`https://dress-recycle-server.vercel.app/products2/${product?.productId}`)
            .then(res => res.json())
            .then(data => setProductInfo(data))
            .catch(err => console.log(err));
    }, [product?.productId]);
    console.log(productInfo);

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
                {
                    productInfo?.soldOut
                        ? <NavLink disabled className="btn btn-primary btn-sm w-20">Paid</NavLink>
                        : <NavLink to={`/dashboard/payment/${product?.productId}`} className="btn btn-primary btn-sm w-20">Payment</NavLink>
                }
            </td>
        </tr>
    );
};

export default MyOrder;