import React from 'react';
import {useLoaderData} from 'react-router-dom';
import Product from './Product';
import ProductBanner from './ProductBanner';

const Products = () => {
    const products = useLoaderData();
    const categoryImage = products[0].categoryImage;
    return (
        <>
            <ProductBanner categoryImage={categoryImage}></ProductBanner>
            <div className='w-4/5 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </>
    );
};

export default Products;