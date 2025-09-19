"use client"
import React from 'react'
import dynamic from "next/dynamic";
import Invoice from '@/components/Invoice';

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then(mod => mod.PDFViewer),
  { ssr: false }
);

const page = async ({ params }: { params : { transactionid : string }}) => {
  const { transactionid } = await params;
  return (
     <div style={{ height: '95vh' }}>
              <PDFViewer className="container mx-auto" style={{ width: '100%', height: '100%' }}>
                <Invoice id={transactionid}/>
              </PDFViewer>
            </div>
  )
}

export default page