import { removeItem } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import React from 'react'

const CartItem = ({item, updateQuantity, removeItem, formatPrice}) => {
  console.log(item)
  return (
    <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
              {/* Product Image */}
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <img src={item.product.image} className="w-16 h-16"/>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{item.product.name}</h3>
                <p className="text-sm text-gray-500 mb-1">Ref: {item.product._id}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item._id)}
                    className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  <span className="w-8 text-center font-medium text-gray-900">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item._id)}
                    className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="text-right min-w-[100px]">
                <p className="font-semibold text-gray-900">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

  )
}

export default CartItem