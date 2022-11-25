import React from 'react';

const ReportedItem = ({reportedItem, sl}) => {
    console.log(reportedItem);
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
                            <img src={reportedItem?.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                </div>
            </td>
            <td>{reportedItem?.productName}</td>
            <td>{reportedItem?.sellerName}</td>
            <td>{reportedItem?.sellerEmail}</td>
            <td>{reportedItem?.sellerPhone}</td>
            <td>
                <div className="btn btn-primary btn-sm">Delete</div>
            </td>
        </tr>
    );
};

export default ReportedItem;