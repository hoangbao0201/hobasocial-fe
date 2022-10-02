import classNames from "classnames/bind";
import styles from "./InfoProfile.module.scss";

import { useState } from "react";
import { iconHideEye, iconShowEye } from "~/.public/icon";
import Footer from "~/components/Layouts/Footer";
import Header from "~/components/Layouts/Header";
import { useParams } from "react-router-dom";
import FormImage from "~/components/Layouts/FormImage";

const cx = classNames.bind(styles);

function InfoProfile() {
    const [showPassword, setShowPassword] = useState(false);
    const [dataValueForm, setDataValueForm] = useState({
        name: "",
        username: "",
        password: "",
        rePassword: "",
    });

    const eventOnchangeValueInput = (e) => {
        setDataValueForm({
            ...dataValueForm,
            [e.target.name]: e.target.value,
        });
    };

    const eventSubmitForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("content")}>
                <div className={cx("container")}>
                    <div className={cx("header-title")}>
                        Thông tin người dùng
                    </div>
                    <div className={cx("grid-form-info")}>
                        <div
                            className={cx("form-upload-avatar", "dev-col-4")}
                        >
                            <FormImage />
                            <div className={cx("form-upload-name")}>Nguyễn Hoàng Bảo</div>
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
                                        "form-group-input"
                                    )}
                                    type="text"
                                    name="name"
                                    value={dataValueForm.name}
                                    onChange={eventOnchangeValueInput}
                                    autoComplete="off"
                                />
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
                                        "form-group-input"
                                    )}
                                    type="text"
                                    name="username"
                                    value={dataValueForm.username}
                                    onChange={eventOnchangeValueInput}
                                    autoComplete="off"
                                />
                            </div>
                            <div className={cx("dev-form-group", "form-group")}>
                                <label
                                    htmlFor="idPassword"
                                    className={cx("dev-title-input")}
                                >
                                    Mật khẩu
                                </label>

                                <input
                                    id="idPassword"
                                    className={cx(
                                        "dev-form-input",
                                        "form-group-input"
                                    )}
                                    type={`${
                                        showPassword ? "text" : "password"
                                    }`}
                                    name="password"
                                    value={dataValueForm.password}
                                    onChange={eventOnchangeValueInput}
                                    autoComplete="off"
                                />
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
                                    htmlFor="idRePassword"
                                    className={cx("dev-title-input")}
                                >
                                    Nhập lại mật khẩu
                                </label>

                                <input
                                    id="idRePassword"
                                    className={cx(
                                        "dev-form-input",
                                        "form-group-input"
                                    )}
                                    type={`${
                                        showPassword ? "text" : "password"
                                    }`}
                                    name="rePassword"
                                    value={dataValueForm.rePassword}
                                    onChange={eventOnchangeValueInput}
                                    autoComplete="off"
                                />
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

export default InfoProfile;
