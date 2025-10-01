import Loading from "@/components/Loading"
import dynamic from "next/dynamic"

const VendorProductCards = dynamic(() => import("@/components/VendorProductCards"), {
  loading: () => <Loading />
})

export const metadata = {
  title: "Products list"
}

const page = () => {
  return (
  <VendorProductCards />
  )
}

export default page