import React, {useEffect, useState} from 'react';
import AdCard from './AdCard';

const Advertise = () => {
    const [adItems, setAdItems] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products/all/advertise')
            .then(res => res.json())
            .then(data => setAdItems(data))
            .catch(err => console.log(err));
    }, []);
    console.log(adItems);
    return (
        <>
            {
                adItems.length > 0 && <>
                    <h2 className='text-4xl text-blue-600 font-bold text-center my-10'>Advertisement</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                        {
                            adItems.map(adItem => <AdCard
                                key={adItem._id}
                                adItem={adItem}
                            ></AdCard>)
                        }
                    </div>
                </>
            }

        </>
    );
};

export default Advertise;