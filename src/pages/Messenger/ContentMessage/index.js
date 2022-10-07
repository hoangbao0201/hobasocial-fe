import classNames from "classnames/bind";
import styles from "./ContentMessage.module.scss";

import { iconArrowLeft } from "~/.public/icon";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function ContentMessage({
    actionCloseMessage,
    dataContentMessage,
    dataListMessages,
    socket,
    user
}) {

    const inputRef = useRef();
    const [valueInputSendMsg, setValueInputSendMsg] = useState("");

    const userId = "123";
    // Send message
    const eventSendMsg = () => {
        if(valueInputSendMsg === "") {
            return;
        }

        // socket.emit("send_msg", {
        //     senderId: user._id,
        //     receiverId: receiverId,
        //     text: valueInputSendMsg,
        // });


        setValueInputSendMsg("");
        inputRef.current.focus();
    };

    // Onchange input
    const eventOnchangeInput = (e) => {
        setValueInputSendMsg(e.target.value);
    };

    return (
        <div className={cx("content-message")}>
            <div className={cx("content-header")}>
                <div className={cx("header-grid-info")}>
                    <i
                        className={cx("icon-action-come-back")}
                        onClick={() => actionCloseMessage()}
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
                        <div key={index} className={cx("grid-message-row")}>
                            <div
                                className={cx(
                                    "messages-item",
                                    `${item.sentBy === userId ? "youSent" : ""}`
                                )}
                            >
                                <div
                                    className={cx("messages-item-msg")}
                                >
                                    {item.text}
                                </div>
                                <div className={cx("messages-item-time")}>
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
    );
}

export default ContentMessage;
