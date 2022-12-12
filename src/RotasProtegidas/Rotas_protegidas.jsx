import { Outlet } from "react-router-dom"
import Login from "../components/Login"
import Main from "../components/Main"



const useAuth = () => {
    const user = { logado: true }
    return  user && user.logado
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Login />;
}

export default ProtectedRoutes