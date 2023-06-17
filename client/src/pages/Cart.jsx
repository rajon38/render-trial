import React from 'react';
import ProductHorizantal from "../Components/ProductHorizantal";
import {useCart} from "../context/cart";
import {useAuth} from "../context/auth";
import {useNavigate} from "react-router-dom";
import UserCartSideBar from "../Components/UserCartSideBar";

const Cart = () => {

    // context
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    // hooks
    const navigate = useNavigate();

    return (
        <div className="h-screen pt-20">

            <h1 className="mb-10 text-center text-2xl font-bold">{`Hello ${auth?.token && auth?.user?.name}`}</h1>
            <h1 className="mb-10 text-center text-2xl font-bold">{
                cart?.length
                    ? `You have ${cart.length} items in the cart. ${auth?.token ? "" : "Please login to checkout"
                    }`
                    : "Your cart is empty"
            }</h1>

            <div className="container-fluid">
                <div className="row">
                    <div className="">
                        <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            {cart?.length ? (
                                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                                    <div className="rounded-lg md:w-2/3">
                                        {cart?.map((p, index) => (
                                        <ProductHorizantal key={index} p={p}/>
                                        ))}
                                    </div>

                                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                        <UserCartSideBar/>
                                    </div>


                                </div>

                            ) : (
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate("/")}
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;