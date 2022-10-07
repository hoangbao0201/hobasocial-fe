import classNames from "classnames/bind";
import styles from "./UpdateUser.module.scss";

import { useContext, useState } from "react";
import Footer from "~/components/Layouts/Footer";
import Header from "~/components/Layouts/Header";
import FormImage from "~/pages/UpdateUser/FormImage";
import { AuthContext } from "~/context/authContext";
import FormInformation from "./FormInformation";

const cx = classNames.bind(styles);

function UpdateUser() {
    const {
        state: { authLoading, isAuthenticated , user },
        updateUser,
    } = useContext(AuthContext);

    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("content")}>
                <div className={cx("container")}>
                    <div className={cx("header-title")}>
                        Thông tin người dùng
                    </div>
                    <div className={cx("grid-form-info")}>
                        <div className={cx("form-upload-avatar", "dev-col-4")}>
                            <FormImage user={user}/>
                        </div>
                        <FormInformation />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UpdateUser;
