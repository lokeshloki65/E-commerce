import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { RiDeleteBin6Line } from "@remixicon/react";

const CartScreen = () => {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart || { cartItem: [] });

  // Handle quantity change
  const handleQtyChange = (product, qty) => {
    const newQty = Number(qty);
    if (newQty > 0 && newQty <= product.countInStock) {
      dispatch(
        addToCart({
          ...product,
          qty: newQty,
        })
      );
    }
  };

  // Handle remove item
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  // If cart is empty
  if (!cartItem?.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Your Cart is Empty
        </h2>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-20">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-4">
          {cartItem.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 dark:bg-gray-800 shadow-xl"
            >
              <div className="card-body flex flex-row items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div className="flex-grow ml-4">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-lg font-semibold dark:text-white hover:text-primary"
                  >
                    {item.name}
                  </Link>

                  <p className="text-lg font-bold dark:text-white">
                    ${item.price}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={item.qty}
                    onChange={(e) => handleQtyChange(item, e.target.value)}
                    className="select select-bordered w-20 dark:bg-gray-700 dark:text-white"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="btn btn-error btn-square"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary - Takes up 1 column on large screens */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 dark:bg-gray-800 shadow-xl">
            <div className="card-body">
              <h2 className="card-title dark:text-white">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between dark:text-white">
                  <span>Items ({cartItem.length}):</span>
                  <span>
                    $
                    {cartItem
                      .reduce((a, c) => a + c.price * c.qty, 0)
                      .toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between dark:text-white">
                  <span>Shipping:</span>
                  <span>
                    $
                    {cartItem.reduce((a, c) => a + c.price * c.qty, 0) > 100
                      ? "0.00"
                      : "20.00"}
                  </span>
                </div>

                <div className="flex justify-between dark:text-white">
                  <span>Tax (18%):</span>
                  <span>
                    $
                    {(
                      0.18 * cartItem.reduce((a, c) => a + c.price * c.qty, 0)
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="divider"></div>

                <div className="flex justify-between font-bold text-lg dark:text-white">
                  <span>Total:</span>
                  <span>
                    $
                    {(
                      cartItem.reduce((a, c) => a + c.price * c.qty, 0) +
                      (cartItem.reduce((a, c) => a + c.price * c.qty, 0) > 100
                        ? 0
                        : 20) +
                      0.18 * cartItem.reduce((a, c) => a + c.price * c.qty, 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-primary w-full"
                  disabled={cartItem.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
