import { useContext } from "react"
import { Outlet } from "react-router-dom"
import Login from "../components/Login"
import Main from "../components/Main"
import { AuthContext } from "../contexts/auth";






// const useAuth = () => {
//     const user = { logado: true }
//     return  user && user.logado
// }

const ProtectedRoutes = () => {
    const {authenticated} =  useContext(AuthContext);
    return authenticated ? <Outlet /> : <Login />;
}

export default ProtectedRoutes



// authenticated