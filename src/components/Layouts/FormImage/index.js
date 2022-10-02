import classNames from "classnames/bind";
import { useState } from "react";
import { iconCamera } from "~/.public/icon";
import styles from "./FormImage.module.scss";

const cx = classNames.bind(styles);

function FormImage() {
    const [urlImage, setUrlImage] = useState("/images/image-post.png");

    const onchangeDataInput = (e) => {
        const fileImage = e.target.files[0];
        setUrlImage(URL.createObjectURL(fileImage));
        // setValueInput(URL.createObjectURL(fileImage));
    };

    return (
        <div className={cx("content-upload-avatar")}>
            <input
                id="idAvatar"
                type="file"
                style={{ display: "none" }}
                onChange={onchangeDataInput}
            />
            <label htmlFor="idAvatar" className={cx("grid-image")}>
                <img className={cx("avatar")} src={urlImage} />
                <div className={cx("grid-icon-hover")}>
                    <i className={cx("icon-camera")}>{iconCamera}</i>
                </div>
            </label>
        </div>
    );
}

export default FormImage;
