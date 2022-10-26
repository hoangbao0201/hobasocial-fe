import classNames from "classnames/bind";
import styles from "./Messenger.module.scss";

import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from "react";
import Header from "~/components/Layouts/Header";
import { AuthContext } from "~/context/authContext";
import ContentMessage from "./ContentMessage";
import { io } from "socket.io-client";
import { apiUrl } from "~/context/constant";
import { MessageContext } from "~/context/message";
import Spinner from "~/components/Layouts/Spinner";

const cx = classNames.bind(styles);

const socket = io(apiUrl);

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
        state: { msgLoading, allMessages },
        getAllMsg,
    } = useContext(MessageContext);

    const [dataContentMessage, setDataContentMessage] = useState(null);
    const [loadingSearchPeople, setLloadingSearchPeople] = useState(false);

    useEffect(() => {
        eventGetAllMessage();
    }, []);

    const eventSetLoadingSearch = (isLoading) => {
        setLloadingSearchPeople(isLoading);
    }

    const eventGetAllMessage = async () => {
        const dataServerAllMsg = await getAllMsg();
    };

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
        bodyContentMessage = (
            <Spinner size="auto" />
        );
    } else {
        bodyContentMessage = !!dataContentMessage ? (
            <ContentMessage
                actionCloseMessage={() => setDataContentMessage(null)}
                dataContentMessage={dataContentMessage}
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
                    action={setDataContentMessage}
                    msgLoading={msgLoading}
                    allMessages={allMessages}

                    loadingSearchPeople={loadingSearchPeople}
                    setLloadingSearchPeople={setLloadingSearchPeople}
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
