import { useSearch } from "../context/search";
import React from "react";
import ProductCard from "../Components/productCard";

const Search=()=> {
  const [values, setValues] = useSearch();

  return (
    <>
        <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">{
                values?.results?.length < 1
                    ? "No products found"
                    : `Found ${values?.results?.length} products`
            }</h1>
        </div>

      <div className="container mt-3">
        <div className="grid grid-cols-3">
          {values?.results?.map((p) => (
            <div key={p._id} className="lg:w-1/4 md:w-1/2 m-3 p-5 w-full">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
