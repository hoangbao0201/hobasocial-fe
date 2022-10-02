import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "~/components/Layouts/Spinner";
import { AuthContext } from "~/context/authContext";

function CheckUser({ children }) {
    const navigate = useNavigate();
    const {
        state: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading) {
        return <Spinner modal/>;
    } 
    else {
        if(isAuthenticated) {
            return <>{children}</>
        }
        else {
            window.location = "/auth/login";
            // navigate("/auth/login");
        }
    }
}

export default CheckUser;
