import ProductInfo from "@/components/ProductInfo"


const page = async ({ params }: { params : { product_id : string}}) => {
    const { product_id } = await params
  return (
    <ProductInfo productId={product_id} />
  )
}

export default page