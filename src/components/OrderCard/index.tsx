import { OrderCardProps } from "@/libs/types";
import { getStatusColor } from "@/utils/helpers";
import { MapPin } from "lucide-react";
import React from "react";

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-100">
      
      {/* Order Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">Order ID</div>
          <div className="text-lg font-semibold text-gray-900">
            ...{order?.id?.substring(15)}
          </div>
        </div>
        <div className="flex gap-4 text-right">
          <div className="text-sm text-gray-500 mb-1">Arrival {order?.date}</div>
          <span
            className={`capitalize inline-flex px-2 font-medium rounded-full ${getStatusColor(
              order?.status
            )}`}
          >
            {order?.status}
          </span>
        </div>
      </div>

      {/* Location Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          Kartly Warehouse
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          {order?.shippingAddress?.substring(0, 20)}...
        </div>
      </div>

      {/* Product Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <img
            src={order?.productImage}
            alt={order?.productName}
            className="w-16 h-16 text-gray-400"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {order?.productName}
          </h3>
          <p className="text-sm text-gray-600">Price ${order?.productPrice}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-600">{order?.quantity} Items</span>
        {/* <button className="text-sm text-primary hover:text-primary/80 font-medium">
          Details
        </button> */}
      </div>
    </div>
  );
};

export default OrderCard;
