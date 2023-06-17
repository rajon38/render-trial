import React from 'react';
import useCategory from "../hooks/useCategory";
import {Link} from "react-router-dom";

const CategoryList = () => {
    const categories = useCategory();
    return (
        <div className='container m-10'>
        <div className="flex flex-col max-w-lg text-center w-full mb-5 ml-10 ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">All Categories</h1>
        </div>
            <div className="container overflow-hidden">
                <div className="row gx-5 gy-5 mt-3 mb-5 flex space-x-2">
                    {categories?.map((c) => (
                        <div className="1/2" key={c._id}>
                            <button className="btn btn-light col-12 text-dark p-3">
                                <Link to={`/category/${c.slug}`}>{c.name}</Link>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CategoryList;