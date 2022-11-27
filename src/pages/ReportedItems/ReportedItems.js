import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/UserContext';
import ReportedItem from './ReportedItem';

const ReportedItems = () => {
    const [reportedItems, setReportedItems] = useState([]);
    const {render, setRender} = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:5000/products/report/true')
            .then(res => res.json())
            .then(data => setReportedItems(data))
            .catch(err => console.log(err));
    }, [render]);

    const unReportHandler = (product) => {
        fetch(`http://localhost:5000/products/unreport/${product._id}`, {
            method: 'PUT',
        }).then(() => {
            setRender(!render);
            alert(`Unreport to Admin Success for!!!`);
        }).catch(err => console.log(err));
    };

    return (
        <div>
            <h2 className='text-2xl font-bold text-center my-10'>Reported Items</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Picture</th>
                            <th>Product Name</th>
                            <th>Seller Name</th>
                            <th>Seller Email</th>
                            <th>Seller Phone</th>
                            <th>Report Cancel</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItems.map((reportedItem, sl) => <ReportedItem
                                key={reportedItem?._id}
                                reportedItem={reportedItem}
                                sl={sl + 1}
                                unReportHandler={unReportHandler}
                            ></ReportedItem>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedItems;