import classNames from "classnames/bind";
import styles from "./CardPost.module.scss";

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

const cx = classNames.bind(styles);

function CardPost({
    post,
    user,
    likePost,
    unlikePost,
    deletePost,
    actionGetAllPosts,
}) {
    const [isLike, setIsLike] = useState(post.likes.includes(user._id));
    const [countLikes, setCountLikes] = useState(post.likes.length);
    const [isFormComment, setIsFormComment] = useState(false);

    const eventLikePost = async () => {
        if (isLike) {
            setCountLikes(countLikes - 1);
        } else {
            setCountLikes(countLikes + 1);
        }
        setIsLike(!isLike);

        if (post.likes.includes(user._id)) {
            await unlikePost(post._id);
        } else {
            await likePost(post._id);
        }
    };

    const eventDeletePost = async () => {
        if (window.confirm("Bạn có thật sự muốn xóa bài viết này?")) {
            const dataServer = await deletePost(post._id);
            if (dataServer.success) {
                actionGetAllPosts();
            }
        }
    };

    const eventCommentPost = () => {
        setIsFormComment(!isFormComment);
    };

    return (
        <div className={cx("card")}>
            <div className={cx("card-content")}>
                <div className={cx("card-grid-header")}>
                    <Avatar image={post.postedBy.avatar.url} />
                    <div className={cx("card-grid-header-info")}>
                        <div className={cx("card-header-name")}>
                            {post.postedBy.name}
                        </div>
                        <div className={cx("card-header-time")}>
                            {post.postedBy.createdAt}
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
                                    <div className={cx("action-update-post")}>
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
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>
                )}
                <div className={cx("card-grid-content-post")}>
                    {!!post.image && !!post.image.url && (
                        <img
                            className={cx("card-content-image")}
                            src={post.image.url}
                        />
                    )}
                </div>

                <div className={cx("post-cout-like", `${isLike && "liked"}`)}>
                    {/* {iconHeartFull} */}
                    {likePost ? iconHeartFull : iconHeart} {countLikes}
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
