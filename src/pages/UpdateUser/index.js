import classNames from "classnames/bind";
import styles from "./UpdateUser.module.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext, useState } from "react";
import { iconHideEye, iconShowEye } from "~/.public/icon";
import Footer from "~/components/Layouts/Footer";
import Header from "~/components/Layouts/Header";
import FormImage from "~/components/Layouts/FormImage";
import { AuthContext } from "~/context/authContext";
import Spinner from "~/components/Layouts/Spinner";

const cx = classNames.bind(styles);

const checkData = (data) => {
    if (!data.name && !data.username && !data.password) {
        return {
            success: false,
            msg: "Bạn chưa sữa đỗi thông tin nào",
        };
    }
    // Check name
    if (data.name.length < 3) {
        return {
            success: false,
            warningField: ["name"],
            msg: "Tên quá ngắn",
        };
    }
    if (data.name.length > 20) {
        return {
            success: false,
            warningField: ["name"],
            msg: "Tên quá dài",
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
    if (data.newPassword.length < 3) {
        return {
            success: false,
            warningField: ["newPassword"],
            msg: "Mật khẩu mới quá ngắn",
        };
    }
    if (data.newPassword.length > 20) {
        return {
            success: false,
            warningField: ["newPassword"],
            msg: "Mật khẩu mới quá dài",
        };
    }
    if (data.newPassword !== data.reNewPassword) {
        return {
            success: false,
            warningField: ["newPassword", "reNewPassword"],
            msg: "Mật khẩu mới không giống nhau",
        };
    }
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

function UpdateUser() {
    const { updateUser } = useContext(AuthContext);

    const [warning, setWarning] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [dataValueForm, setDataValueForm] = useState({
        name: "",
        username: "",
        oldPassword: "",
        newPassword: "",
        reNewPassword: "",
    });

    const eventOnchangeValueInput = (e) => {
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

        // Check Data
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

        const dataServer = await updateUser({
            name: dataValueForm.name,
            username: dataValueForm.username,
            password: dataValueForm.oldPassword,
            newPassword: dataValueForm.newPassword,
        });

        console.log(dataServer);

        // ---
        setLoading(false);
    };

    return (
        <div className={cx("wrapper")}>
            <ToastContainer />

            {loading && <Spinner modal />}
            <Header />
            <div className={cx("content")}>
                <div className={cx("container")}>
                    <div className={cx("header-title")}>
                        Thông tin người dùng
                    </div>
                    <div className={cx("grid-form-info")}>
                        <div className={cx("form-upload-avatar", "dev-col-4")}>
                            <FormImage />
                            <div className={cx("form-upload-name")}>
                                Nguyễn Hoàng Bảo
                            </div>
                        </div>
                        <form
                            className={cx("form-info-user", "dev-col-8")}
                            autoComplete="off"
                        >
                            <div className={cx("dev-form-group", "form-group")}>
                                <label
                                    htmlFor="idName"
                                    className={cx("dev-title-input")}
                                >
                                    Họ và tên
                                </label>
                                <input
                                    id="idName"
                                    className={cx(
                                        "dev-form-input",
                                        "form-group-input",
                                        `${
                                            !!warning
                                                ? warning.warningField.includes("name")
                                                    ? "dev-input-warning"
                                                    : ""
                                                : ""
                                        }`
                                    )}
                                    type="text"
                                    name="name"
                                    value={dataValueForm.name}
                                    onChange={eventOnchangeValueInput}
                                    onFocus={eventFocusInput}
                                    autoComplete="off"
                                />
                                <div className={cx("dev-form-alert-warning")}>{!!warning && warning.warningField.includes("name") && warning.msg}</div>
                            </div>
                            <div className={cx("dev-form-group", "form-group")}>
                                <label
                                    htmlFor="idUsername"
                                    className={cx("dev-title-input")}
                                >
                                    Tài khoản
                                </label>

                                <input
                                    id="idUsername"
                                    className={cx(
                                        "dev-form-input",
                                        "form-group-input",
                                        `${
                                            !!warning
                                                ? warning.warningField.includes("username")
                                                    ? "dev-input-warning"
                                                    : ""
                                                : ""
                                        }`
                                    )}
                                    type="text"
                                    name="username"
                                    value={dataValueForm.username}
                                    onChange={eventOnchangeValueInput}
                                    onFocus={eventFocusInput}
                                    autoComplete="off"
                                />
                                <div className={cx("dev-form-alert-warning")}>{!!warning && warning.warningField.includes("username") && warning.msg}</div>
                            </div>
                            <div className={cx("dev-form-group", "form-group")}>
                                <label
                                    htmlFor="idOldPassword"
                                    className={cx("dev-title-input")}
                                >
                                    Mật khẩu cũ
                                </label>

                                <input
                                    id="idOldPassword"
                                    className={cx(
                                        "dev-form-input",
                                        "form-group-input",
                                        `${
                                            !!warning
                                                ? warning.warningField.includes(
                                                      "oldPassword"
                                                  )
                                                    ? "dev-input-warning"
                                                    : ""
                                                : ""
                                        }`
                                    )}
                                    type="password"
                                    name="oldPassword"
                                    value={dataValueForm.oldPassword}
                                    onChange={eventOnchangeValueInput}
                                    onFocus={eventFocusInput}
                                    autoComplete="off"
                                />
                                <div className={cx("dev-form-alert-warning")}>{!!warning && warning.warningField.includes("password") && warning.msg}</div>
                            </div>
                            <div className={cx("dev-form-group", "form-group")}>
                                <label
                                    htmlFor="idNewPassword"
                                    className={cx("dev-title-input")}
                                >
                                    Mật khẩu mới
                                </label>

                                <input
                                    id="idNewPassword"
                                    className={cx(
                                        "dev-form-input",
                                        "form-group-input",
                                        `${
                                            !!warning
                                                ? warning.warningField.includes(
                                                      "newPassword"
                                                  )
                                                    ? "dev-input-warning"
                                                    : ""
                                                : ""
                                        }`
                                    )}
                                    type={`${
                                        showPassword ? "text" : "password"
                                    }`}
                                    name="newPassword"
                                    value={dataValueForm.newPassword}
                                    onChange={eventOnchangeValueInput}
                                    onFocus={eventFocusInput}
                                    autoComplete="off"
                                />
                                <div className={cx("dev-form-alert-warning")}>{!!warning && warning.warningField.includes("newPassword") && warning.msg}</div>
                                {!!dataValueForm.password && (
                                    <i
                                        className={cx("icon-action-password")}
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
                            <div className={cx("dev-form-group", "form-group")}>
                                <label
                                    htmlFor="idReNewPassword"
                                    className={cx("dev-title-input")}
                                >
                                    Nhập lại mật khẩu
                                </label>

                                <input
                                    id="idReNewPassword"
                                    className={cx(
                                        "dev-form-input",
                                        "form-group-input",
                                        `${
                                            !!warning
                                                ? warning.warningField.includes(
                                                      "reNewPassword"
                                                  )
                                                    ? "dev-input-warning"
                                                    : ""
                                                : ""
                                        }`
                                    )}
                                    type={`${
                                        showPassword ? "text" : "password"
                                    }`}
                                    name="reNewPassword"
                                    value={dataValueForm.reNewPassword}
                                    onChange={eventOnchangeValueInput}
                                    onFocus={eventFocusInput}
                                    autoComplete="off"
                                />
                                <div className={cx("dev-form-alert-warning")}>{!!warning && warning.warningField.includes("reNewPassword") && warning.msg}</div>
                            </div>
                            <div
                                className={cx(
                                    "dev-form-group",
                                    "form-group",
                                    "form-group"
                                )}
                            >
                                <button
                                    className={cx(
                                        "dev-button-auto",
                                        "button-update"
                                    )}
                                    onClick={eventSubmitForm}
                                >
                                    Update thông tin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UpdateUser;
