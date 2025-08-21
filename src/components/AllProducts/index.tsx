"use client";
import { useEffect, useState, useRef } from "react";
import StatusFilterDropdown from "../StatusFilterDropdown";
import { categories, product_categories } from "@/libs/constant";
import SearchBox from "../SearchBox";
import { getAllProducts } from "@/utils/api/products";
import Image from "next/image";
import CustomerProductCard from "../CustomerProductCard";

const AllProducts = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [data, setData] = useState([]);

  const retrieveProductData = async () => {
    const response = (await getAllProducts(selectedStatus)).data;
    if (response.success) {
      const output = response.data;
      if (!searchText.trim()) {
        setData(output);
      } else {
        const filteredProduct = output.filter((product) =>
          product.name.toLowerCase().includes(searchText)
        );
        setData(filteredProduct);
      }
    } else {
      setData([]);
      console.log(response.message);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      retrieveProductData();
    }, 1000);
  }, [searchText, selectedStatus]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data && data?.length === 0) {
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
    <>
      <div className="flex justify-between w-full">
        <StatusFilterDropdown
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          statusOptions={product_categories}
        />
        <SearchBox searchText={searchText} setSearchText={setSearchText} />
      </div>
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
          {data?.map((product) => (
            <CustomerProductCard key={product._id} product={product} />
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
    </>
  );
};
}

export default AllProducts;
