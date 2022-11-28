import React from 'react';
import {Link} from 'react-router-dom';

const MyProduct = ({myProduct, sl, advertiseHandler, unAdvertiseHandler, handleDelete, unSoldOutHandler}) => {
    console.log(myProduct);
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
            <td>
                {myProduct?.productName}
                {
                    myProduct?.soldOut && <div className="badge badge-warning gap-2 ml-1">
                        Sold Out
                    </div>
                }
            </td>
            <td>{myProduct?.resalePrice} Taka</td>
            <td>
                {
                    myProduct?.soldOut
                        ? <button onClick={() => unSoldOutHandler(myProduct)} className="btn btn-primary btn-sm">Make Available</button>
                        : <button className="btn btn-primary btn-sm">Available</button>
                }

            </td>
            <td>
                {
                    myProduct?.advertise && !myProduct?.soldOut
                        ? <button onClick={() => unAdvertiseHandler(myProduct)} className="btn btn-primary btn-sm">Undvertise</button>
                        : myProduct?.soldOut
                            ? <button disabled className="btn btn-primary btn-sm">Advertise</button>
                            : <button onClick={() => advertiseHandler(myProduct)} className="btn btn-primary btn-sm">Advertise</button>
                }
            </td>
            <td>
                <Link to={`/dashboard/update/${myProduct._id}`} className="btn btn-primary btn-sm">Update</Link>
            </td>
            <td>
                <div onClick={() => handleDelete(myProduct)} className="btn btn-warning btn-sm">Delete</div>
            </td>
        </tr>
    );
};
export default MyProduct;