import React, {useState} from 'react';
import {useAuth} from "../../context/auth";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LogIn = () => {
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // hook
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/login`, {
                email,
                password,
            });
            console.log(data);
            if (data?.error) {
                toast.error(data.error);
            } else {
                localStorage.setItem("auth", JSON.stringify(data));
                setAuth({ ...auth, token: data.token, user: data.user });
                toast.success("Login successful");
                navigate(
                    location.state ||
                    `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
                );
            }
        } catch (err) {
            console.log(err);
            toast.error("Login failed. Try again.");
        }
    };
    return (
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login Form</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="relative">
                                    <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    <label form="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm" >Email Address</label>
                                </div>
                                <div className="relative">
                                    <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                    <label form="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                <div className="relative">
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-2 py-1 "type="submit" >Submit</button>
                                </div>
                                    <div className="relative">
                                        <p>Have No Account?.<Link className="font-medium text-yellow-500 hover:text-yellow-600" to="/register">Register</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;