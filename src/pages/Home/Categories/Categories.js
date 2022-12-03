import React, {useEffect, useState} from 'react';
import Category from './Category';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://dress-recycle-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <h2 className='text-4xl text-blue-600 font-bold text-center my-10'>Categories</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    categories.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>
        </>
    );
};

export default Categories;