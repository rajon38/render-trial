import React from 'react';
import Navbar from "./Components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import Search from "./pages/Search";
import Shop from "./pages/Shop";
import CategoryView from "./pages/CategoryView";
import Cart from "./pages/Cart";
import Register from "./pages/Auth/Register";
import LogIn from "./pages/Auth/LogIn";
import Footer from "./Components/footer";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import Dashboard from "./pages/User/Dashboard";
import UserOrders from "./pages/User/UserOrders";
import UserProfile from "./pages/User/UserProfile";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminCategory from "./pages/Admin/Category";
import AdminProduct from "./pages/Admin/product";
import AdminProducts from "./pages/Admin/products";
import AdminProductUpdate from "./pages/Admin/ProductUpdate";
import AdminOrders from "./pages/Admin/Orders";
import CategoryList from "./pages/CategoryList";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Toaster position="top-center" />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/category/:slug" element={<CategoryView />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:slug" element={<ProductView />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PrivateRoute />}>
                    <Route path="user" element={<Dashboard />} />
                    <Route path="user/profile" element={<UserProfile />} />
                    <Route path="user/orders" element={<UserOrders />} />
                </Route>

                <Route path="/dashboard" element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/category" element={<AdminCategory />} />
                    <Route path="admin/product" element={<AdminProduct />} />
                    <Route path="admin/products" element={<AdminProducts />} />
                    <Route
                        path="admin/product/update/:slug"
                        element={<AdminProductUpdate />}
                    />
                    <Route path="admin/orders" element={<AdminOrders />} />
                </Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;