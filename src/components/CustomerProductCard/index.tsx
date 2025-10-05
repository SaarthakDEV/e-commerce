import { VendorProductCardProps } from "@/libs/types";
import { getReviews } from "@/utils/api/products";
import { getCategoryIcon, getCategoryLabel, processCreatedAt } from "@/utils/helpers";
import { Package, Star, Eye, Calendar, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CustomerProductCard: React.FC<VendorProductCardProps> = ({ product }) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const [reviewCount, setReviewCount] = useState<number>(0);

  const retrieveReviewCount = async () => {
    try {
      const response = (await getReviews(product?._id))?.data;
      if (response?.success) {
        setReviewCount(response?.count);
      } else {
        throw new Error(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    retrieveReviewCount();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
            <span>{getCategoryIcon(product?.category)}</span>
            <span>{getCategoryLabel(product?.category)}</span>
          </span>
        </div>

        <div className="aspect-square w-full relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={product?.image}
            alt={product?.name}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          <a href={`/product/${product?._id}`}>{product?.name}</a>
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {product?.description}
        </p>

        <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {product?.vendor?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {product?.vendor?.email}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {processCreatedAt(product?.vendor?.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product?.price}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <Package className="w-4 h-4" />
            <span className="text-sm">{product?.stock} left</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5]?.map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= 4
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            4.0 ({reviewCount} reviews)
          </span>
        </div>

        <a
          href={`/product/${product?._id}`}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
              `}
        >
          <Eye className="w-5 h-5" />
          <span>{"View Product"}</span>
        </a>
      </div>
    </div>
  );
};

export default CustomerProductCard;
