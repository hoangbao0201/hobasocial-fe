import { useContext } from "react";
import Spinner from "~/components/Layouts/Spinner";
import { AuthContext } from "~/context/authContext";

function CheckUser({ children }) {
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
        }
    }
}

export default CheckUser;
