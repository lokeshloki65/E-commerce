import React, { useEffect, useState } from "react";
import {
  RiFeedbackFill,
  RiShoppingCartLine,
  RiPlayFill,
} from "@remixicon/react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlices";

const Products = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  console.log("Products Query State:", { products, error, isLoading });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}.Error</div>;
  }
  return (
    <div className="container mx-auto my-4">
      <h1 className="text-3xl dark:text-white font-bold text-center mb-8">
        New Arrivals
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="card bg-base-100 mx-auto dark:bg-gray-800 w-96 shadow-xl"
          >
            <Link to={`/product/${product._id}`}>
              <div className="relative group">
                <figure className="overflow-hidden rounded-t-lg h-96">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="transition-all duration-300 ease-in-out group-hover:blur-sm"
                  />
                  {/* Ratings and reviews on hover */}
                  <div className="absolute inset-0 flex items-center rounded-t-lg justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                    <div className="flex flex-col font-medium text-gray-200 space-y-4">
                      <div className="flex flex-row items-center space-x-2">
                        <Rating value={product.rating} />
                      </div>
                      <p className="flex flex-row items-center justify-center space-x-2">
                        <span>Reviews: {product.numReviews} </span>
                        <RiFeedbackFill size={20} color="white" />
                      </p>
                    </div>
                  </div>
                </figure>
              </div>
              <div className="card-body">
                <h2 className="card-title font-bold text-gray-800 dark:text-white">
                  {product.name}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p className="line-clamp-3 my-2 text-gray-700 dark:text-gray-300">
                  {product.description}
                </p>
                <div className="card-actions justify-between">
                  <div className="flex flex-row items-center justify-between gap-36">
                    <div>
                      <p
                        className="text-sm font-medium text-gray-900 dark:text-gray-200"
                        style={{
                          textDecoration: "line-through",
                          textDecorationThickness: "2px",
                          textDecorationColor: "red",
                        }}
                      >
                        ${product.oldPrice}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-200">
                        ${product.price}
                      </p>
                    </div>
                    <p className="text-base my-1 font-semibold text-gray-600 dark:text-gray-300">
                      Stock:{" "}
                      <span className="font-bold text-red-700">
                        {product.countInStock} left
                      </span>
                    </p>
                  </div>
                  <div className="flex my-1 space-x-16">
                    <button className="btn btn-primary">
                      <span>Buy Now</span>
                      <RiPlayFill size={15} color="white" />
                    </button>
                    <button className="btn btn-secondary">
                      <span>Add to Cart</span>
                      <RiShoppingCartLine size={15} color="white" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
