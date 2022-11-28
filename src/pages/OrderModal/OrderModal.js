import React, {useContext} from 'react';
import toast from 'react-hot-toast';
import {AuthContext} from '../../contexts/UserContext';

const OrderModal = ({product, setProduct}) => {
    const {user, dataAddToDb} = useContext(AuthContext);
    const onSubmitHandler = event => {
        event.preventDefault();
        const form = event.target;
        const userName = form.userName.value;
        const userEmail = form.email.value;
        const userPhone = form.phone.value;
        const sellerName = product.sellerName;
        const sellerEmail = product.sellerEmail;
        const sellerPhone = product.sellerPhone;
        const productId = product.productId;
        const productImage = product.productImage;
        const productName = form.product.value;
        const productPrice = form.price.value;
        const meetingLocation = form.meetingLocation.value;
        const orderDate = Date().slice(4, 24);

        const orders = {userName, userEmail, userPhone, sellerName, sellerEmail, sellerPhone, productId, productName, productImage, productPrice, meetingLocation, orderDate};
        console.log(orders);

        dataAddToDb(orders, 'https://dress-recycle-server.vercel.app/orders')
            .then(() => {
                toast.success('Successfully Ordered!');
                setProduct(null);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <input type="checkbox" id="order-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="order-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-2xl font-bold text-center">Order Information</h3>

                    <form onSubmit={onSubmitHandler} className='flex flex-col gap-y-3 mt-3'>
                        <div className="form-control w-full">
                            <input name="userName" type="text" defaultValue={user?.displayName} readOnly className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input name="email" type="text" defaultValue={user?.email} readOnly className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input name="phone" type="text" placeholder='Phone Number' className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input name="product" type="text" defaultValue={product.productName} readOnly className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input name="price" type="text" defaultValue={product.productPrice} readOnly className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <input name="meetingLocation" type="text" placeholder='Meeting Location' className="input input-bordered w-full" />
                        </div>
                        <button type='submit' className="btn btn-primary w-full">Order Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;