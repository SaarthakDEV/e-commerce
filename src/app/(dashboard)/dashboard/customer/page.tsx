import AllProducts from '@/components/AllProducts'
import { handleLogout } from '@/utils/helpers';
import useStore from '@/utils/newStore';

const page = () => {
  const { currentUser } = useStore();
  if(currentUser.role !== "customer"){
    handleLogout();
  }
  return (
    <AllProducts />
  )
}

export default page