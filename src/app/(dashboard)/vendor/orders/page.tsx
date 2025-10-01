import Loading from "@/components/Loading";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const OrderTable = dynamic(() => import("@/components/OrderTable"), {
  loading: () => <Loading />
})

export const metadata:Metadata = {
  title: "Placed orders"
}

const page = () => {
  return <OrderTable />;
};

export default page;
