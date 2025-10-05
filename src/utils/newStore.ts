import { StoreState } from "@/libs/types";
import { create } from "zustand";

const useStore = create<StoreState>((set) => ({
    currentUser: {
        id: null,
        name: null,
        email: null,
        role: null,
        createdAt: null
    },
    setCurrentUser : (id, name, email, role, createdAt) => {
        set(() => ({
            currentUser: {
                id,
                name,
                email,
                role,
                createdAt
            }
        }))
    }
}))

export default useStore;