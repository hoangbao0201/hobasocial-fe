import classNames from "classnames/bind";
import styles from "./ListPost.module.scss";

import { iconComment, iconHeart, iconHeartFull } from "~/.public/icon";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const cx = classNames.bind(styles);

const CardItem = () => {
    const likePost = true;

    const eventChangeImageCard = (e) => {
        console.log(e);
        e.target.src = "/images/avatar-default.png";
        e.target.onError = null;
    };

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
};

// ---

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
};

// ---

function ListPost() {
    const [state, setState] = useState({
        items: Array.from({ length: 5 }),
    });

    const eventAddState = () => {
        setTimeout(() => {
            setState({
                items: state.items.concat(Array.from({ length: 5 })),
            });
        }, 1000)
    };

    console.log(state.items.length);

    return (
        <>
            <InfiniteScroll
                dataLength={state.items.length}
                next={eventAddState}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                {state.items.map((i, index) => (
                    <CardItem key={index} />
                ))}
            </InfiniteScroll>
        </>
    );
}

export default ListPost;
