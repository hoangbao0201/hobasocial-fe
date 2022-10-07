import classNames from "classnames/bind";
import styles from "./CreatePost.module.scss";

const cx = classNames.bind(styles);

function CreatePost() {
    return (
        <div className={cx("card")}>
            <div className={cx("card-content")}>
                <div className={cx("card-grid-header")}>
                    <div className={cx("card-grid-header-image")}>
                        <img
                            className={cx("card-header-image")}
                            src="https://s120-ava-talk.zadn.vn/e/d/e/4/1/120/9759d738572412317209f29511d43f57.jpg"
                            alt="avatar"
                            onError={eventChangeImageCard}
                        />
                    </div>
                    <div className={cx("card-grid-header-info")}>
                        <div className={cx("card-header-name")}>
                            Nguyễn Hoàng Bảo
                        </div>
                        <div className={cx("card-header-time")}>
                            10 giờ trước
                        </div>
                    </div>
                </div>
                <div className={cx("card-grid-content-post")}>
                    <img
                        className={cx("card-content-image")}
                        src="/images/image-post.png"
                    />
                </div>
                <div className={cx("card-grid-footer")}>
                    <span
                        className={cx(
                            "card-footer-like",
                            "card-footer-action",
                            `${likePost && "liked"}`
                        )}
                    >
                        <i className={cx("card-footer-like-icon")}>
                            {likePost ? iconHeartFull : iconHeart}
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
            </div>
        </div>
    );
}

export default CreatePost;
