import classNames from "classnames/bind";
import { useState } from "react";
import { iconComment, iconHeart, iconHeartFull } from "~/.public/icon";
import Avatar from "~/components/Layouts/Avatar";
import styles from "./CardPost.module.scss";

const cx = classNames.bind(styles);

function CardPost({ post, user, likePost, unlikePost }) {
    const [isLike, setIsLike] = useState(post.likes.includes(user._id));
    const [countLikes, setCountLikes] = useState(post.likes.length);

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

    return (
        <div className={cx("card")}>
            <div className={cx("card-content")}>
                <div className={cx("card-grid-header")}>
                    <Avatar image={post.postedBy.avatar.url}/>
                    <div className={cx("card-grid-header-info")}>
                        <div className={cx("card-header-name")}>
                            {post.postedBy.name}
                        </div>
                        <div className={cx("card-header-time")}>
                            {post.postedBy.createdAt}
                        </div>
                    </div>
                </div>
                <div className={cx("content-text-post")}>{post.content}</div>
                <div className={cx("card-grid-content-post")}>
                    {/* <img
                        className={cx("card-content-image")}
                        src="/images/image-post.png"
                    /> */}
                </div>

                <div className={cx("post-cout-like", `${isLike && "liked"}`)}>
                    {/* {iconHeartFull} */}
                    {likePost ? iconHeartFull : iconHeart}
                    {" "}
                    {countLikes}
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
                    >
                        <i className={cx("card-footer-comment-icon")}>
                            {iconComment}
                        </i>
                        Bình luận
                    </span>
                </div>
                <div className={cx("dev-devider")}></div>
            </div>
        </div>
    );
}

export default CardPost;
