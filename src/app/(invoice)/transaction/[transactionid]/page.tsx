import dynamic from "next/dynamic";
import Invoice from "@/components/Invoice";
import { Metadata } from "next";
import { TransactionPageProps } from "@/libs/types";

export const metadata: Metadata = {
  title: "Order receipt"
}

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer)
);

const page = async ({ params }: TransactionPageProps) => {
  const { transactionid } = await params;
  return (
    <div style={{ height: "95vh" }}>
      <PDFViewer
        className="container mx-auto"
        style={{ width: "100%", height: "100%" }}
      >
        <Invoice id={transactionid} />
      </PDFViewer>
    </div>
  );
};

export default page;
