import classNames from "classnames/bind";
import styles from "./SidebarListUser.module.scss";

const cx = classNames.bind(styles);

const ItemUser = () => {
    return (
        <div className={cx("item-user")}>
            <img
                className={cx("item-user-image")}
                src="https://s120-ava-talk.zadn.vn/e/d/e/4/1/120/9759d738572412317209f29511d43f57.jpg"
                alt="avatar"
            />
            <div className={cx("item-user-name")}>Nguyễn Hoàng Bảo</div>
        </div>
    );
};

function SidebarListUser() {
    return (
        <div className={cx("content-sidebar")}>
            <div className={cx("content-sidebar-title")}>Bạn bè</div>
            <div className={cx("dev-devider")}></div>
            <div className={cx("content-sidebar-list-item", "dev-scroll")}>
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
                <ItemUser />
            </div>
        </div>
    );
}

export default SidebarListUser;
