import classNames from "classnames/bind";
import styles from "./FormUpdatePost.module.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Avatar from "~/components/Layouts/Avatar";
import { iconClose, iconFileImage } from "~/.public/icon";
import Spinner from "~/components/Layouts/Spinner";
import { useContext, useRef, useState } from "react";
import { PostContext } from "~/context/postContext";
import "./customize-react-quill.css";

const cx = classNames.bind(styles);

function FormUpdatePost({
    user,
    currentPost,
    setCurrentPost,
    actionQuit,
    setLoadingFormPost,
}) {
    const { editPost, uploadSingleImage } = useContext(PostContext);

    const imageRef = useRef();
    const [dataImage, setDataImage] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [urlImage, setUrlImage] = useState(currentPost.image.url);
    const [textValue, setTextValue] = useState(currentPost.content);

    const eventOnchangeImagePost = async (e) => {
        setLoadingImage(true);
        // ---

        const fileImage = e.target.files[0];

        await setDataImage(fileImage);
        await setUrlImage(URL.createObjectURL(fileImage));

        if (fileImage) {
            imageRef.current?.scrollIntoView();
        }

        // ---
        setLoadingImage(false);
    };

    const eventCloseModal = () => {
        actionQuit(false);
    };

    const eventSubmitUpdatePost = async (e) => {
        e.preventDefault();

        // Check info post
        if (textValue.length===0 && !urlImage) {
            console.log("bạn chưa điền đầy đủ thông tin");
            return;
        }

        setLoadingButton(true);

        // Request upload image post
        let image = {
            url: currentPost.image.url,
            public_id: currentPost.image.public_id,
        };
        if (!!dataImage && urlImage != image.url) {
            const formData = new FormData();
            formData.append("file", dataImage);
            const dataServerImage = await uploadSingleImage(formData);

            image = {
                url: dataServerImage.urlImage,
                public_id: dataServerImage.idImage,
            };
        }
        else {
            if(urlImage === null) {
                image = {
                    url: null,
                    public_id: null
                }
            }
        }

        // Request upload info and image post
        const postId = currentPost._id;
        const dataServerInfo = await editPost(
            {
                content: textValue,
                image: {
                    url: image.url,
                    public_id: image.public_id,
                },
            },
            postId
        );

        setLoadingButton(false);
        setLoadingFormPost(true);
        actionQuit(false);

        // console.log(dataServerInfo.post)
        setCurrentPost(dataServerInfo.post);

        console.log("dataServerInfo.post ", dataServerInfo.post)

        setLoadingFormPost(false);
    };

    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div className={cx("grid-header")}>
                    <span className={cx("title")}>Chỉnh sửa bài viết</span>
                    <i className={cx("icon-close")} onClick={eventCloseModal}>
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

                <div className={cx("grid-footer")}>
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
                            className={cx(
                                "dev-button-auto",
                                "button-create-post"
                            )}
                            onClick={eventSubmitUpdatePost}
                            disabled={loadingButton}
                        >
                            {loadingButton && <Spinner size="sm" />}
                            <p className={cx("title-button-upload")}>
                                Cập nhật
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormUpdatePost;
