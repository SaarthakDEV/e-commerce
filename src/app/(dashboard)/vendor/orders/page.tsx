import OrderTable from "@/components/OrderTable";
import { handleLogout } from "@/utils/helpers";
import useStore from "@/utils/newStore";

const page = () => {
  const { currentUser } = useStore();
  if(currentUser.role === "customer"){
    handleLogout();
  }
  return <OrderTable />;
};

export default page;
