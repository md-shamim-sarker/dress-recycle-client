import React, {useContext} from 'react';
import login from '../../assets/login.jpg';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/UserContext';
// import {async} from '@firebase/util';

const Register = () => {
    const {
        createUser,
        updateUser,
        signInWithEmailPassword,
        logOut,
        usersAddToDb
    } = useContext(AuthContext);

    const {register, handleSubmit, reset} = useForm();
    const onSubmit = data => {

        const user = {
            fullName: data.fullName,
            email: data.email,
            role: data.role,
            date: Number(new Date()),
            isAdmin: false
        };

        createUser(data.email, data.password)
            .then((result) => {
                logOut().then().catch();
                updateUser(data.fullName, data.image)
                    .then(() => {
                        signInWithEmailPassword(data.email, data.password)
                            .then(() => {
                                usersAddToDb(user)
                                    .then(() => {
                                        alert('Data Added Successfully!!');
                                    })
                                    .catch(err => console.log(err));
                                console.log('Md. Shamim Sarker ', user);
                            }).catch(err => console.log(err));
                        reset();
                    }).catch(err => console.log(err));
                console.log(result.user);
            }).catch(err => console.log(err));
    };

    return (
        <div className="hero">
            <div className="w-full lg:w-4/5 mx-auto my-10 lg:my-20 hero-content flex-col lg:flex-row-reverse gap-10">
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <img src={login} alt="..." className='w-full' />
                </div>
                <div className="w-full lg:w-1/2 card flex-shrink-0 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center">Register Now</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input {...register("fullName")} type="text" placeholder="full name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URL</span>
                                </label>
                                <input {...register("image")} type="text" placeholder="image url" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input {...register("confirmPassword")} type="password" placeholder="confirm password" className="input input-bordered" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Select User Role</span>
                                </label>
                                <select {...register("role")} defaultValue='buyer' className="select select-bordered">
                                    <option value='buyer'>Buyer</option>
                                    <option value='seller'>Seller</option>
                                </select>
                            </div>
                            <div className="form-control mt-3">
                                <button type='submit' className="btn btn-primary">Register</button>
                            </div>
                            <div className='flex gap-1 my-1'>
                                <span>You already have an account? Please</span>
                                <Link to={"/login"} className="text-blue-600 underline">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;