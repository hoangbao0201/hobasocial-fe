import classNames from "classnames/bind";
import styles from "./Login.module.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { iconHideEye, iconShowEye } from "~/.public/icon";
import Spinner from "~/components/Layouts/Spinner";
import Header from "~/components/Layouts/Header";
import { AuthContext } from "~/context/authContext";
import { checkDataLogin } from "~/utils/checkValueInput";

const cx = classNames.bind(styles);

const showToastify = (data) => {
    return toast.warn(`${data}!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

function Login() {
    const {state: { authLoading, isAuthenticated }, loginUser } = useContext(AuthContext);

    const [warning, setWarning] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [dataValueForm, setDataValueForm] = useState({
        username: "",
        password: "",
    });

    const eventOnchangeInput = (e) => {
        setDataValueForm({
            ...dataValueForm,
            [e.target.name]: e.target.value,
        });
    };

    const eventFocusInput = () => {
        setWarning(null);
        toast.dismiss();
    };

    const eventSubmitForm = async (e) => {
        e.preventDefault();
        const dataValid = checkDataLogin(dataValueForm);
        if (!dataValid.success) {
            showToastify(dataValid.msg);
            setWarning(dataValid);
            setTimeout(() => {
                setWarning(null);
            }, 5000);
            return;
        }
        setLoading(true);
        // ---

        const dataServer = await loginUser(dataValueForm);
        if(!dataServer.success) {
            setWarning({
                success: false,
                warningField: ["username"],
                msg: dataServer.msg,
            })
            setTimeout(() => {
                setWarning(null);
            }, 5000);
        }

        // ---
        setLoading(false);
    };

    if(authLoading) {
        return ;
    }
    else {
        if(isAuthenticated) {
            return <Navigate to="/"/>
        }
    }

    

    return (
        <div className={cx("wrapper")}>
            <ToastContainer />
            {loading && <Spinner modal />}
            <Header />
            <div className={cx("container")}>
                <div className={cx("grid-form")}>
                    <form className={cx("form-login")}>
                        {/* Logo */}
                        <div className={cx("dev-form-group", "form-group", "form-group-logo")}>
                            <img
                                className={cx("form-logo")}
                                src="/images/logo.png"
                            />
                        </div>
                        {/* name */}
                        <div className={cx("dev-form-group", "form-group")}>
                            <input
                                className={cx(
                                    "form-group-input",
                                    `${
                                        !!warning
                                            ? warning.warningField.includes(
                                                  "username"
                                              )
                                                ? "dev-input-warning"
                                                : ""
                                            : ""
                                    }`
                                )}
                                type="text"
                                placeholder="Tài khoản"
                                alt="username"
                                value={dataValueForm.username}
                                name="username"
                                onChange={eventOnchangeInput}
                                onFocus={eventFocusInput}
                            />
                            <div className={cx("dev-form-alert-warning")}>
                                {!!warning &&
                                    warning.warningField.includes("username") &&
                                    warning.msg}
                            </div>
                        </div>
                        {/* password */}
                        <div className={cx("dev-form-group", "form-group")}>
                            <input
                                className={cx(
                                    "form-group-input",
                                    `${
                                        !!warning
                                            ? warning.warningField.includes(
                                                  "password"
                                              )
                                                ? "dev-input-warning"
                                                : ""
                                            : ""
                                    }`
                                )}
                                type={`${showPassword ? "text" : "password"}`}
                                placeholder="Mật khẩu"
                                alt="password"
                                value={dataValueForm.password}
                                name="password"
                                onChange={eventOnchangeInput}
                                onFocus={eventFocusInput}
                            />
                            <div className={cx("dev-form-alert-warning")}>
                                {!!warning &&
                                    warning.warningField.includes("password") &&
                                    warning.msg}
                            </div>
                            {!!dataValueForm.password && (
                                <i
                                    className={cx("icon-action-password")}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? iconShowEye : iconHideEye}
                                </i>
                            )}
                        </div>
                        {/* button login */}
                        <div className={cx("dev-form-group", "form-group")}>
                            <button
                                className={cx(
                                    "dev-button-auto",
                                    "button-login"
                                )}
                                onClick={eventSubmitForm}
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div className={cx("dev-devider")} />
                        {/* next page home */}
                        <Link
                            to="/auth/register"
                            className={cx("dev-button-lg", "button-register")}
                        >
                            Đăng kí
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
