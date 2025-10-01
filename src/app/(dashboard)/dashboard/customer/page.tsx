import Loading from '@/components/Loading'
import dynamic from 'next/dynamic'

const AllProducts = dynamic(() => import('@/components/AllProducts'), {
  loading: () => <Loading />
})

export const metadata = {
  title: "Products list"
}

const page = () => {
  return (
    <>
    <AllProducts />
    </>
  )
}

export default page