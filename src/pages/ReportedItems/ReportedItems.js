import React, {useEffect, useState} from 'react';
import ReportedItem from './ReportedItem';

const ReportedItems = () => {
    const [reportedItems, setReportedItems] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products/report/true')
            .then(res => res.json())
            .then(data => setReportedItems(data))
            .catch(err => console.log(err));
    }, []);

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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItems.map((reportedItem, sl) => <ReportedItem
                                key={reportedItem?._id}
                                reportedItem={reportedItem}
                                sl={sl + 1}
                            ></ReportedItem>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedItems;