import { useContext } from "react";
import Spinner from "~/components/Layouts/Spinner";
import { AuthContext } from "~/context/authContext";

import styles from "./checkUser.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function CheckUser({ children }) {
    const {
        state: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading) {
        return (
            <div className={cx("form-msg-loading")}>
                <img className={cx("logo")} src="/images/logo.png" />
                <div className={cx("loading")}>
                    <Spinner size="sm" />
                </div>
            </div>
        );
    } else {
        if (isAuthenticated) {
            return <>{children}</>;
        } else {
            window.location = "/auth/login";
        }
    }
}

export default CheckUser;
