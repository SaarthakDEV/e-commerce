"use client";
import { ArrowLeft, ShoppingCart, Lock, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import CartItem from "../CartItem";
import { getCartItems } from "@/utils/api/cart";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const retrieveCartItems = async () => {
    try{
    const response = (await getCartItems()).data;
    if(response.success){
      setCartItems(response?.data?.items ?? []);
    }else{
      throw new Error(response.message);
    }
  }catch(err: any){
    toast.error(err.message)
  }
  };

  const getTotalAmount = () => {
    const amount = cartItems?.reduce(
      (acc, item: { quantity: number; product: { price: number } }) => {
        acc += item.quantity * item.product.price;
        return acc;
      },
      0
    );
    setTotalAmount(amount);
  };

  const handleCheckout = () => {
    window.location.href="/create-order"
  }

  useEffect(() => {
    getTotalAmount();
  }, [cartItems]);

  useEffect(() => {
    retrieveCartItems();
  }, [isUpdate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center space-x-4 p-6 border-b border-gray-200">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              <ShoppingCart />
            </span>
          </div>
          <h1 className="text-2xl font-light text-gray-800">
            Your Shopping Cart
          </h1>
        </div>

        <div className="p-6 space-y-4">
          {cartItems?.map(
            (item: {
              _id: string;
              quantity: number;
              product: {
                image: string;
                name: string;
                _id: string;
                price: number;
              };
            }) => (
              <CartItem
                key={item._id}
                item={item}
                formatPrice={formatPrice}
                setIsUpdate={setIsUpdate}
                isUpdate={isUpdate}
              />
            )
          )}
        </div>

        <div className="p-6 border-t border-gray-200 mt-auto">
          <div className="flex items-center justify-between">
            <a
              href="/dashboard/customer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shop</span>
            </a>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Subtotal:</p>
              <p className="text-xl font-semibold text-gray-900">
                ${totalAmount}
              </p>
            </div>
          </div>
        </div>
      <div className="mb-12 flex justify-center">
        <button onClick={handleCheckout} disabled={cartItems?.length === 0} className={`group cursor-pointer relative overflow-hidden text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-[1.02] transition-all duration-300 ${cartItems?.length === 0 ? "bg-gray-400 " : "bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700"}`}>
          <div className="relative flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Secure Checkout</span>
            <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-300">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </button>
      </div>
      </div>
    </div>
  );
};

export default Cart;
