import classNames from "classnames/bind";
import styles from "./Messenger.module.scss";

import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from "react";
import Header from "~/components/Layouts/Header";
import { AuthContext } from "~/context/authContext";
import ContentMessage from "./ContentMessage";
import { io } from "socket.io-client";
import { apiUrl } from "~/context/constant";

const cx = classNames.bind(styles);

const socket = io(apiUrl);

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

    const [dataContentMessage, setDataContentMessage] = useState(null);

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
                        `${!!dataContentMessage ? "checked" : ""}`
                    )}
                >
                    {!!dataContentMessage ? (
                        <ContentMessage
                            actionCloseMessage={() =>
                                setDataContentMessage(null)
                            }
                            dataContentMessage={dataContentMessage}
                            dataListMessages={dataListMessages}
                            socket={socket}
                            user={user}
                        />
                    ) : (
                        <ContentMessageDefault />
                    )}
                </div>
            </div>
        </>
    );
}

export default Messenger;
