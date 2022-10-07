import classNames from "classnames/bind";
import styles from "./SidebarWeather.module.scss";

const cx = classNames.bind(styles);

function SidebarWeather() {
    return (
        <div className={cx("content-sidebar")}>
            <div className={cx("content-sidebar-title")}>Weather</div>
            <div className={cx("dev-devider")}></div>
        </div>
    );
}

export default SidebarWeather;
