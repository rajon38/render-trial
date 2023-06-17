import React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../context/auth";
import {useCart} from "../context/cart";
import useCategory from "../hooks/useCategory";
import {useSearch} from "../context/search";
import axios from "axios";

const Navbar = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [values, setValues] = useSearch();
    // hooks
    const categories = useCategory();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/products/search/${values?.keyword}`);
            // console.log(data);
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (err) {
            console.log(err);
        }
    };
    const logout = () => {
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        navigate("/login");
    };
    return (
        <header className="text-gray-600 body-font shadow-lg">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round"
                         stroke-linejoin="round" stroke-width="2"
                         className="w-10 h-10 text-white p-2 bg-red-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">E-Com</span>
                </a>
                <nav
                    className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center space-x-4">
                    <Link className="mr-5 hover:text-gray-900 cursor-pointer" to="/">Home</Link>
                    <Link className="mr-5 hover:text-gray-90 cursor-pointer" to="/shop">Shop</Link>
                    <Link tabIndex={0} className="btn btn-ghost btn-circle" to="/cart">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item bg-red-500 text-white" >{cart?.length >= 1 ? cart.length : 0}</span>
                        </div>
                    </Link>
                    <a className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn m-0.5 mr-2">Categories</label>
                        <ul tabIndex={0} className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-52">
                            <li className="justify-between"><Link to="/categories"><a>All Categories</a></Link></li>
                            {categories?.map((c) => (
                                <li key={c._id} className="justify-between">
                                    <Link to={`/category/${c.slug}`} >
                                        {c.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </a>
                    <form className="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start" onSubmit={handleSubmit}>
                        <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">
                            <input type="search" id="footer-field" placeholder="Search" aria-label="Search" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setValues({ ...values, keyword: e.target.value })} value={values.keyword}/>
                        </div>
                        <button
                            className="inline-flex text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded" type="submit">Search
                        </button>
                    </form>
                </nav>
                {!auth?.user ? (
                    <>

                <Link
                    className="btn inline-flex items-center m-0.5 focus:outline-none" to="/login">LogIn
                </Link>
                    </>
                    ):(
                    <a className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn m-0.5 mr-1">{auth?.user?.name?.toUpperCase()}</label>
                        <ul tabIndex={0} className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-52">
                            <li className="justify-between"><Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                            }`}><a>Dashboard</a></Link></li>
                            <li className="justify-between"><Link  onClick={logout}>LogOut</Link></li>
                        </ul>
                    </a>
                    )}

            </div>
        </header>
    );
};

export default Navbar;