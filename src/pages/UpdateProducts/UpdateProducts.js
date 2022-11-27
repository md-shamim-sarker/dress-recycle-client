import React from 'react';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';
import {useLoaderData, useNavigate} from 'react-router-dom';

const UpdateProducts = () => {
    const product = useLoaderData();
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        const products = {
            category: data.category,
            condition: data.condition,
            description: data.description,
            image: data.image,
            location: data.location,
            originalPrice: data.originalPrice,
            productName: data.productName,
            resalePrice: data.resalePrice,
            yearsOfUse: data.yearsOfUse,
            date: Date().slice(4, 24)
        };
        fetch(`http://localhost:5000/products/update/${product._id}`, {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(products)
        }).then(() => {
            toast.success('Successfully Updated!');
            navigate("/dashboard/myProducts");
        }).catch(err => console.log(err));
    };

    return (
        <div className="hero">
            <div className="w-full lg:w-4/5 mx-auto my-10 lg:my-10 hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="w-full card flex-shrink-0 shadow-xl bg-base-100 border mb-10">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center">Update Product</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col md:flex-row gap-x-6'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Seller Name</span>
                                    </label>
                                    <input {...register("fullName")} type="text" value={product.sellerName} readOnly className="input input-bordered" />
                                </div>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input {...register("email")} type="email" value={product.sellerEmail} readOnly className="input input-bordered" />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-x-6'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input {...register("phone")} type="text" value={product.sellerPhone} readOnly className="input input-bordered" />
                                </div>

                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Location</span>
                                    </label>
                                    <input {...register("location")} type="text" defaultValue={product.location} className="input input-bordered" />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-x-6'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input {...register("productName")} type="text" defaultValue={product.productName} className="input input-bordered" />
                                </div>

                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <select {...register("category")} defaultValue={product.category} className="select select-bordered">
                                        <option value='Boy Baby'>Boy Baby</option>
                                        <option value='Girl Baby'>Girl Baby</option>
                                        <option value='Gentle Man'>Gentle Man</option>
                                        <option value='Beautiful Lady'>Beautiful Lady</option>
                                        <option value='Winter Variant'>Winter Variant</option>
                                        <option value='Summer Variant'>Summer Variant</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-x-6'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Condition</span>
                                    </label>
                                    <select {...register("condition")} defaultValue={product.condition} className="select select-bordered">
                                        <option value='Excellent'>Excellent</option>
                                        <option value='Good'>Good</option>
                                        <option value='Fair'>Fair</option>
                                    </select>
                                </div>

                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Original Price</span>
                                    </label>
                                    <input {...register("originalPrice")} type="text" defaultValue={product.originalPrice} className="input input-bordered" />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-x-6'>
                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Resale Price</span>
                                    </label>
                                    <input {...register("resalePrice")} type="text" defaultValue={product.resalePrice} className="input input-bordered" />
                                </div>

                                <div className="form-control w-full lg:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Years of Use</span>
                                    </label>
                                    <select {...register("yearsOfUse")} defaultValue={product.yearsOfUse} className="select select-bordered">
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
                                <input {...register("image")} type="text" defaultValue={product.image} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <textarea {...register("description")} className="textarea textarea-bordered h-24" defaultValue={product.description}></textarea>
                            </div>

                            <div className="form-control mt-3">
                                <button type='submit' className="btn btn-primary">Update Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProducts;