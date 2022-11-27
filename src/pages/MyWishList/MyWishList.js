import React, {useContext} from 'react';
import {AuthContext} from '../../contexts/UserContext';

const MyWishList = ({myWishList: product, sl, modalHandler}) => {
    const {render, setRender} = useContext(AuthContext);

    const handleDelete = p => {
        console.log(p._id);
        fetch(`http://localhost:5000/wishLists/${p._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                setRender(!render);
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
                            <img src={product?.productImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{product?.productName}</td>
            <td>{product?.productPrice} Taka</td>
            <td>
                <button onClick={() => handleDelete(product)} className="btn btn-primary btn-sm">Cancel</button>
            </td>
            <td>
                <label onClick={() => modalHandler(product)} htmlFor="order-modal" className="btn btn-primary btn-sm">Order Now</label>
            </td>
        </tr>
    );
};

export default MyWishList;