import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import { iconDeleteInput, iconSearch, iconSolidMore } from "~/.public/icon";
import { useRef, useState } from "react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

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
                            <div className={cx("action-more-menu-item", "menu-item-delete")}>
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

const dataListItemMsg = [
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

function Sidebar({ active, action }) {
    const [valueInput, setValueInput] = useState("");
    const [dataActiveItem, setDataActiveItem] = useState(null);

    const inputRef = useRef();
    const eventFocusInput = () => {
        inputRef.current.focus();
    };

    const eventDeleteInput = () => {
        setValueInput("");
        inputRef.current.focus();
    };

    const eventActiveItemMessage = (data) => {
        action(data);
    };

    return (
        <div className={cx("wrapper", `${!!active ? "checked" : "" }`)}>
            <div className={cx("side-search")}>
                <i className={cx("icon-search")} onClick={eventFocusInput}>
                    {iconSearch}
                </i>
                <input
                    className={cx("input-search")}
                    placeholder="Tìm kiếm"
                    ref={inputRef}
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                />

                {!!valueInput && (
                    <i
                        className={cx("icon-delete-input")}
                        onClick={eventDeleteInput}
                    >
                        {iconDeleteInput}
                    </i>
                )}
            </div>

            <div id="myDIV" className={cx("list-user-message")}>
                {dataListItemMsg.map((item, index) => {
                    return (
                        <ItemMessage
                            key={index}
                            data={item}
                            active={item === active ? "active" : ""}
                            action={() => eventActiveItemMessage(item)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar;
