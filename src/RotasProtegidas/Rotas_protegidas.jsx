import { useContext } from "react"
import { Outlet } from "react-router-dom"
import LoginPage from "../components/LoginPage";
import Main from "../components/Main"
import { AuthContext } from "../contexts/auth";






// const useAuth = () => {
//     const user = { logado: true }
//     return  user && user.logado
// }

const ProtectedRoutes = () => {
    const {authenticated} =  useContext(AuthContext);
    return authenticated ? <Outlet /> : <LoginPage />;
}

export default ProtectedRoutes



// authenticated