"use client"
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CartItem from '../CartItem'
import { getCartItems } from '@/utils/api/cart'

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (id) => {
    // setCartItems(items =>
    //   items.map(item => {
    //     if (item.id === id) {
    //       const newQuantity = Math.max(1, item.quantity + change);
    //       return { ...item, quantity: newQuantity };
    //     }
    //     return item;
    //   })
    // );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const retrieveCartItems = async () => {
    const response = (await getCartItems()).data;
    console.log(response.data.items)
    setCartItems(response.data.items)
  }

  useEffect(() => {
    retrieveCartItems();
  }, [])


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center space-x-4 p-6 border-b border-gray-200">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold"><ShoppingCart /></span>
          </div>
          <h1 className="text-2xl font-light text-gray-800">Your Shopping Cart</h1>
        </div>

        {/* Cart Items */}
        <div className="p-6 space-y-4">
            {cartItems.map((item) => (
                <CartItem key={item._id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} formatPrice={formatPrice}/>
            ))}

            </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 mt-auto">
          <div className="flex items-center justify-between">
            {/* Back to Shop */}
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shop</span>
            </button>

            {/* Subtotal */}
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Subtotal:</p>
              <p className="text-xl font-semibold text-gray-900">
                {1212}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart