"use client";

import { getReviews, getVendorProducts } from "@/utils/api/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Eye, Star, Package, User, Calendar, DollarSign } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Product, VendorProductCardProps } from "@/libs/types";


const VendorProductCard:React.FC<VendorProductCardProps>= ({ product }) => {
    const Router = useRouter()
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const [reviewCount, setReviewCount] = useState<number>(0);

  useEffect(() => {
    retrieveReviewCount()
  }, [])

  const retrieveReviewCount = async () => {
    const response = (await getReviews(product._id)).data
    setReviewCount(response.count)
  }

  const handleReviewView = () => {
    Router.push(`/product/review/${product._id}`)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">

      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">

        <div className="aspect-square w-full relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
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
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <Package className="w-4 h-4" />
            <span className="text-sm">
              {product.stock} left
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            4.0 ({reviewCount} reviews)
          </span>
        </div>

        <button
        onClick={handleReviewView}
          disabled={reviewCount === 0}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            reviewCount === 0
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
          }`}
        >
          <Eye className="w-5 h-5" />
          <span>
            {'View reviews'}
          </span>
        </button>
      </div>
    </div>
  );
};

const VendorProductCards = () => {
  const [products, setProducts] = useState<Array<Product> | null>(null);

  useEffect(() => {
    retrieveVendorProduct();
  }, []);

  const retrieveVendorProduct = async () => {
    const response = (await getVendorProducts()).data;
    if (response.success) {
        setProducts(response.data)
    } else {
        setProducts([])
      console.log(response.message);
    }
  };

  if (products && products?.length === 0) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
          <Image
            src="/images/no-product.png"
            height={300}
            width={300}
            alt="no product"
          />
      </div>
    );
  } else {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <VendorProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
    );
  }
};

export default VendorProductCards;
