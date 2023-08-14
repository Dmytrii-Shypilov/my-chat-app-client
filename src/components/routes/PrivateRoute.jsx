import { useSelector } from "react-redux";
import { getUser } from "../../redux/user/user-selector";
import { Navigate } from "react-router-dom";



export const PrivateRoute = ({children}) => {
    const {token} = useSelector(getUser)
    return <>{token ? children : <Navigate to="/"/> }</>
}