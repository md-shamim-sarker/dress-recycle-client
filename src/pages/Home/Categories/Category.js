import React from 'react';
import {Link} from 'react-router-dom';

const Category = ({category}) => {
    const {_id, image, categoryName, description} = category;
    return (
        <div className="card card-compact bg-base-100 shadow-xl mb-20">
            <figure><img src={image} alt="..." className='w-full' /></figure>
            <div className="card-body">
                <h2 className="card-title">{categoryName}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <Link to={`/categories/${_id}`} className="btn btn-primary w-full">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Category;