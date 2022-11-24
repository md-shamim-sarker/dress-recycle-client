import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {AuthContext} from '../../contexts/UserContext';

const AddProducts = () => {
    const {user} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    const [categories, setCategories] = useState([]);
    const {displayName, email} = user;

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err));
    }, []);

    const onSubmit = data => {
        const product = {
            categoryId: data.category.split(',')[0],
            category: data.category.split(',')[1],
            condition: data.condition,
            description: data.description,
            email: data.email,
            fullName: data.fullName,
            image: data.image,
            location: data.location,
            originalPrice: data.originalPrice,
            phone: data.phone,
            productName: data.productName,
            resalePrice: data.resalePrice,
            yearsOfUse: data.yearsOfUse,
            soldOut: false
        };

        productsAddToDb(product)
            .then(() => {
                alert('A product added successfully!!!');
            })
            .catch(err => {
                console.log(err);
            });
    };

    const productsAddToDb = async (product) => {
        try {
            await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            console.log('Product Added Successfully!!!');
        } catch(error) {
            console.error(error.message);
        }
    };

    return (
        <div className="hero">
            <div className="w-full lg:w-4/5 mx-auto my-10 lg:my-10 hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="w-full card flex-shrink-0 shadow-xl bg-base-100 border mb-10">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center">Add Products</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col md:flex-row gap-x-6'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Seller Name</span>
                                    </label>
                                    <input {...register("fullName")} type="text" value={displayName} disabled className="input input-bordered" />
                                </div>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input {...register("email")} type="email" value={email} disabled className="input input-bordered" />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-x-6'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input {...register("phone")} type="text" placeholder='phone number' className="input input-bordered" />
                                </div>

                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Location</span>
                                    </label>
                                    <input {...register("location")} type="text" placeholder='location' className="input input-bordered" />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-x-6'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input {...register("productName")} type="text" placeholder="product name" className="input input-bordered" />
                                </div>

                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <select {...register("category")} defaultValue='Boy Baby' className="select select-bordered">
                                        {
                                            categories.map(category => <option
                                                key={category._id}
                                                value={[category._id, category.categoryName]}
                                            >{category.categoryName}</option>)
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-x-6'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Condition</span>
                                    </label>
                                    <select {...register("condition")} defaultValue='Excellent' className="select select-bordered">
                                        <option value='Excellent'>Excellent</option>
                                        <option value='Good'>Good</option>
                                        <option value='Fair'>Fair</option>
                                    </select>
                                </div>

                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Original Price</span>
                                    </label>
                                    <input {...register("originalPrice")} type="text" placeholder="original price" className="input input-bordered" />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-x-6'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Resale Price</span>
                                    </label>
                                    <input {...register("resalePrice")} type="text" placeholder="resale price" className="input input-bordered" />
                                </div>

                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Years of Use</span>
                                    </label>
                                    <select {...register("yearsOfUse")} defaultValue='1 year' className="select select-bordered">
                                        <option value='1 Year'>1 year</option>
                                        <option value='2 Years'>2 years</option>
                                        <option value='3 Years'>3 years</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URL</span>
                                </label>
                                <input {...register("image")} type="text" placeholder="image url" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <textarea {...register("description")} className="textarea textarea-bordered h-24" placeholder="description"></textarea>
                            </div>

                            <div className="form-control mt-3">
                                <button type='submit' className="btn btn-primary">Add Products</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;