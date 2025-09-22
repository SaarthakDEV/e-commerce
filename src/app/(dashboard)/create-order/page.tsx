import Checkout from '@/components/Checkout'
import { handleLogout } from '@/utils/helpers';
import useStore from '@/utils/newStore';

const page = () => {
  const { currentUser } = useStore();
  if(currentUser.role !== "customer"){
    handleLogout();
  }
  return (
    <Checkout />
  )
}

export default page