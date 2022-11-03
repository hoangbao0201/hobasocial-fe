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
    const { state: { allMessages }, sendMessage, changeAllMessages } = useContext(MessageContext);

    const inputRef = useRef();
    const scrollRef = useRef();
    const [valueInputSendMsg, setValueInputSendMsg] = useState("");

    // Send message
    // const eventSendMsg = async () => {

    //     if (valueInputSendMsg === "") {
    //         return;
    //     }
    //     if (dataContentMessage._id === dataContentMessage.members[0]._id) {
    //         return;
    //     }

    //     const dataServerSendMessage = await sendMessage({
    //         messagesId: dataContentMessage._id,
    //         receiveId: [dataContentMessage.members[0]._id],
    //         text: valueInputSendMsg,
    //         image: null,
    //     });

    //     setDataContentMessage((value) => {
    //         return {
    //             ...value,
    //             ...dataServerSendMessage.messages,
    //         };
    //     });

    //     let change = false;
    //     let newData = allMessages.filter((d) => {
    //         if(d._id === dataServerSendMessage.messages._id) {
    //             d.content = dataServerSendMessage.messages.content;
    //             d.updateAt = dataServerSendMessage.messages.updateAt;
    //             change = true;
    //         }

    //         return d;
    //     })
    //     changeAllMessages(change ? newData : [dataServerSendMessage.messages, ...allMessages]);

    //     socket.emit("new-message", dataServerSendMessage.messages);

    //     setValueInputSendMsg("");
    //     inputRef.current.focus();
    // };
    

    // Send message
    const eventSendMsg = async () => {
        let textMsg = valueInputSendMsg;
        if(textMsg === "") {
            return;
        }
        // if (dataContentMessage._id === dataContentMessage.members[0]._id) {
        //     return;
        // }

        const receiveId = dataContentMessage.members.flatMap((people) => {
            return people._id === user._id ? [] : people._id;
        }, [])

        const indexContentMessage = dataContentMessage.content.length;
        let dataMsg = {
            text: textMsg,
            sendBy: user._id,
            _id: `fakeId-${Math.random()}-${new Date()}`,
            created: new Date(),
            newMsg: false,
        }
        setDataContentMessage((value) => {
            return {
                ...value,
                content: [...value.content, dataMsg],
            }
        })
        setValueInputSendMsg("");
        inputRef.current.focus();

        // Send message up server
        const dataServerSendMessage = await sendMessage({
            messagesId: dataContentMessage._id,
            receiveId: receiveId,
            text: textMsg,
            image: null,
        })

        // Customize dataContentMessage
        // dataMsg.check = true;
        // dataMsg._id = dataServerSendMessage.messages.content[indexContentMessage]._id;
        // let contentMessages = [
        //     ...dataContentMessage.content, dataMsg
        // ]

        // setDataContentMessage((value) => {
        //     return {
        //         ...value,
        //         content: contentMessages
        //     }
        // })

        setDataContentMessage(dataServerSendMessage.messages)

        // Customize allMessages
        let newData = allMessages.filter((d) => {
            if (d._id === dataServerSendMessage.messages._id) {
                d.content = dataServerSendMessage.messages.content;
                d.updatedAt = dataServerSendMessage.messages.updatedAt;
            }
            return d;
        });
        changeAllMessages(newData);

        // Socket
        socket.current.emit("send-message", dataServerSendMessage.messages);
    }

    // // Onchange input
    const eventOnchangeInput = (e) => {
        setValueInputSendMsg(e.target.value);
    };

    // console.log(dataContentMessage)

    // // auto scroll bottom
    useEffect(() => {
        scrollRef.current?.scrollIntoView();
    }, [dataContentMessage, allMessages]);

    console.log(dataContentMessage)

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
                    {dataContentMessage.members.map((people) => {
                        if (people._id === user._id) {
                            return;
                        }

                        return (
                            <img
                                key={people._id}
                                className={cx("avatar-others")}
                                src={
                                    people.avatar.url ||
                                    "images/avatar-default.png"
                                }
                                alt="avatar_message"
                            />
                        );
                    })}

                    <span className={cx("grid-info-name")}>
                        {dataContentMessage.members.map((people) => {
                            if (people._id === user._id) {
                                return;
                            }

                            return <div key={people._id}>{people.name}</div>;
                        })}
                    </span>
                </div>
            </div>
            <div className={cx("list-messages", "dev-scroll")}>
                {dataContentMessage.content.map((item) => {
                    return (
                        <div
                            ref={scrollRef}
                            key={item._id}
                            className={cx("grid-message-row")}
                        >
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

                            {item.sendBy === user._id && (
                                <i className={cx("check-send-successfully")}>
                                    {item._id.includes('fakeId') ? "" : iconCheck} 
                                </i>
                            )}
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
