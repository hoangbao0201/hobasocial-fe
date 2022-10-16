import classNames from "classnames/bind";
import styles from "./SidebarListUser.module.scss";

const cx = classNames.bind(styles);

const ItemUser = ({ user }) => {
    return (
        <div className={cx("item-user")}>
            <img
                className={cx("item-user-image")}
                src={user && user.avatar.url || "/images/avatar-default.png"}
                alt="avatar"
            />
            <div className={cx("item-user-name")}>Nguyễn Hoàng Bảo</div>
        </div>
    );
};

function SidebarListUser({ listUser }) {
    return (
        <div className={cx("content-sidebar")}>
            <div className={cx("content-sidebar-title")}>Bạn bè</div>
            <div className={cx("dev-devider")}></div>
            <div className={cx("content-sidebar-list-item", "dev-scroll")}>
                <ItemUser />
            </div>
        </div>
    );
}

export default SidebarListUser;
