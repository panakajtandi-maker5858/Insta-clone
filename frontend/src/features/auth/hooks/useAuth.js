// Hook layer manages Api layer and State layer , ( ye api ko call krne ka kaam krti hain aur storage means state layer me state change krne ka kaam krti hain )

import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register , getMe} from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async (username, password) => {
        setLoading(true)
        const response = await login(username, password)
        console.log("response" , response)
        setUser(response.user)
        setLoading(false)
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true)
        const response = await register(username, email, password)
        setUser(response.user)
        setLoading(false)
    }

    return { user, loading, handleLogin, handleRegister }
}