import classNames from "classnames/bind";
import styles from "./FormInformation.module.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { checkDataUpdateUser } from "~/utils/checkValueInput";
import { useContext, useState } from "react";
import { AuthContext } from "~/context/authContext";
import { iconHideEye, iconShowEye } from "~/.public/icon";
import Spinner from "~/components/Layouts/Spinner";

const cx = classNames.bind(styles);

const showToastify = (data) => {
    return toast.success(`${data}!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

function FormInformation() {
    const {
        state: { user },
        updateUser,
    } = useContext(AuthContext);

    const [warning, setWarning] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [dataValueForm, setDataValueForm] = useState({
        name: user.name || "",
        username: user.username || "",
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
        const dataValid = checkDataUpdateUser(dataValueForm);
        if (!dataValid.success) {
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

        if (dataServer.success) {
            showToastify("Update thông tin thành công");
            setInterval(() => {
                window.location.reload();
            }, 5000);
        }
        if (!dataServer.success && !!dataServer.warningField) {
            setWarning({
                warningField: dataServer.warningField,
                msg: dataServer.msg,
            });
            setTimeout(() => {
                setWarning(null);
            }, 5000);
        }

        // ---
        setLoading(false);
    };

    return (
        <>
            
            <form
                className={cx("form-info-user", "dev-col-8")}
                autoComplete="off"
            >
                <ToastContainer />
                {loading && <Spinner modal />}
                <div className={cx("dev-form-group", "form-group")}>
                    <label htmlFor="idName" className={cx("dev-title-input")}>
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
                    <div className={cx("dev-form-alert-warning")}>
                        {!!warning &&
                            warning.warningField.includes("name") &&
                            warning.msg}
                    </div>
                </div>
                {/* username */}
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
                    <div className={cx("dev-form-alert-warning")}>
                        {!!warning &&
                            warning.warningField.includes("username") &&
                            warning.msg}
                    </div>
                </div>
                {/* oldPassword */}
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
                    <div className={cx("dev-form-alert-warning")}>
                        {!!warning &&
                            warning.warningField.includes("oldPassword") &&
                            warning.msg}
                    </div>
                </div>
                {/* newPassword */}
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
                        type={`${showPassword ? "text" : "password"}`}
                        name="newPassword"
                        value={dataValueForm.newPassword}
                        onChange={eventOnchangeValueInput}
                        onFocus={eventFocusInput}
                        autoComplete="off"
                    />
                    <div className={cx("dev-form-alert-warning")}>
                        {!!warning &&
                            warning.warningField.includes("newPassword") &&
                            warning.msg}
                    </div>
                    {!!dataValueForm.password && (
                        <i
                            className={cx("icon-action-password")}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? iconShowEye : iconHideEye}
                        </i>
                    )}
                </div>
                {/* reNewPassword */}
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
                        type={`${showPassword ? "text" : "password"}`}
                        name="reNewPassword"
                        value={dataValueForm.reNewPassword}
                        onChange={eventOnchangeValueInput}
                        onFocus={eventFocusInput}
                        autoComplete="off"
                    />
                    <div className={cx("dev-form-alert-warning")}>
                        {!!warning &&
                            warning.warningField.includes("reNewPassword") &&
                            warning.msg}
                    </div>
                </div>
                {/* button update */}
                <div
                    className={cx("dev-form-group", "form-group", "form-group")}
                >
                    <button
                        className={cx("dev-button-auto", "button-update")}
                        onClick={eventSubmitForm}
                    >
                        Update thông tin
                    </button>
                </div>
            </form>
        </>
    );
}

export default FormInformation;
