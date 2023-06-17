import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../Components/productCard";

const CategoryView=()=> {
  // state
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  // hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProductsByCatgory();
  }, [params?.slug]);

  const loadProductsByCatgory = async () => {
    try {
      const { data } = await axios.get(`/products-by-category/${params.slug}`);
      setCategory(data.category);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="container m-10">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-yellow-500 font-medium tracking-widest title-font mb-2 capitalize">{category?.name}</h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">{`${products?.length} products found in "${category?.name}"`}</h1>
        </div>
        <div className="grid grid-cols-3">
          {products?.map((p) => (
            <div key={p._id} className="lg:w-1/4 md:w-1/2 m-3 p-5 w-full">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
  );
}

export default CategoryView;
