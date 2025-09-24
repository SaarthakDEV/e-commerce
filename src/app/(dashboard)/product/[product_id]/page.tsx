import ProductInfo from "@/components/ProductInfo";

export const generateMetadata = async ({ params }: { params: { product_id: string } }) => {
   const product_id = (params).product_id;
  return {
    title: product_id
  }
}

const page = async ({ params }: { params: { product_id: string } }) => {
  const product_id = (await params).product_id;
  return <ProductInfo productId={product_id}/>;
};

export default page;
