import { create } from "zustand";

const useStore = create((set) => ({
    currentUser: {
        id: null,
        name: null,
        email: null,
        role: null,
        createdAt: null
    },
    setCurrentUser : (id: string, name: string, email: string, role: string, createdAt: string) => {
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