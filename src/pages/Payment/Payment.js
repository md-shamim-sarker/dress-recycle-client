import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React from 'react';
import {useLoaderData} from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Payment = () => {
    const product = useLoaderData();

    const stripePromise = loadStripe('pk_test_51M671KBCbl881jPIHJarERD8acdgXbDfy0huYkZxSy5GfNdlNIB7AqB5zEwylA4G7KVldAJ3mwiIRd6Q3NGdObmm00vdkHf0aP');
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm product={product} />
        </Elements>
    );
};

export default Payment;