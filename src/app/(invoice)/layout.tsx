"use client"
import useStore from "@/utils/newStore";
import { notFound } from "next/navigation";
import React, { PropsWithChildren } from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useStore();
  if(currentUser.role !== "customer"){
    notFound();
  }
  return (
    <html>
      <body className="m-0">{children}</body>
    </html>
  );
};

export default layout;
