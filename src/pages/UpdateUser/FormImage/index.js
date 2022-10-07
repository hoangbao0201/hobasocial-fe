import classNames from "classnames/bind";
import styles from "./FormImage.module.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext, useEffect, useState } from "react";
import { iconCamera } from "~/.public/icon";
import { AuthContext } from "~/context/authContext";
import Spinner from "~/components/Layouts/Spinner";

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

const cx = classNames.bind(styles);

function FormImage({ user }) {
    const { uploadAvatar } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState(false);
    const [dataImageAvatar, setDataImageAvatar] = useState(null);
    const [urlImage, setUrlImage] = useState(
        user.avatar.url || "/images/avatar-default.png"
    );

    const onchangeDataInput = (e) => {
        const fileImage = e.target.files[0];
        setUrlImage(URL.createObjectURL(fileImage));
        setDataImageAvatar(fileImage);
    };

    const eventSubmitUploadAvatar = async (e) => {
        e.preventDefault();

        if (!!!dataImageAvatar) {
            setWarning(true);
            setTimeout(() => {
                setWarning(false);
            }, 4000);
            return;
        }

        setWarning(false);
        setLoading(true);
        //---

        const image = new FormData();
        image.append("file", dataImageAvatar);

        const dataServer = await uploadAvatar(image);
        if (dataServer.success) {
            setLoading(null);
            showToastify("Upload avatar thành công");
            setTimeout(() => {
                window.location = "/update-profile";
            }, 5000);
        }

        //---
        // setLoading(false);
    };

    return (
        <div className={cx("content-upload-avatar")}>
            <ToastContainer />
            <input
                id="idAvatar"
                type="file"
                style={{ display: "none" }}
                onChange={onchangeDataInput}
            />
            <label htmlFor="idAvatar" className={cx("grid-image")}>
                <img className={cx("avatar")} src={urlImage} alt="avatar" />
                <div className={cx("grid-icon-hover")}>
                    <i className={cx("icon-camera")}>{iconCamera}</i>
                </div>
            </label>
            <div className={cx("dev-form-alert-warning", "form-warning")}>
                {!!warning && "Bạn chưa điền đầy đủ thông tin"}
            </div>
            <div className={cx("dev-form-group", "form-group")}>
                <button
                    className={cx("dev-button-auto", "button-upload-avatar")}
                    onClick={eventSubmitUploadAvatar}
                    disabled={loading}
                >
                    {loading ? <Spinner size="sm" /> : "Upload avatar"}
                </button>
            </div>
            <div className={cx("title-name")}>Nguyễn Hoàng Bảo</div>
        </div>
    );
}

export default FormImage;
