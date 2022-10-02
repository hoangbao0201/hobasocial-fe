import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iconHideEye, iconShowEye } from "~/.public/icon";
import Header from "~/components/Layouts/Header";
import Spinner from "~/components/Layouts/Spinner";
import { AuthContext } from "~/context/authContext";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

const checkData = (data) => {
    if (!data.name || !data.username || !data.password) {
        return {
            success: false,
            msg: "Bạn chưa điền đầy đủ thông tin",
        };
    }
    // Check name
    if (data.username.length < 3) {
        return {
            success: false,
            msg: "Tên quá ngắn",
        };
    }
    if (data.username.length > 20) {
        return {
            success: false,
            msg: "Tên quá dài",
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
    if (data.password !== data.rePassword) {
        return {
            success: false,
            msg: "Mật khẩu không giống nhau",
        };
    }

    return {
        success: true,
    };
};

function Register() {
    const navigate = useNavigate();
    const {
        state: { authLoading },
        registerUser,
    } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [dataValueForm, setDataValueForm] = useState({
        name: "",
        username: "",
        password: "",
        rePassword: "",
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

        const dataServer = await registerUser(dataValueForm);
        console.log(dataServer)

        if(dataServer.success) {
            navigate("/auth/login");
        }

        // ---
        setLoading(false);
    };

    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("grid-form")}>
                    <form className={cx("form-register")}>
                        <div className={cx("dev-form-group", "form-group")}>
                            <img
                                className={cx("form-logo")}
                                src="/images/logo.png"
                            />
                        </div>
                        <div className={cx("dev-form-group", "form-group")}>
                            <input
                                className={cx("form-group-input")}
                                type="text"
                                placeholder="Họ và tên"
                                alt="name"
                                value={dataValueForm.name}
                                name="name"
                                onChange={eventOnchangeInput}
                            />
                        </div>
                        <div className={cx("dev-form-group", "form-group")}>
                            <input
                                className={cx("form-group-input")}
                                type="text"
                                placeholder="Tài khoản"
                                alt="username"
                                value={dataValueForm.username}
                                name="username"
                                onChange={eventOnchangeInput}
                                maxLength={10}
                            />
                        </div>
                        <div className={cx("dev-form-group", "form-group")}>
                            <input
                                className={cx("form-group-input")}
                                type={`${showPassword ? "text" : "password"}`}
                                placeholder="Mật khẩu"
                                alt="password"
                                value={dataValueForm.password}
                                name="password"
                                onChange={eventOnchangeInput}
                            />
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
                            <input
                                className={cx("form-group-input")}
                                type={`${showPassword ? "text" : "password"}`}
                                placeholder="Nhập lại mật khẩu"
                                alt="password"
                                value={dataValueForm.rePassword}
                                name="rePassword"
                                onChange={eventOnchangeInput}
                            />
                        </div>
                        <div className={cx("dev-form-group", "form-group")}>
                            <button
                                className={cx(
                                    "dev-button-auto",
                                    "button-register"
                                )}
                                onClick={eventSubmitForm}
                            >
                                Đăng kí
                            </button>
                        </div>
                        <div className={cx("dev-devider")} />
                        <Link
                            to="/auth/login"
                            className={cx("dev-button-lg", "button-login")}
                        >
                            Đăng nhập
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
