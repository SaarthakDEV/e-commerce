import Loading from '@/components/Loading'
import dynamic from 'next/dynamic'

const Checkout = dynamic(() => import("@/components/Checkout"), {
  loading: () => <Loading />
})

export const metadata = {
  title: "Order info"
}

const page = () => {
  return (
    <Checkout />
  )
}

export default page