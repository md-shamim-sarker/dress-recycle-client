import React, {useContext} from 'react';
import {AuthContext} from '../../contexts/UserContext';

const MyProduct = ({myProduct, sl}) => {
    const {render, setRender} = useContext(AuthContext);
    // console.log(myProduct);

    const advertiseHandler = product => {
        console.log(product._id);
        fetch(`http://localhost:5000/products/advertise2/${product._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
            alert("Successfull!!");
        }).catch(err => console.log(err));
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
                            <img src={myProduct?.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{myProduct?.productName}</td>
            <td>{myProduct?.resalePrice} Taka</td>
            <td>
                <div className="btn btn-primary btn-sm">Available</div>
            </td>
            <td>
                {
                    myProduct?.advertise
                        ? <button disabled className="btn btn-primary btn-sm">Advertise</button>
                        : <button onClick={() => advertiseHandler(myProduct)} className="btn btn-primary btn-sm">Advertise</button>
                }

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