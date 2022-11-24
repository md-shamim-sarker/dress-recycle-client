import React from 'react';
import {Link} from 'react-router-dom';
import error from '../../assets/error_emoji.gif';

const ErrorPage = () => {
    return (
        <section className="flex items-center h-screen sm:p-16 text-gray-900">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                <img src={error} alt="..." />
                <p className="text-5xl font-bold">404 | Not Found</p>
                <Link to={"/"} className="btn btn-primary">Back to homepage</Link>
            </div>
        </section>
    );
};

export default ErrorPage;