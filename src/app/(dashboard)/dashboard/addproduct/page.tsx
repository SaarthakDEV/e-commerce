"use client"
import useStore from '@/utils/newStore';
import { handleLogout } from '@/utils/helpers';
import ProductForm from '@/components/ProductForm';

export default function Page() {
  const { currentUser } = useStore()
  if(currentUser.role === "customer"){
    handleLogout()
  }

  return (
    <ProductForm />
  )
}