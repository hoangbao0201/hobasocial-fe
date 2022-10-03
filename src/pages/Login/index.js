import classNames from "classnames/bind";
import styles from "./Login.module.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { iconHideEye, iconShowEye } from "~/.public/icon";
import Spinner from "~/components/Layouts/Spinner";
import Header from "~/components/Layouts/Header";
import { AuthContext } from "~/context/authContext";

const cx = classNames.bind(styles);

const checkData = (data) => {
    if (!data.username || !data.password) {
        return {
            success: false,
            warningField: ["username", "password"],
            msg: "Bạn chưa điền đầy đủ thông tin",
        };
    }
    // Check username
    if (data.username.length < 3) {
        return {
            success: false,
            warningField: ["username"],
            msg: "Tài khoản quá ngắn",
        };
    }
    if (data.username.length > 20) {
        return {
            success: false,
            warningField: ["username"],
            msg: "Tài khoản quá dài",
        };
    }
    // Check password
    if (data.password.length < 3) {
        return {
            success: false,
            warningField: ["password"],
            msg: "Mật khẩu quá ngắn",
        };
    }
    if (data.password.length > 20) {
        return {
            success: false,
            warningField: ["password"],
            msg: "Mật khẩu quá dài",
        };
    }

    return {
        success: true,
    };
};

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
    const { loginUser } = useContext(AuthContext);

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
        const dataValid = checkData(dataValueForm);
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
        console.log(dataServer);

        // ---
        setLoading(false);
    };

    return (
        <div className={cx("wrapper")}>
            <ToastContainer />
            {loading && <Spinner modal />}
            <Header />
            <div className={cx("container")}>
                <div className={cx("grid-form")}>
                    <form className={cx("form-login")}>
                        <div className={cx("dev-form-group", "form-group")}>
                            <img
                                className={cx("form-logo")}
                                src="/images/logo.png"
                            />
                        </div>
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
