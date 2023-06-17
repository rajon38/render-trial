import React from 'react';
import {useCart} from "../context/cart";
import moment from "moment";
import {BaseURL} from "../context/BaseURL";

const ProductHorizantal = ({p, remove=true}) => {
    // context
    const [cart, setCart] = useCart();

    const removeFromCart = (productId) => {
        let myCart = [...cart];
        let index = myCart.findIndex((item) => item._id === productId);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
    };
    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img
                src={`${BaseURL}/product/photo/${p._id}`}
                alt={p.name} className="w-full rounded-lg sm:w-40"/>
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0 space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 text-left ">{p.name}</h2>
                    <p className="mt-1 text-xs text-gray-700 text-left">{`${p?.description?.substring(
                        0,
                        50
                    )}..`}</p>
                    <p className="text-muted text-left">
                        Listed {moment(p.createdAt).fromNow()}
                    </p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center space-x-4 mt-6">
                        <h1 className="text-sm font-bold text-size-2">{p?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                        })}</h1>
                        {remove && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={() => removeFromCart(p._id)}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductHorizantal;