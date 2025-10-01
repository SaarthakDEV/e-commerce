import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';

const ProductForm = dynamic(() => import('@/components/ProductForm'), {
  loading: () => <Loading />
})

export const metadata = {
  title: "Add new product"
}

export default function Page() {

  return (
    <ProductForm />
  )
}