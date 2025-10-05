import Loading from "@/components/Loading";
import dynamic from "next/dynamic";

const ProductInfo = dynamic(() => import("@/components/ProductInfo"), {
  loading: () => <Loading />,
});

interface ProductPageProps {
  params: Promise<{
    product_id: string;
  }>;
}

export const metadata = {
    title: "Product page"
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product_id = (await params)?.product_id;
  return <ProductInfo productId={product_id} />;
}
