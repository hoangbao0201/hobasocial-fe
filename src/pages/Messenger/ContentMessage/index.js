import classNames from "classnames/bind";
import styles from "./ContentMessage.module.scss";

import moment from "moment";
import "moment/locale/vi";

import { iconArrowLeft, iconCheck } from "~/.public/icon";
import { useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "~/context/message";

const cx = classNames.bind(styles);

function ContentMessage({
    actionCloseMessage,
    dataContentMessage,
    setDataContentMessage,
    socket,
    user,
}) {
    const { sendMessage } = useContext(MessageContext);

    const inputRef = useRef();
    const [valueInputSendMsg, setValueInputSendMsg] = useState("");

    // console.log(dataContentMessage)

    // Send message
    const eventSendMsg = async () => {
        if (valueInputSendMsg === "") {
            return;
        }
        if (dataContentMessage._id === dataContentMessage.members[0]._id) {
            return;
        }

        const dataServerSendMessage = await sendMessage({
            messageId: dataContentMessage._id,
            receiveId: [dataContentMessage.members[0]._id],
            text: valueInputSendMsg,
            image: null,
        });

        setDataContentMessage((value) => {
            return {
                ...value,
                ...dataServerSendMessage.message,
            };
        });

        // console.log(dataServerSendMessage.message)

        // socket.emit("send_msg", {
        //     senderId: user._id,
        //     receiverId: receiverId,
        //     text: valueInputSendMsg,
        // });

        setValueInputSendMsg("");
        inputRef.current.focus();
    };

    // console.log(dataContentMessage)

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
                        src={
                            dataContentMessage.members[0]?.avatar.url ||
                            "images/avatar-default.png"
                        }
                    ></img>
                    <span className={cx("grid-info-name")}>
                        {dataContentMessage.members[0].name}
                    </span>
                </div>
            </div>
            <div className={cx("list-messages", "dev-scroll")}>
                {dataContentMessage.content.map((item, index) => {
                    return (
                        <div key={index} className={cx("grid-message-row")}>
                            <div
                                className={cx(
                                    "messages-item",
                                    `${
                                        item.sendBy === user._id
                                            ? "youSent"
                                            : ""
                                    }`
                                )}
                            >
                                <div className={cx("messages-item-msg")}>
                                    {item.text}
                                </div>
                                <div className={cx("messages-item-time")}>
                                    {moment(item.created).fromNow()}
                                </div>
                            </div>

                            {item.sendBy === user._id && <i className={cx("check-send-successfully")}>{iconCheck}</i>}
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
