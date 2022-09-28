import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

const cx = classNames.bind(styles);

const MenuDropdown = () => {
    return (
        <div className={cx("dropdown")}>
            <a href="/" className={cx("dropdown-item")}>
                Trang cá nhân
            </a>
            <a href="/" className={cx("dropdown-item")}>
                Hồ sơ của bạn
            </a>
            <a href="/" className={cx("dropdown-item")}>
                Cài đặt
            </a>
            <a href="/" className={cx("dropdown-item")}>
                Đăng xuất
            </a>
        </div>
    );
};

function Header() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <a href="/">
                    <div className={cx("logo")}>Logo</div>
                </a>
                {/* <div className={cx("grid-avatar")}>
                    <img
                        className={cx("image-avatar")}
                        src="https://s120-ava-talk.zadn.vn/e/d/e/4/1/120/9759d738572412317209f29511d43f57.jpg"
                    />
                </div> */}

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
            </div>
        </div>
    );
}

export default Header;
