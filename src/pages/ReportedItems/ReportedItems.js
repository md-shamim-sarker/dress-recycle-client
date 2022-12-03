import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {AuthContext} from '../../contexts/UserContext';
import ReportedItem from './ReportedItem';

const ReportedItems = () => {
    const [reportedItems, setReportedItems] = useState([]);
    const {render, setRender, deleteConfirmation} = useContext(AuthContext);

    const unReportHandler = (product) => {
        fetch(`http://localhost:5000/products/unreport/${product._id}`, {
            method: 'PUT',
        }).then(() => {
            toast.success('Successfully Report Cancelled!');
            setRender(!render);
        }).catch(err => console.log(err));
    };

    const handleDelete = user => {
        deleteConfirmation()
            .then((result) => {
                if(result.isConfirmed) {
                    fetch(`http://localhost:5000/products/report/${user._id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(() => {
                            toast.success('Delete Successfully!');
                            setRender(!render);
                        })
                        .catch(err => console.log(err));
                } else {
                    toast.success('Delete Cancelled!');
                }
            });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/products/report/true')
            .then(response => {
                setReportedItems(response.data);
            });
    }, [render]);

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
                                handleDelete={handleDelete}
                            ></ReportedItem>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedItems;