import React, {useEffect, useState} from 'react';
import AdminMenu from "../../Components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../context/auth";
import {Select} from "antd";
import {BaseURL} from "../../context/BaseURL";
const {Option} = Select

const AdminProductUpdate = () => {
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState("");
    const [quantity, setQuantity] = useState("");
    const [id, setId] = useState("");
    // hook
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        loadProduct();
    }, []);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadProduct = async () => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setCategory(data.category._id);
            setShipping(data.shipping);
            setQuantity(data.quantity);
            setId(data._id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            photo && productData.append("photo", photo);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("shipping", shipping);
            productData.append("quantity", quantity);

            const { data } = await axios.put(`/product/${id}`, productData);
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.name}" is updated`);
                // window.location.reload();
                navigate("/dashboard/admin/products");
            }
        } catch (err) {
            console.log(err);
            toast.error("Product create failed. Try again.");
        }
    };
    const handleDelete = async (req, res) => {
        try {
            let answer = window.confirm(
                "Are you sure you want to delete this product?"
            );
            if (!answer) return;
            const { data } = await axios.delete(`/product/${id}`);
            toast.success(`"${data.name}" is deleted`);
            navigate("/dashboard/admin/products");
        } catch (err) {
            console.log(err);
            toast.error("Delete failed. Try again.");
        }
    };
    return (
        <div className='container m-10 flex flex-inline space-x-8'>
            <div className="w-2/6">
                <AdminMenu/>
            </div>
            <div className='w-5/6'>
                <div className="flex flex-col max-w-lg text-center w-full mb-5 ml-10 ">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Update Product</h1>
                </div>


                <form className="space-y-4 text-gray-700 ml-10">
                    {photo ? (
                        <div className="text-center">
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="product "
                                className="w-full rounded-lg sm:w-40"
                                height="200px"
                            />
                        </div>
                    ) : (
                        <div className="text-center">
                            <img
                                src={`${BaseURL
                                }/product/photo/${id}`}
                                alt="product"
                                className="w-full rounded-lg sm:w-40"
                                height="200px"
                            />
                        </div>
                    )}
                    <div className="flex flex-wrap space-y-4">
                        <div className="w-full ">
                            {photo ? photo.name : ""}
                            <input type="file" className="file-input file-input-bordered file-input-warning w-full max-w-xl"
                                   onChange={(e) => setPhoto(e.target.files[0])}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap space-y-4 ">
                        <div className="w-full ">
                            <label className="block mb-1" htmlFor="formGridCode_card">Write a Name</label>
                            <input
                                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                type="text" id="formGridCode_card" placeholder="Write a name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="w-full">
                            <label className="block mb-1" htmlFor="formGridCode_card">Write Description</label>
                            <textarea
                                className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                placeholder="Write a description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="flex flex-wrap  space-y-4 md:space-y-0">
                        <div className="w-full px-2 md:w-1/2">
                            <label className="block mb-1" htmlFor="formGridCode_name">Choose Category</label>
                            <Select
                                className="w-full h-10 px-3 text-base rounded-lg"
                                type="text" placeholder="Choose category" size="large"
                                onChange={(value) => setCategory(value)}>
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}</Select>
                        </div>
                        <div className="w-full px-2 md:w-1/2">
                            <label className="block mb-1" htmlFor="formGridCode_last">Choose Shipping</label>
                            <Select
                                className="w-full h-10 px-3 text-base rounded-lg focus:shadow-outline"
                                type="text" size="large" placeholder="Choose shipping"
                                onChange={(value) => setShipping(value)}>
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
                        <div className="w-full px-2 md:w-1/2">
                            <label className="block mb-1" htmlFor="formGridCode_name">Enter Quantity</label>
                            <input
                                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                type="number" placeholder="Enter quantity"
                                value={quantity} min="1"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="w-full px-2 md:w-1/2">
                            <label className="block mb-1" htmlFor="formGridCode_last">Enter Price</label>
                            <input
                                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                type="number" placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2 space-x-4 md:space-x-2">
                        <button onClick={handleSubmit}
                                className=" h-12 px-6 text-white-300 transition-colors duration-150 bg-yellow-200 rounded-lg focus:shadow-outline hover:bg-yellow-500">Update
                        </button>
                        <button onClick={handleDelete}
                                className=" h-12 px-6 text-white-300 transition-colors duration-150 bg-red-200 rounded-lg focus:shadow-outline hover:bg-red-500">Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductUpdate;