import OrderTable from "@/components/OrderTable";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Placed orders"
}

const page = () => {
  return <OrderTable />;
};

export default page;
