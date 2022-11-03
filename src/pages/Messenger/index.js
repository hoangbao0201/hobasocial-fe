import classNames from "classnames/bind";
import styles from "./Messenger.module.scss";

import useSound from "use-sound";

import Sidebar from "./Sidebar";
import { useContext, useEffect, useRef, useState } from "react";
import Header from "~/components/Layouts/Header";
import { AuthContext } from "~/context/authContext";
import ContentMessage from "./ContentMessage";
import { io } from "socket.io-client";
import { apiUrl } from "~/context/constant";
import { MessageContext } from "~/context/message";
import Spinner from "~/components/Layouts/Spinner";

const cx = classNames.bind(styles);

const ContentMessageDefault = () => {
    return (
        <div className={cx("content-default-message")}>
            <span className={cx("container-title-welcome")}>
                Chào mừng đến với <span>HOBA</span>
            </span>
            <span className={cx("container-title-des")}>
                Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người
                thân, bạn bè được tối ưu hoá cho máy tính của bạn.
            </span>
            <img
                className={cx("image-default-message")}
                src={"./images/imageDefaultMessage.png"}
                alt="image_message_default"
            />
        </div>
    );
};

function Messenger() {
    const {
        state: { authLoading, isAuthenticated, user },
        getAllUser,
    } = useContext(AuthContext);
    const {
        state,
        state: { msgLoading, allMessages },
        getAllMsg,
        changeAllMessages,
    } = useContext(MessageContext);

    const socket = useRef();

    // Sound
    const path = "sounds/message_sound.mp3";
    const [playSound] = useSound(path, { volume: 0.2 });

    // Hook

    const [dataContentMessage, setDataContentMessage] = useState(null);
    const [isContentMessage, setIsContentMessage] = useState(false);

    const [loadingSearchPeople, setLoadingSearchPeople] = useState(false);

    // Lấy tất cả người nhắn tin với bạn về
    useEffect(() => {
        eventGetAllMessage();
    }, []);

    const eventGetAllMessage = async () => {
        await getAllMsg();
    };

    // Nếu có dữ liệu tin nhắn thì hiện content message
    useEffect(() => {
        if (!!dataContentMessage) {
            setIsContentMessage(true);
        }
    }, [dataContentMessage]);

    // Socket
    useEffect(() => {
        if (user) {
            socket.current = io(apiUrl);
            socket.current.emit("add-user", user._id);
        }
    }, [user]);

    useEffect(() => {
        let change = false;
        if (allMessages) {
            if (user) {
                socket.current.on("msg-receive", (newMessage) => {
                    const checkSender = newMessage.members.find((value) => {
                        return value._id === user._id;
                    });
                    if (!checkSender) {
                        return;
                    }

                    // Customize dataContentMessage
                    // setDataContentMessage((value) => {
                    //     return {
                    //         ...value,
                    //         content: [...value.content, newMessage.content[newMessage.content.length - 1]],
                    //     }
                    // })

                    if(!!dataContentMessage) {
                        setDataContentMessage(newMessage);
                    }

                    // Customize allMessages
                    let newData = allMessages.filter((d) => {
                        if (d._id === newMessage._id) {
                            d.content = newMessage.content;
                            d.updatedAt = newMessage.updatedAt;
                            change = true;
                        }
                        return d;
                    });
                    changeAllMessages(change ? newData : [newMessage, ...allMessages]);

                    // if(newMessage.content[newMessage.content.length - 1].sendBy !== user._id) {
                    //     playSound();
                    // }

                    change = false;
                });
            }
        }
    }, [allMessages]);

    // useEffect(() => {
    //     let change=false;
    //     if(allMessages) {
    //         socket.on("new-message", (newMessage) => {
    //             const userId = user._id;
    //             const checkMsg = newMessage.members.find((value) => value._id === userId);

    //             if(!checkMsg) {
    //                 return;
    //             }

    //             let newData = allMessages.filter((d) => {
    //                 if(d._id === newMessage._id) {
    //                     d.content = newMessage.content;
    //                     d.updateAt = newMessage.updateAt;
    //                     change = true;
    //                 }

    //                 return d;
    //             })

    //             // Để khi nhắn tin thì ko push thêm tin nhắn vào sidebar
    //             changeAllMessages(change ? newData : [newMessage, ...allMessages]);

    //             if(newMessage.content[newMessage.content.length  - 1].sendBy != user._id) {
    //                 playSound();
    //             }

    //             // console.log(newMessage.content[newMessage.content.length  - 1].sendBy != user._id)

    //             // if(!!dataContentMessage) {
    //             //     playSound();
    //             //     console.log(123)
    //             // }

    //             // console.log(!!dataContentMessage)

    //                 // setDataContentMessage(newMessage);
    //             // }
    //         })
    //     }

    //     return () => {
    //         socket.off("new-message");
    //     };
    // }, []);

    if (msgLoading) {
        return (
            <div className={cx("form-msg-loading")}>
                <img className={cx("logo")} src="/images/logo.png" />
                <div className={cx("loading")}>
                    <Spinner size="sm" />
                </div>
            </div>
        );
    }

    let bodyContentMessage;
    if (loadingSearchPeople) {
        bodyContentMessage = <Spinner size="auto" />;
    } else {
        bodyContentMessage = !!dataContentMessage ? (
            <ContentMessage
                actionCloseMessage={() => setDataContentMessage(null)}
                dataContentMessage={dataContentMessage}
                setDataContentMessage={setDataContentMessage}
                socket={socket}
                user={user}
            />
        ) : (
            <ContentMessageDefault />
        );
    }
    return (
        <>
            <Header />
            <div className={cx("wrapper")}>
                <Sidebar
                    user={user}
                    active={dataContentMessage}
                    setDataContentMessage={setDataContentMessage}
                    msgLoading={msgLoading}
                    allMessages={allMessages}
                    eventGetAllMessage={eventGetAllMessage}
                    loadingSearchPeople={loadingSearchPeople}
                    setLoadingSearchPeople={setLoadingSearchPeople}
                />

                <div
                    className={cx(
                        "container",
                        `${!!dataContentMessage ? "checked" : ""}`
                    )}
                >
                    {bodyContentMessage}
                </div>
            </div>
        </>
    );
}

export default Messenger;
