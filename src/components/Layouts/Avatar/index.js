import classNames from "classnames/bind";
import styles from "./Avatar.module.scss";

const cx = classNames.bind(styles);

function Avatar({ image }) {
    return (
        <div className={cx("avatar")}>
            <img
                className={cx("avatar-image")}
                src={image || "/images/avatar-default.png"}
            />
        </div>
    );
}

export default Avatar;
