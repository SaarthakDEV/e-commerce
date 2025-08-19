"use client";

import { getReviews, getVendorProducts } from "@/utils/api/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Eye, Star, Package, User, Calendar, DollarSign } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Product, ProductCardProps } from "@/libs/types";


const ProductCard:React.FC<ProductCardProps>= ({ product }) => {
    const Router = useRouter()
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const [reviewCount, setReviewCount] = useState<number>(0);

  useEffect(() => {
    retrieveReviewCount()
  }, [])
  useEffect(() => {
  }, [reviewCount])

  const retrieveReviewCount = async () => {
    const response = (await getReviews(product._id)).data
    setReviewCount(response.count)
  }

  const handleReviewView = () => {
    Router.push(`/product/review/${product._id}`)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
        {/* Category Badge */}
        {/* <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
            <span>{getCategoryIcon(product.category)}</span>
            <span>{getCategoryLabel(product.category)}</span>
          </span>
        </div> */}

        {/* Product Image */}
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

      {/* Product Information */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        {/* <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p> */}

        {/* Vendor Info */}
        {/* <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {product.vendor.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {product.vendor.email}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(product.vendor.createdAt)}
            </span>
          </div>
        </div> */}

        {/* Price and Stock */}
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

        {/* Rating (placeholder since not in data) */}
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

        {/* Action Button */}
        <button
        onClick={handleReviewView}
        //   href={`/product/review/${product._id}`}
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

const ProductCards = () => {
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
        {/* Header */}
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Featured Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our curated collection of amazing products
          </p>
          <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center space-x-1">
              <Package className="w-4 h-4" />
              <span>{products.length} Products</span>
            </span>
            <span className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{new Set(products.map(p => p.vendor._id)).size} Vendors</span>
            </span>
          </div>
        </div> */}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Empty State (if no products) */}
        {/* {products.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for new products or adjust your filters.
            </p>
          </div>
        )} */}
      </div>
    </div>
    );
  }
};

export default ProductCards;
