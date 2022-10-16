import classNames from "classnames/bind";
import styles from "./LoadingPost.module.scss";

const cx = classNames.bind(styles);

function LoadingPost() {
    return (
        <div className={cx("card")}>
            <div className={cx("card-content")}>
                <div className={cx("card-grid-header")}>
                    <div className={cx("avatar", "dev-skeleton")}></div>
                    <div className={cx("card-grid-header-info")}>
                        <div className={cx("card-header-name", "dev-skeleton")}></div>
                        <div className={cx("card-header-time", "dev-skeleton")}></div>
                    </div>
                </div>
                <div className={cx("content-text-post", "dev-skeleton")}></div>
                <div className={cx("card-grid-content-post", "dev-skeleton")}></div>
                <div className={cx("card-grid-footer", "dev-skeleton")}></div>
            </div>
        </div>
    );
}

export default LoadingPost;
