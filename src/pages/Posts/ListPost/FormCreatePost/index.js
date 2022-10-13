import classNames from "classnames/bind";
import styles from "./FormCreatePost.module.scss";
import "./customize-react-quill.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Avatar from "~/components/Layouts/Avatar";
import { iconClose, iconFileImage } from "~/.public/icon";
import { useContext, useEffect, useRef, useState } from "react";
import Spinner from "~/components/Layouts/Spinner";
import { PostContext } from "~/context/postContext";

const cx = classNames.bind(styles);

function FormCreatePost({ user, actionQuit }) {
    const { createPost, uploadSingleImage } = useContext(PostContext);

    const inputRef = useRef();
    const imageRef = useRef();
    const [loadingImage, setLoadingImage] = useState(false);
    const [dataImage, setDataImage] = useState(null);
    const [urlImage, setUrlImage] = useState(null);
    const [textValue, setTextValue] = useState("");

    const eventOnchangeImagePost = async (e) => {
        const fileImage = e.target.files[0];

        setDataImage(fileImage);
        setUrlImage(URL.createObjectURL(fileImage));

        if (fileImage) {
            imageRef.current?.scrollIntoView();
        }
    };

    const eventSubmitCreatePost = async (e) => {
        e.preventDefault();

        // Check info post
        if (textValue === "" && !dataImage) {
            return;
        }

        setLoadingImage(true);

        // Request upload image post
        let image = {
            urlImage: null,
            idImage: null,
        };
        if (dataImage) {
            const formData = new FormData();
            formData.append("file", dataImage);
            const dataServerImage = await uploadSingleImage(formData);

            image = {
                urlImage: dataServerImage.urlImage || null,
                idImage: dataServerImage.idImage || null,
            };
        }

        // Request upload info and image post
        const dataServerInfo = await createPost({
            content: textValue,
            image: {
                url: image.urlImage,
                public_id: image.idImage,
            },
        });

        setLoadingImage(false);
        console.log(dataServerInfo);
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

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
                <div
                    className={cx(
                        "grid-content-post",
                        "dev-scroll",
                        "form-content-text-and-image"
                    )}
                >
                    <ReactQuill
                        ref={inputRef}
                        theme="snow"
                        value={textValue}
                        onChange={setTextValue}
                        placeholder={`${
                            user.name || "Người dùng HoBa"
                        } ơi, bạn đang nghĩ gì thế?`}
                        modules={{
                            toolbar: false,
                        }}
                    />

                    {!!urlImage && (
                        <div ref={imageRef} className={cx("grid-image-post")}>
                            <img
                                className={cx("image")}
                                src={urlImage}
                                alt="image-post"
                            />
                            <i
                                className={cx("icon-close")}
                                onClick={() => setUrlImage(null)}
                            >
                                {iconClose}
                            </i>
                        </div>
                    )}
                </div>

                <div className={cx("grid-action")}>
                    <span className={cx("title")}>
                        Thêm vào bài viết của bạn{" "}
                        {loadingImage && <Spinner size="sm" />}
                    </span>
                    <div className={cx("list-action")}>
                        <div className={cx("action-import")}>
                            <input
                                id="input-image-post"
                                type="file"
                                style={{ display: "none" }}
                                onChange={eventOnchangeImagePost}
                                disabled={loadingImage}
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
