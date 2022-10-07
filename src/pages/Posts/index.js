import classNames from "classnames/bind";
import styles from "./Posts.module.scss";

import Footer from "~/components/Layouts/Footer";
import Header from "~/components/Layouts/Header";
import ScrollTop from "~/components/Layouts/ScrollTop";
import ListPost from "./ListPost";
import { useContext } from "react";
import { AuthContext } from "~/context/authContext";
import SidebarListUser from "./SidebarListUser";
import SidebarWeather from "./SidebarWeather";

const cx = classNames.bind(styles);

function Posts() {
    const {
        state: { authLoading },
    } = useContext(AuthContext);

    if (authLoading) {
        return;
    } else {
        return (
            <div className={cx("wrapper")}>
                <Header />
                <div className={cx("container")}>
                    <div className={cx("content")}>
                        <div
                            className={cx(
                                "content-sidebar-weather",
                                "dev-col-3"
                            )}
                        >
                            <SidebarWeather />
                        </div>

                        <div className={cx("content-list-card", "dev-col-6")}>
                            <ListPost />
                        </div>

                        <div
                            className={cx(
                                "content-sidebar-list-user",
                                "dev-col-3"
                            )}
                        >
                            <SidebarListUser />
                        </div>
                    </div>
                <ScrollTop />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Posts;
