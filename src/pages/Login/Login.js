import React, {useContext} from 'react';
import {RiFacebookFill, RiGoogleFill} from 'react-icons/ri';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import login from '../../assets/login.jpg';
import {useForm} from "react-hook-form";
import {AuthContext} from '../../contexts/UserContext';
import toast from 'react-hot-toast';

const Login = () => {
    const {
        signInWithGoogle,
        signInWithFacebook,
        signInWithEmailPassword,
        dataAddToDb,
        isUserExist
    } = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Token handler
    const tokenHandler = (currentUser) => {
        return fetch('https://dress-recycle-server.vercel.app/jwt', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        });
    };

    const signInWithGoogleHandler = () => {
        signInWithGoogle()
            .then(result => {
                const data = result.user;
                const user = {
                    fullName: data.displayName,
                    email: data?.email,
                    phone: "",
                    role: 'buyer',
                    isVerified: false,
                    date: Number(new Date()),
                    isAdmin: false
                };

                const currentUser = {
                    email: user?.email
                };
                // console.log(currentUser);
                // Set jwt token
                tokenHandler(currentUser)
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('token', data.token);
                        navigate(from, {replace: true});
                    });
                // navigate(from, {replace: true});
                // Add to database
                isUserExist(user?.email)
                    .then(res => res.json())
                    .then(data => {
                        if(data.length === 0) {
                            dataAddToDb(user, 'https://dress-recycle-server.vercel.app/users')
                                .then((result) => {
                                    if(result.ok) {
                                        toast.success('This user is saved to database!');
                                    }
                                }).catch(console.dir);
                        }
                    });
            }).catch(err => {
                console.log(err);
            });
    };

    const signInWithFacebookHandler = () => {
        signInWithFacebook()
            .then(result => {
                const data = result.user;
                const user = {
                    fullName: data.displayName,
                    email: data?.email,
                    phone: "",
                    role: 'buyer',
                    isVerified: false,
                    date: Number(new Date()),
                    isAdmin: false
                };

                const currentUser = {
                    email: user?.email
                };
                // console.log(currentUser);
                // Set jwt token
                tokenHandler(currentUser)
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('token', data.token);
                        navigate(from, {replace: true});
                    });
                // navigate(from, {replace: true});
                // Add to database
                isUserExist(user?.email)
                    .then(res => res.json())
                    .then(data => {
                        if(data.length === 0) {
                            dataAddToDb(user, 'https://dress-recycle-server.vercel.app/users')
                                .then((result) => {
                                    if(result.ok) {
                                        toast.success('This user is saved to database!');
                                    }
                                }).catch(console.dir);
                        }
                    });
            }).catch(err => {
                console.log(err);
            });
    };

    const onSubmit = data => {
        signInWithEmailPassword(data?.email, data.password)
            .then(result => {
                const user = result.user;

                const currentUser = {
                    email: user?.email
                };
                // console.log(currentUser);
                // Set jwt token
                tokenHandler(currentUser)
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('token', data.token);
                        navigate(from, {replace: true});
                    });
                // navigate(from, {replace: true});
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
                        <h1 className="text-4xl font-bold text-center">Login Now</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                <label className="label">
                                    <Link to={"/login"} className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-3">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                            <div className='flex gap-1 my-1'>
                                <span>You don't have account? Please</span>
                                <Link to={"/register"} className="text-blue-600 underline">Register</Link>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <h2 className='text-xl font-bold text-center'>Login with social account</h2>
                        <div className='flex gap-1 justify-center my-2'>
                            <button onClick={signInWithGoogleHandler}>
                                <RiGoogleFill className='text-2xl'></RiGoogleFill>
                            </button>
                            <button onClick={signInWithFacebookHandler}>
                                <RiFacebookFill className='text-2xl'></RiFacebookFill>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;