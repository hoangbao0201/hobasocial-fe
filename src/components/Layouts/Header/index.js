import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useContext } from "react";
import { AuthContext } from "~/context/authContext";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
// import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const MenuDropdown = () => {
    const { logoutUser } = useContext(AuthContext);
    const eventLogoutUser = async () => {
        await logoutUser();
    };

    return (
        <div className={cx("dropdown")}>
            <a href="/" className={cx("dropdown-item")}>
                Trang cá nhân
            </a>
            <a href="/posts" className={cx("dropdown-item")}>
                Bài viết
            </a>
            <a href="/update-profile" className={cx("dropdown-item")}>
                Thông tin cá nhân
            </a>
            <div className={cx("dropdown-item")} onClick={eventLogoutUser}>
                Đăng xuất
            </div>
        </div>
    );
};

function Header() {
    const {
        state: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    // const [changeHeader, setChangeHeader] = useState(false);

    // let scrollBefore = 0;
    // useEffect(() => {
    //     window.addEventListener("scroll", () => {

    //         // If scroll down
    //         if( (window.scrollY-scrollBefore) > 60 ) {
    //             scrollBefore = window.scrollY;
    //             setChangeHeader(false)
    //         }

    //         // If scroll up
    //         if( (window.scrollY-scrollBefore) < -60) {
    //             scrollBefore = window.scrollY;
    //             setChangeHeader(true)
    //         }

    //     });
    // }, []);

    let body;
    if (authLoading) {
        body = (
            <Spinner size="sm" />
        );
    } else {
        if (isAuthenticated) {
            body = (
                <Tippy
                    arrow={true}
                    placement="bottom-end"
                    duration="100"
                    trigger="click"
                    theme="light"
                    appendTo="parent"
                    interactive="true"
                    content={<MenuDropdown />}
                >
                    <div className={cx("grid-avatar")}>
                        <img
                            alt="avatar"
                            className={cx("image-avatar")}
                            src="https://s120-ava-talk.zadn.vn/e/d/e/4/1/120/9759d738572412317209f29511d43f57.jpg"
                        />
                    </div>
                </Tippy>
            );
        } else {
            body = (
                <div className={cx("grid-action")}>
                    <Link className={cx("item-action")} to="/auth/login">
                        Đăng nhập
                    </Link>
                    <Link className={cx("item-action")} to="/auth/register">
                        Đăng kí
                    </Link>
                </div>
            );
        }
    }

    return (
        <>
            {true && <div className={cx("header-space")}></div>}
            <div
                className={cx(
                    "wrapper",
                    `${true ? "header-scroll-down" : "header-scroll-up"}`
                )}
            >
                <div className={cx("container")}>
                    <a href="/">
                        <div className={cx("logo")}>Logo</div>
                    </a>
                    {body}
                </div>
            </div>
        </>
    );
}

export default Header;
