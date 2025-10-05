"use client";
import { Product, ProductInfoProps } from "@/libs/types";
import { getProductDetail, getReviews } from "@/utils/api/products";
import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  Store,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  checkProductInCart,
  postProductToCart,
  updateCartItem,
} from "@/utils/api/cart";
import Reviews from "../Reviews";
import useStore from "@/utils/newStore";
import Loading from "../Loading";
import { getStockStatus } from "@/utils/helpers";

const ProductInfo: React.FC<ProductInfoProps> = ({ productId }) => {
  const { currentUser } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isPresent, setIsPresent] = useState(false);
  const [update, setUpdate] = useState(true);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewUpdate, setReviewUpdate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false)

  const retrieveProductInfo = async () => {
    setIsLoading(true);
    try {
      const response = (await getProductDetail(productId))?.data;
      if (response?.success) {
        setProduct(response?.data);
      } else {
        throw new Error(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }finally{
      setIsLoading(false)
    }
  };

  const retrieveCartExistence = async () => {
    setIsLoading(true)
    try {
      const response = (await checkProductInCart(productId))?.data;
      if (response?.success) {
        setIsPresent(response?.data ? true : false);
        setQuantity(response?.data);
      } else {
        throw new Error(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }finally{
      setIsLoading(false)
    }
  };

  const retrieveReviewCount = async () => {
    setIsLoading(true);
    try {
      const response = (await getReviews(productId))?.data;
      if (response?.success) {
        setReviews(response?.data);
        setReviewCount(response?.count);
      } else {
        throw new Error(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }finally{
      setIsLoading(false)
    }
  };

  const handleQuantityChange = async (action: string) => {
    try {
      if (action === "inc") {
        setQuantity((prevQuantity) => prevQuantity + 1);
      } else {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
      const response = (await updateCartItem(productId, action))?.data;
      if (!response.success) {
        throw new Error();
      }
    } catch (err: any) {
      toast.error("Error updating quantity");
    } finally {
      setUpdate(!update);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const response = (await postProductToCart(product?._id!))?.data;
      if (response?.success) {
        setUpdate((prev) => !prev);
        toast.success("Product added to cart");
      } else {
        throw new Error(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const stockStatus = getStockStatus(product!);

  useEffect(() => {
    retrieveProductInfo();
    retrieveCartExistence();
  }, [update]);

  useEffect(() => {
    retrieveReviewCount();
  }, [reviewUpdate]);

  if(isLoading){
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="p-8">
              {/* Main Image */}
              <div className="relative mb-4">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-96 object-cover rounded-xl bg-gray-100"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8">
              {/* Category & Stock Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {product?.category}
                </span>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${stockStatus?.bgColor} ${stockStatus?.color}`}
                >
                  {stockStatus?.text}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product?.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  (4.8) • {reviewCount} reviews
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product?.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${((Number(product?.price) || 0) * 1.5)?.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded-full">
                    50% OFF
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product?.description}
                </p>
              </div>

              {/* Vendor Information */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Store className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {product?.vendor?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {product?.vendor?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              {isPresent && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Quantity
                  </h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange("dec")}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="text-xl font-semibold text-gray-900 w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("inc")}
                      disabled={quantity >= (product?.stock ?? 0)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {currentUser?.role === "customer" ? (
                <div className="space-y-4 mb-8">
                  <button
                    onClick={handleAddToCart}
                    disabled={
                      product?.stock === 0 || isAddingToCart || isPresent
                    }
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    {isPresent ? (
                      <span>Product is already present in cart</span>
                    ) : isAddingToCart ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Adding to Cart...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <></>
              )}

              {/* Features */}
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      30-Day Returns
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-600">
                      2-Year Warranty
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Reviews
            reviewNumber={reviewCount}
            reviews={reviews}
            productId={productId}
            setReviewUpdate={setReviewUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
