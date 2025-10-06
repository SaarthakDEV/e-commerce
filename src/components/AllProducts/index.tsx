"use client";
import { useEffect, useState, useRef } from "react";
import StatusFilterDropdown from "../StatusFilterDropdown";
import { product_categories } from "@/libs/constant";
import SearchBox from "../SearchBox";
import { getAllProducts } from "@/utils/api/products";
import Image from "next/image";
import CustomerProductCard from "../CustomerProductCard";
import { Product } from "@/libs/types";
import toast from "react-hot-toast";
import useAuthorize from "@/utils/hooks/useAuthorize";
import Loading from "../Loading";

const AllProducts = () => {
  useAuthorize("customer")
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const retrieveProductData = async () => {
    try{
      const response = (await getAllProducts(selectedStatus)).data;
      if (response?.success) {
        const output = response.data;
        if (!searchText?.trim()) {
        setIsLoading(true)
        setData(output);
      } else {
        const filteredProduct = output?.filter((product: Product) =>
          product?.name?.toLowerCase().includes(searchText)
        );
        setData(filteredProduct);
      }
    } else {
      setData([]);
      throw new Error(response?.message)
    }
  }catch(err: any){
    toast.error(err?.message);
  }finally{
    setIsLoading(false)
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
    retrieveProductData();
  }, [])

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
      {
        data && data?.length === 0 ?
      (
        <div className="min-h-[85vh] flex items-center justify-center">
            <Image
              src="/images/no-product.png"
              height={300}
              width={300}
              alt="no product"
            />
        </div>
      )
      :
     (
      
        <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((product: Product) => (
            <CustomerProductCard key={product?._id} product={product} isLoading={isLoading}/>
          ))}
        </div>
      </div>
    </div>
        )
      }
    </>
  );
};

export default AllProducts;
