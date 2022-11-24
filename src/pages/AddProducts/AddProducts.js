import React, {useContext} from 'react';
import {useForm} from 'react-hook-form';
import {AuthContext} from '../../contexts/UserContext';

const AddProducts = () => {
    const {user} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    const {displayName, email} = user;

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className="hero">
            <div className="w-full lg:w-4/5 mx-auto my-10 lg:my-10 hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="w-full lg:w-1/2 card flex-shrink-0 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center">Add Products</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Seller Name</span>
                                </label>
                                <input {...register("fullName")} type="text" value={displayName} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="email" value={email} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input {...register("phone")} type="text" placeholder='phone number' className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input {...register("location")} type="text" placeholder='location' className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input {...register("productName")} type="text" placeholder="product name" className="input input-bordered" />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select {...register("category")} defaultValue='Boy Baby' className="select select-bordered">
                                    <option value='Boy Baby'>Boy Baby</option>
                                    <option value='Girl Baby'>Girl Baby</option>
                                    <option value='Gentle Man'>Gentle Man</option>
                                    <option value='Beautiful Lady'>Beautiful Lady</option>
                                    <option value='Winter Variant'>Winter Variant</option>
                                    <option value='Summer Variant'>Summer Variant</option>
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Condition</span>
                                </label>
                                <select {...register("condition")} defaultValue='Excellent' className="select select-bordered">
                                    <option value='Excellent'>Excellent</option>
                                    <option value='Good'>Good</option>
                                    <option value='Fair'>Fair</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Original Price</span>
                                </label>
                                <input {...register("originalPrice")} type="text" placeholder="original price" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Resale Price</span>
                                </label>
                                <input {...register("resalePrice")} type="text" placeholder="resale price" className="input input-bordered" />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Years of Use</span>
                                </label>
                                <select {...register("yearsOfUse")} defaultValue='1 year' className="select select-bordered">
                                    <option value='1 Year'>1 year</option>
                                    <option value='2 Years'>2 years</option>
                                    <option value='3 Years'>3 years</option>
                                </select>
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