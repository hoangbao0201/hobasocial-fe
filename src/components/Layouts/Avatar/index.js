import classNames from "classnames/bind";
import styles from "./Avatar.module.scss";

const cx = classNames.bind(styles);

function Avatar({ image, size }) {
    return (
        <div className={cx("avatar")}>
            <img
                className={cx("avatar-image", `size-${size}`)}
                src={image || "/images/avatar-default.png"}
            />
        </div>
    );
}

export default Avatar;
