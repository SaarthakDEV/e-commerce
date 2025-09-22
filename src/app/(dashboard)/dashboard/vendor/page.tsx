import VendorProductCards from "@/components/VendorProductCards"
import { handleLogout, isCustomer } from "@/utils/helpers";
import useStore from "@/utils/newStore";

const page = () => {
  // const { currentUser } = useStore();
  // if(currentUser.role === "customer"){
  //   handleLogout();
  // }
  const user = isCustomer();
  console.log("verdict" , isCustomer)
  if(user){
    handleLogout()
  }
  return (
  <VendorProductCards />
  )
}

export default page