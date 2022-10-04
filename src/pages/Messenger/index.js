import classNames from "classnames/bind";
import styles from "./Messenger.module.scss";

import Sidebar from "~/components/Layouts/Sidebar";
import { useContext, useEffect, useRef, useState } from "react";
import { iconArrowLeft } from "~/.public/icon";
import Header from "~/components/Layouts/Header";
import { AuthContext } from "~/context/authContext";

const cx = classNames.bind(styles);

const dataListMessages = {
    member: [123, 234],
    content: [
        {
            text: "Mày ăn cơm chưa?",
            created: "10 phút trước",
            sentBy: "123",
        },
        {
            text: "Nãy mới ăn á",
            created: "10 phút trước",
            sentBy: "234",
        },
        {
            text: "Ăn ngon không",
            created: "10 phút trước",
            sentBy: "123",
        },
        {
            text: "Ngon lắm",
            created: "10 phút trước",
            sentBy: "234",
        },
        {
            text: "haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha ",
            created: "10 phút trước",
            sentBy: "234",
        },
        {
            text: "Mày ăn cơm chưa?",
            created: "10 phút trước",
            sentBy: "123",
        },
        {
            text: "Nãy mới ăn á",
            created: "10 phút trước",
            sentBy: "234",
        },
        {
            text: "Ăn ngon không",
            created: "10 phút trước",
            sentBy: "123",
        },
        {
            text: "Ngon lắm",
            created: "10 phút trước",
            sentBy: "234",
        },
        {
            text: "haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha haha ",
            created: "10 phút trước",
            sentBy: "234",
        },
    ],
};

function Messenger() {
    const {
        state: { authLoading, isAuthenticated, user },
        getAllUser,
    } = useContext(AuthContext);
    const inputRef = useRef();
    const scrollRef = useRef();

    const userId = "123";
    const [dataContentMessage, setDataContentMessage] = useState(null);
    const [valueInputSendMsg, setValueInputSendMsg] = useState("");

    // Send message
    const eventSendMsg = () => {
        dataListMessages.content.push({
            text: valueInputSendMsg,
            created: "10 phút trước",
            sentBy: userId,
        });
        setValueInputSendMsg("");
        inputRef.current.focus();
    };

    // Onchange input
    const eventOnchangeInput = (e) => {
        setValueInputSendMsg(e.target.value);
    };
    const eventDownLine = () => {
        //     setValueInputSendMsg(setValueInputSendMsg)
        //     setArrayInputListMessage((value) => [...value,valueInputSendMsg])
    };

    useEffect(() => {
        // scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [dataListMessages.content]);

    return (
        <>
            <Header />
            <div className={cx("wrapper")}>
                <Sidebar
                    active={dataContentMessage}
                    action={setDataContentMessage}
                />

                <div
                    className={cx(
                        "container",
                        `${!!dataContentMessage ? "checked" : ""}`,
                    )}
                >
                    {!!dataContentMessage ? (
                        <div className={cx("content-message")}>
                            <div className={cx("content-header")}>
                                <div className={cx("header-grid-info")}>
                                    <i
                                        className={cx("icon-action-come-back")}
                                        onClick={() =>
                                            setDataContentMessage(null)
                                        }
                                    >
                                        {iconArrowLeft}
                                    </i>
                                    <img
                                        className={cx("avatar-others")}
                                        src="https://s120-ava-talk.zadn.vn/e/d/e/4/1/120/9759d738572412317209f29511d43f57.jpg"
                                    ></img>
                                    <span className={cx("grid-info-name")}>
                                        {dataContentMessage.name}
                                    </span>
                                </div>
                            </div>
                            <div className={cx("list-messages", "dev-scroll")}>
                                {dataListMessages.content.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={cx("grid-message-row")}
                                        >
                                            <div
                                                className={cx(
                                                    "messages-item",
                                                    `${
                                                        item.sentBy === userId
                                                            ? "youSent"
                                                            : ""
                                                    }`
                                                )}
                                            >
                                                <div
                                                    ref={scrollRef}
                                                    className={cx(
                                                        "messages-item-msg"
                                                    )}
                                                >
                                                    {item.text}
                                                </div>
                                                <div
                                                    className={cx(
                                                        "messages-item-time"
                                                    )}
                                                >
                                                    {item.created}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={cx("content-footer")}>
                                <div className={cx("content-footer-grid")}>
                                    <input
                                        className={cx("footer-input-sent")}
                                        type="text"
                                        ref={inputRef}
                                        value={valueInputSendMsg}
                                        placeholder={`Gửi tin nhắn cho đối phương`}
                                        onChange={eventOnchangeInput}
                                        onKeyDown={(e) => {
                                            e.key === "Enter" &&
                                                eventDownLine();
                                        }}
                                    />
                                    <div className={cx("footer-grid-action")}>
                                        <span
                                            className={cx("footer-action-send")}
                                            onClick={eventSendMsg}
                                        >
                                            Gửi
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={cx("content-default-message")}>
                            <span className={cx("container-title-welcome")}>
                                Chào mừng đến với <span>HOBA</span>
                            </span>
                            <span className={cx("container-title-des")}>
                                Khám phá những tiện ích hỗ trợ làm việc và trò
                                chuyện cùng người thân, bạn bè được tối ưu hoá
                                cho máy tính của bạn.
                            </span>
                            <img
                                className={cx("image-default-message")}
                                src={"./images/imageDefaultMessage.png"}
                                alt="image_message_default"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Messenger;
