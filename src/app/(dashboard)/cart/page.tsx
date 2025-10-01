import Loading from "@/components/Loading"
import dynamic from "next/dynamic"

const  Cart = dynamic(() => import('@/components/Cart'), {
  loading: () => <Loading />
})

export const metadata = {
  title: "Cart items"
}

const page = () => {

  return (
    <Cart />
  )
}

export default page