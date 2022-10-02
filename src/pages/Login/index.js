import classNames from "classnames/bind";
import styles from "./Login.module.scss";

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
            msg: "Bạn chưa điền đầy đủ thông tin",
        };
    }
    // Check username
    if (data.username.length < 3) {
        return {
            success: false,
            msg: "Tài khoản quá ngắn",
        };
    }
    if (data.username.length > 20) {
        return {
            success: false,
            msg: "Tài khoản quá dài",
        };
    }
    // Check password
    if (data.password.length < 3) {
        return {
            success: false,
            msg: "Mật khẩu quá ngắn",
        };
    }
    if (data.password.length > 20) {
        return {
            success: false,
            msg: "Mật khẩu quá dài",
        };
    }

    return {
        success: true,
    };
};

function Login() {
    const {
        state: { authLoading, isAuthenticated },
        loginUser,
    } = useContext(AuthContext);

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

    const eventSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        // ---

        const dataValid = checkData(dataValueForm);
        if (!dataValid.success) {
            console.log(dataValid.msg);
            setLoading(false);
            return;
        }

        const dataServer = await loginUser(dataValueForm);
        console.log(dataServer);

        // ---
        setLoading(false);
    };

    let body;
    if (authLoading) {
        body = <Spinner mdoal />;
    } else {
        if (isAuthenticated) {
            window.location = "/";
        } else {
            return (
                <div className={cx("wrapper")}>
                    {loading && <Spinner modal />}

                    <Header />
                    <div className={cx("container")}>
                        <div className={cx("grid-form")}>
                            <form className={cx("form-login")}>
                                <div
                                    className={cx(
                                        "dev-form-group",
                                        "form-group"
                                    )}
                                >
                                    <img
                                        className={cx("form-logo")}
                                        src="/images/logo.png"
                                    />
                                </div>
                                <div
                                    className={cx(
                                        "dev-form-group",
                                        "form-group"
                                    )}
                                >
                                    <input
                                        className={cx("form-group-input")}
                                        type="text"
                                        placeholder="Tài khoản"
                                        alt="username"
                                        value={dataValueForm.username}
                                        name="username"
                                        onChange={eventOnchangeInput}
                                    />
                                </div>
                                <div
                                    className={cx(
                                        "dev-form-group",
                                        "form-group"
                                    )}
                                >
                                    <input
                                        className={cx("form-group-input")}
                                        type={`${
                                            showPassword ? "text" : "password"
                                        }`}
                                        placeholder="Mật khẩu"
                                        alt="password"
                                        value={dataValueForm.password}
                                        name="password"
                                        onChange={eventOnchangeInput}
                                    />
                                    {!!dataValueForm.password && (
                                        <i
                                            className={cx(
                                                "icon-action-password"
                                            )}
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword
                                                ? iconShowEye
                                                : iconHideEye}
                                        </i>
                                    )}
                                </div>
                                <div
                                    className={cx(
                                        "dev-form-group",
                                        "form-group"
                                    )}
                                >
                                    <button
                                        className={cx(
                                            "dev-button-auto",
                                            "button-login"
                                        )}
                                        onClick={eventSubmitForm}
                                    >
                                        {/* {!loading ? "Đăng nhập" : <Spinner size="sm" />} */}
                                        Đăng nhập
                                    </button>
                                </div>
                                <div className={cx("dev-devider")} />
                                <Link
                                    to="/auth/register"
                                    className={cx(
                                        "dev-button-lg",
                                        "button-register"
                                    )}
                                >
                                    Đăng kí
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Login;
