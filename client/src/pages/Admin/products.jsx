import React, {useEffect, useState} from 'react';
import AdminMenu from "../../Components/AdminMenu";
import {useAuth} from "../../context/auth";
import axios from "axios";
import {Link} from "react-router-dom";
import moment from "moment/moment";
import {BaseURL} from "../../context/BaseURL";

const AdminProducts = () => {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/products");
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='container m-10 flex flex-inline space-x-8'>
            <div className="w-1/6">
                <AdminMenu/>
            </div>
            <div className='w-5/6'>
                <div className="flex flex-col max-w-lg text-center w-full mb-5 ml-10 ">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">All Product</h1>
                </div>

                {products?.map((p) => (
                    <Link
                        key={p._id}
                        to={`/dashboard/admin/product/update/${p.slug}`}
                    >
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
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Link>
                    ))}
            </div>
            
        </div>
    );
};

export default AdminProducts;