import Loading from '@/components/Loading'
import dynamic from 'next/dynamic'

const CustomerOrders = dynamic(() => import('@/components/CustomerOrders'), {
  loading: () => <Loading />
})

export const metadata = {
  title: "My Orders"
}

const page = () => {
  return (
    <CustomerOrders />
  )
}

export default page