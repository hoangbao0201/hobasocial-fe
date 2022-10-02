import classNames from "classnames/bind";
import styles from "./Posts.module.scss";

import Footer from "~/components/Layouts/Footer";
import Header from "~/components/Layouts/Header";
import ScrollTop from "~/components/Layouts/ScrollTop";
import ListPost from "./ListPost";

const cx = classNames.bind(styles);

const SidebarItemUser = () => {
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

function Posts() {
    return (
        <div className={cx("wrapper", "dev-scroll")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <div className={cx("content-sidebar-weather", "dev-col-3")}>
                        <div className={cx("grid-weather")}>
                            <div
                                className={cx("content-sidebar-weather-title")}
                            >
                                Thời tiết
                            </div>
                        </div>
                    </div>

                    <div className={cx("content-list-card", "dev-col-6")}>
                        <ListPost />
                    </div>

                    <div
                        className={cx("content-sidebar-list-user", "dev-col-3")}
                    >
                        <div className={cx("grid-list-user")}>
                            <div
                                className={cx(
                                    "content-sidebar-list-user-title"
                                )}
                            >
                                Người liên hệ
                            </div>
                            <SidebarItemUser />
                            <SidebarItemUser />
                            <SidebarItemUser />
                            <SidebarItemUser />
                            <SidebarItemUser />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollTop />
        </div>
    );
}

export default Posts;
