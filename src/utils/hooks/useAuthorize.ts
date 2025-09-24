import { handleLogout } from "../helpers";
import useStore from "../newStore";

const useAuthorize = (targettedUser: string) => {
    const { currentUser } = useStore();
    
    if(currentUser.role != null && currentUser.role !== targettedUser){
        handleLogout()
    }

    return;

}

export default useAuthorize;