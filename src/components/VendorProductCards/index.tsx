"use client";
import { getReviews, getVendorProducts } from "@/utils/api/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye, Star, Package, Trash, Pencil } from "lucide-react";
import { Product, VendorProductCardProps } from "@/libs/types";
import Modal from "../Modal";
import UpdateProduct from "../UpdateProduct";
import toast from "react-hot-toast";
import useAuthorize from "@/utils/hooks/useAuthorize";
import Loading from "../Loading";

const VendorProductCard: React.FC<VendorProductCardProps> = ({ product }) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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
    <>
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Update Product"
      >
        <UpdateProduct product={product} />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Action"
      >
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Are you sure you want to Delete this product?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded-lg">
            Confirm
          </button>
        </div>
      </Modal>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
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
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-3 bg-black/20 flex items-center justify-center">
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110 shadow-lg"
              >
                <Pencil className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg bg-red-500 text-white}`}
              >
                <Trash className={`w-5 h-5 text-white`} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
            {product?.name}
          </h3>
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
            {[1, 2, 3, 4, 5].map((star) => (
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
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl`}
          >
            <Eye className="w-5 h-5" />
            <span>{"View Product"}</span>
          </a>
        </div>
      </div>
    </>
  );
};

const VendorProductCards = () => {
  useAuthorize("vendor");
  const [products, setProducts] = useState<Array<Product> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const retrieveVendorProduct = async () => {
    setIsLoading(true);
    try {
      const response = (await getVendorProducts())?.data;
      if (response?.success) {
        setProducts(response?.data);
      } else {
        setProducts([]);
        throw new Error(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    retrieveVendorProduct();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
              <VendorProductCard key={product?._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default VendorProductCards;
