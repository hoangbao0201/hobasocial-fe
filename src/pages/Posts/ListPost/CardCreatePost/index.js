import classNames from "classnames/bind";
import styles from "./CardCreatePost.module.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Modal from "react-modal";
import Avatar from "~/components/Layouts/Avatar";
import { iconClose, iconFileImage } from "~/.public/icon";
import Spinner from "~/components/Layouts/Spinner";
import { useContext, useEffect, useRef, useState } from "react";
import { PostContext } from "~/context/postContext";
import "./customize-react-quill.css";

const cx = classNames.bind(styles);

function CardCreatePost({ user, posts, setPosts, setIsLoadingCreatePost, setListPostsNew, listPostsNew }) {
    const [isModal, setIsModal] = useState(false);

    const eventShowModal = () => {
        setIsModal(true);
        document.body.style.overflow = "hidden";
    };

    const eventHiddenModal = async () => {
        setIsModal(false);
        document.body.style.overflow = "";
    };

    return (
        <>
            <div className={cx("card-create-post")}>
                <Modal
                    isOpen={isModal}
                    onRequestClose={eventHiddenModal}
                    ariaHideApp={false}
                    style={{
                        content: {
                            margin: "auto",
                            padding: "0px",
                            display: "table",
                            inset: "0px",
                            width: "100%",
                            maxWidth: "500px",
                        },
                        overlay: {
                            zIndex: "101",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        },
                    }}
                >
                    <FormCreatePostInModal
                        user={user}
                        posts={posts}
                        setPosts={setPosts}
                        actionQuit={eventHiddenModal}
                        setIsLoadingCreatePost={setIsLoadingCreatePost}
                        setListPostsNew={setListPostsNew}
                        listPostsNew={listPostsNew}
                    />
                </Modal>
                <div className={cx("card-create-post-content")}>
                    <Avatar image={user.avatar.url} />
                    <button
                        className={cx("button-show-modal")}
                        onClick={eventShowModal}
                    >
                        {user.name || "Người dùng HoBa"} ơi, bạn đang nghĩ gì
                        thế
                    </button>
                </div>
            </div>
        </>
    );
}
export default CardCreatePost;

const FormCreatePostInModal = ({
    user,
    posts,
    setPosts,
    actionQuit,
    setIsLoadingCreatePost,
    setListPostsNew,
    listPostsNew,
}) => {
    const { createPost, uploadSingleImage } = useContext(PostContext);

    const inputRef = useRef();
    const imageRef = useRef();
    // const [loadingButton, setLoadingButton] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [dataImage, setDataImage] = useState(null);
    const [urlImage, setUrlImage] = useState(null);
    const [textValue, setTextValue] = useState("");

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

    const eventSubmitCreatePost = async (e) => {
        e.preventDefault();

        // Check info post
        if (textValue === "" && !dataImage) {
            console.log("bạn chưa điền đầy đủ thông tin");
            return;
        }

        // setLoadingButton(true);
        actionQuit(false);
        setIsLoadingCreatePost(true);

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

        // setLoadingButton(false);
        // actionQuit(false);

        // setListPostsNew(listPostsNew.unshift(dataServerInfo.post));
        setPosts([dataServerInfo.post, ...posts])

        // console.log(dataServerInfo.post)
        setIsLoadingCreatePost(false);
    };

    const eventCloseModal = () => {
        actionQuit(false);
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div className={cx("grid-header")}>
                    <span className={cx("title")}>Tạo bài viết</span>
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
                            onClick={eventSubmitCreatePost}
                            // disabled={loadingButton}
                        >
                            {/* {loadingButton && <Spinner size="sm" />} */}
                            <p className={cx("title-button-upload")}>
                                Đăng bài
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
