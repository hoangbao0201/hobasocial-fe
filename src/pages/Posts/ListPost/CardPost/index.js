import classNames from "classnames/bind";
import styles from "./CardPost.module.scss";

import moment from "moment";
import "moment/locale/vi";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useState } from "react";
import {
    iconComment,
    iconHeart,
    iconHeartFull,
    iconSolidMore,
} from "~/.public/icon";
import Avatar from "~/components/Layouts/Avatar";
import FormCommentPost from "./FormCommentPost";
import Modal from "react-modal";
import FormUpdatePost from "./FormUpdatePost";
import LoadingPost from "~/components/Layouts/Loading/LoadingPost";

const cx = classNames.bind(styles);

function CardPost({ user, post, likePost, unlikePost, deletePost }) {
    const [loadingFormPost, setLoadingFormPost] = useState(false);

    const [isModalFormUploadPost, setIsModalFormUploadPost] = useState(false);
    const [isFormComment, setIsFormComment] = useState(false);
    const [isLike, setIsLike] = useState(post.likes.includes(user._id));
    const [isDelete, setIsDelete] = useState(false);
    const [countLikes, setCountLikes] = useState(post.likes.length);

    const [timeNow, setTimeNow] = useState(null)
    const [currentPost, setCurrentPost] = useState(post);

    // Event show, hiddent modal
    const eventShowModal = () => {
        setIsModalFormUploadPost(true);
        document.body.style.overflow = "hidden";
    };
    const eventHiddenModal = async () => {
        setIsModalFormUploadPost(false);
        document.body.style.overflow = "";
    };

    // Like, Unlike post
    const eventLikePost = async () => {
        if (isLike) {
            setCountLikes(countLikes - 1);
        } else {
            setCountLikes(countLikes + 1);
        }

        if (isLike) {
            setIsLike(!isLike);
            await unlikePost(post._id);
            console.log("unlike");
        } else {
            setIsLike(!isLike);
            await likePost(post._id);
            console.log("like");
        }
    };

    // Delete post
    const eventDeletePost = async () => {
        if (window.confirm("Bạn có thật sự muốn xóa bài viết này?")) {
            setLoadingFormPost(true);

            const dataServer = await deletePost(post._id);
            if (dataServer.success) {
                setLoadingFormPost(false);
                setIsDelete(true);
            }
        }
    };

    // Comment post
    const eventCommentPost = () => {
        setIsFormComment(!isFormComment);
    };

    if (isDelete) {
        return null;
    }
    if (loadingFormPost) {
        return <LoadingPost />;
    }

    return (
        <div className={cx("card")}>
            <Modal
                isOpen={isModalFormUploadPost}
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
                        zIndex: "110",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    },
                }}
            >
                <FormUpdatePost
                    user={user}
                    post={currentPost}
                    setPost={setCurrentPost}
                    actionQuit={eventHiddenModal}
                    setLoadingFormPost={setLoadingFormPost}
                />
            </Modal>

            <div className={cx("card-content")}>
                <div className={cx("card-grid-header")}>
                    <Avatar image={post.postedBy.avatar.url} />
                    <div className={cx("card-grid-header-info")}>
                        <div className={cx("card-header-name")}>
                            {post.postedBy.name}
                        </div>
                        <div className={cx("card-header-time")}>
                            {moment(post.createdAt).fromNow()}
                        </div>
                    </div>

                    {post.postedBy._id === user._id && (
                        <Tippy
                            arrow={true}
                            placement="bottom-end"
                            duration="100"
                            trigger="click"
                            theme="light"
                            appendTo="parent"
                            interactive="true"
                            content={
                                <div className={cx("dropdown")}>
                                    <div
                                        className={cx("action-update-post")}
                                        onClick={(e) => eventShowModal(true)}
                                    >
                                        Cập nhật bài viết
                                    </div>
                                    <div
                                        className={cx("action-delete-post")}
                                        onClick={eventDeletePost}
                                    >
                                        Xóa bài viết
                                    </div>
                                </div>
                            }
                        >
                            <i className={cx("icon-close")}>{iconSolidMore}</i>
                        </Tippy>
                    )}
                </div>
                {post.content.length > 0 && (
                    <div
                        className={cx("content-text-post")}
                        dangerouslySetInnerHTML={{
                            __html: currentPost.content,
                        }}
                    ></div>
                )}
                <div className={cx("card-grid-content-post")}>
                    {currentPost.image.url && (
                        <img
                            className={cx("card-content-image")}
                            src={currentPost.image.url}
                        />
                    )}
                </div>

                <div className={cx("post-cout-like", `${!!isLike && "liked"}`)}>
                    {!!isLike ? iconHeartFull : iconHeart} {countLikes}
                </div>
                <div className={cx("dev-devider")}></div>
                <div className={cx("card-grid-footer")}>
                    <span
                        className={cx(
                            "card-footer-like",
                            "card-footer-action",
                            `${isLike && "liked"}`
                        )}
                        onClick={eventLikePost}
                    >
                        <i className={cx("card-footer-like-icon")}>
                            {isLike ? iconHeartFull : iconHeart}
                        </i>
                        Thích
                    </span>
                    <span
                        className={cx(
                            "card-footer-comment",
                            "card-footer-action"
                        )}
                        onClick={eventCommentPost}
                    >
                        <i className={cx("card-footer-comment-icon")}>
                            {iconComment}
                        </i>
                        Bình luận
                    </span>
                </div>
                {isFormComment && <FormCommentPost user={user} />}
            </div>
        </div>
    );
}

export default CardPost;
