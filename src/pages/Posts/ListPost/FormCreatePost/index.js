import classNames from "classnames/bind";
import styles from "./FormCreatePost.module.scss";
import "./customize-react-quill.css"

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import Avatar from "~/components/Layouts/Avatar";
import { iconClose, iconFileImage } from "~/.public/icon";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function FormCreatePost({ user, actionQuit }) {
    const inputRef = useRef();
    const [urlImage, setUrlImage] = useState(null);
    const [textValue, setTextValue] = useState("");

    const eventOnchangeImagePost = (e) => {
        const fileImage = e.target.files[0];

        setUrlImage(URL.createObjectURL(fileImage));
    };

    const eventSubmitCreatePost = async () => {
        console.log(textValue);
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div className={cx("grid-header")}>
                    <span className={cx("title")}>Tạo bài viết</span>
                    <i
                        className={cx("icon-close")}
                        onClick={() => actionQuit(false)}
                    >
                        {iconClose}
                    </i>
                </div>
                <div className={cx("dev-devider")}></div>
                <div className={cx("grid-info")}>
                    <Avatar image={user.avatar.url} />
                    <div className={cx("name-user")}>{user.name}</div>
                </div>
                <div className={cx("grid-content-post", "dev-scroll")}>

                    <ReactQuill
                        ref={inputRef}
                        theme="snow"
                        value={textValue}
                        onChange={setTextValue}
                        placeholder={`${user.name || "Người dùng HoBa"} ơi, bạn đang nghĩ gì thế?`}
                        modules={{
                            toolbar: false,
                            
                        }}
                    />

                    {!!urlImage && (
                        <div className={cx("grid-image-post")}>
                            <img
                                className={cx("image")}
                                src={urlImage}
                                alt="image-post"
                            />
                        </div>
                    )}
                </div>

                <div className={cx("grid-action")}>
                    <span className={cx("title")}>
                        Thêm vào bài viết của bạn
                    </span>
                    <div className={cx("list-action")}>
                        <div className={cx("action-import")}>
                            <input
                                id="input-image-post"
                                type="file"
                                style={{ display: "none" }}
                                onChange={eventOnchangeImagePost}
                            />
                            <label
                                className={cx("import-image")}
                                htmlFor="input-image-post"
                            >
                                {iconFileImage}
                            </label>
                        </div>
                    </div>
                </div>
                <div className={cx("grid-button")}>
                    <button
                        className={cx("dev-button-auto", "button-create-post")}
                        onClick={eventSubmitCreatePost}
                    >
                        Đăng bài
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormCreatePost;
