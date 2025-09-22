import CustomerOrders from '@/components/CustomerOrders'
import { handleLogout } from '@/utils/helpers';
import useStore from '@/utils/newStore';

const page = () => {
  const { currentUser } = useStore();
  if(currentUser.role !== "customer"){
    handleLogout();
  }
  return (
    <CustomerOrders />
  )
}

export default page