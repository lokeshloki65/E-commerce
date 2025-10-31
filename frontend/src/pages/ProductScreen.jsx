import { useGetProductDetailsQuery } from "../slices/productsApiSlices";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";

import {
  RiShoppingCartLine,
  RiPlayFill,
  RiArrowLeftLine,
} from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductDetailsQuery(productId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}.Error</div>;
  }
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };
  return (
    <div>
      <Link to="/">
        <button className="btn btn-neutral mt-8">
          <RiArrowLeftLine size={18} />
          Go back
        </button>
      </Link>
      <div className="my-8 flex items-center justify-center">
        {product && (
          <div className="grid rounded-lg grid-cols-1 md:grid-cols-2 dark:bg-gray-800 bg-base-100 shadow-xl">
            <figure className="rounded-t-lg md:rounded-t-none rounded-l-none  md:rounded-l-lg">
              <img
                className="w-full rounded-t-lg md:rounded-l-lg h-full"
                src={product.image}
                alt={product.name}
              />
            </figure>
            <div className="p-6 rounded-lg flex flex-col space-y-4">
              <h2 className="dark:text-gray-50 font-bold text-2xl">
                {product.name}
              </h2>
              <div className="text-yellow-500">
                <Rating value={product.rating} />
              </div>
              <p className="text-base dark:text-gray-200 font-light">
                {product.numReviews} reviews
              </p>
              <div className="flex flex-col gap-2 my-1">
                <p className="dark:text-gray-300">{product.description}</p>
                <div className="my-4 flex flex-col gap-1">
                  <p
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    style={{
                      textDecoration: "line-through",
                      textDecorationThickness: "2px",
                      textDecorationColor: "red",
                    }}
                  >
                    ${product.oldPrice}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                    ${product.price}
                  </p>
                </div>
                <p className="dark:text-gray-300">
                  <span className="font-medium">Category:</span>{" "}
                  {product.category}
                </p>
                <p className="font-medium dark:text-gray-300">
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                {product.countInStock > 0 && (
                  <div>
                    <p className="font-medium">Qty</p>
                    <form>
                      <select
                        className="select select-primary w-full max-w-xs dark:bg-gray-700 dark:text-gray-200"
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((item) => (
                          <option key={item + 1} value={item + 1}>
                            {item + 1}
                          </option>
                        ))}
                      </select>
                    </form>
                  </div>
                )}
              </div>
              <div className="flex card-actions space-x-10">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="btn btn-secondary"
                >
                  <span>Add to Cart</span>
                  <RiShoppingCartLine size={15} color="white" />
                </button>
                <button
                  disabled={product.countInStock === 0}
                  className="btn btn-primary"
                >
                  <span>Buy Now</span>
                  <RiPlayFill size={15} color="white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
