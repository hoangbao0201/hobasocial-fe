import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import { iconDeleteInput, iconSearch, iconSolidMore } from "~/.public/icon";
import { useContext, useEffect, useRef, useState } from "react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import { io } from "socket.io-client";
import { apiUrl } from "~/context/constant";
import { AuthContext } from "~/context/authContext";
import useDebounce from "~/hooks/useDebounce";
import SuggestSearchUserMsg from "./SuggestSearchUserMsg";

const cx = classNames.bind(styles);

const ItemMessage = ({ data, active, action }) => {
    return (
        <div
            className={cx(
                "item-message",
                `${active && "active"}`,
                "item-msg-grid"
            )}
        >
            <div className={cx("item__grid-image")} onClick={action}>
                <img
                    className={cx("avatar-user")}
                    src="https://ava-grp-talk.zadn.vn/f/4/1/5/2/360/186753880220d2b93fa14c1eac06441b.jpg"
                    alt="avatar_message"
                />
            </div>
            <div className={cx("item__grid-content")} onClick={action}>
                <div className={cx("item__content-title")}>
                    <span className={cx("content-title-text")}>
                        {data.name || "Không tìm thấy"}
                    </span>
                    <span className={cx("content-title-time-new")}>3 giờ</span>
                </div>
                <div className={cx("item__content-message")}>
                    {data.description || "Không tìm thấy thông tin"}
                </div>
            </div>
            <div className={cx("item__grid-side-action")}>
                {/* <span
                    className={cx("side-list-action")}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    {iconSolidMore}
                </span> */}

                <Tippy
                    arrow={false}
                    placement="bottom-end"
                    duration="100"
                    trigger="click"
                    theme="light"
                    appendTo="parent"
                    interactive="true"
                    content={
                        <div className={cx("dropdown")}>
                            <div className={cx("action-more-menu-item")}>
                                Ẩn cuộc trò chuyện
                            </div>
                            <div className={cx("action-more-menu-item")}>
                                Ghim
                            </div>
                            <div
                                className={cx(
                                    "action-more-menu-item",
                                    "menu-item-delete"
                                )}
                            >
                                Xóa hội thoại
                            </div>
                        </div>
                    }
                >
                    <span
                        className={cx("side-list-action")}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {iconSolidMore}
                    </span>
                </Tippy>
            </div>
        </div>
    );
};

// Initial value
const listItemMsg = [
    {
        name: "Nguyễn Hoàng Bảo",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Nguyễn Hoàng Vũ",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Nguyễn Thị Hiền Ngân",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Lê Thị Út Ngân",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Nguyễn Tấn Nhật",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Ngô Anh Tuấn",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Nguyễn Nhật Nam",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Sơn Tùng MT-P",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Nguyễn Hoàng Bảo",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Nguyễn Hoàng Vũ",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Nguyễn Thị Hiền Ngân",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Lê Thị Út Ngân",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Nguyễn Tấn Nhật",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Ngô Anh Tuấn",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Nguyễn Nhật Nam",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
    {
        name: "Sơn Tùng MT-P",
        description: "Hôm qua mày có đi học không Hôm qua mày có đi học không",
    },
];
const allUser = [];

const socket = io.connect(apiUrl);

function Sidebar({ active, action }) {
    // usecontext
    const { searchUser } = useContext(AuthContext);

    const [focusInputSearch, setFocusInputSearch] = useState(false);
    const [resultListUserSearch, setResultListUserSearch] = useState([]);
    const [valueInputSearch, setValueInputSearch] = useState("");
    const inputRef = useRef();

    const textDebounce = useDebounce(valueInputSearch, 500);

    useEffect(() => {
        if (textDebounce === "") {
            setResultListUserSearch([]);
        } else if (textDebounce) {
            eventSearchUser(textDebounce);
        }
    }, [textDebounce]);

    // Search user
    const eventSearchUser = async (data) => {
        const dataServer = await searchUser(data);
        if (dataServer.success) {
            setResultListUserSearch(dataServer.resultSearch);
        }
    };

    // Handle focus input
    const eventFocusInput = () => {
        inputRef.current.focus();
    };

    // Delete value input
    const eventDeleteValueInput = () => {
        setValueInputSearch("");
        inputRef.current.focus();
    };

    // Onchange value search
    const eventOnchangeValueSearch = async (e) => {
        setValueInputSearch(e.target.value);
    };

    // Active item message
    const eventActiveItemMessage = (data) => {
        action(data);
    };

    // Close suggest search
    const eventCloseSuggestSearch = () => {
        setFocusInputSearch(false);
        setValueInputSearch("");
    }

    // Send message
    const eventSendMessage = () => {
        socket.emit("join_room", 123);
    };

    let contentSidebar;
    if (!focusInputSearch) {
        contentSidebar = (
            <>
                {listItemMsg.map((item, index) => {
                    return (
                        <ItemMessage
                            key={index}
                            data={item}
                            active={item === active ? "active" : ""}
                            action={() => eventActiveItemMessage(item)}
                        />
                    );
                })}
            </>
        );
    } else {
        contentSidebar = (
            <>
                <SuggestSearchUserMsg
                    data={resultListUserSearch}
                    active={active}
                    action={eventActiveItemMessage}
                />
            </>
        );
    }

    return (
        <div className={cx("wrapper", `${!!active ? "checked" : ""}`)}>
            <div className={cx("side-search")}>
                <div className={cx("grid-input-search")}>
                    <i className={cx("icon-search")} onClick={eventFocusInput}>
                        {iconSearch}
                    </i>
                    <input
                        className={cx("input-search")}
                        placeholder="Tìm kiếm"
                        ref={inputRef}
                        value={valueInputSearch}
                        onChange={eventOnchangeValueSearch}
                        onFocus={() => setFocusInputSearch(true)}
                    />
                    {!!valueInputSearch && (
                        <i
                            className={cx("icon-delete-input")}
                            onClick={eventDeleteValueInput}
                        >
                            {iconDeleteInput}
                        </i>
                    )}
                </div>
                {focusInputSearch && (
                    <span
                        className={cx("close-suggest-sidebar")}
                        onClick={eventCloseSuggestSearch}
                    >
                        Đóng
                    </span>
                )}
            </div>

            <div id="myDIV" className={cx("list-user-message")}>
                {contentSidebar}
            </div>
        </div>
    );
}

export default Sidebar;
