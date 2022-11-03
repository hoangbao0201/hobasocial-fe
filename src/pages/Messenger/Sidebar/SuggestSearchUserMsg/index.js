import classNames from "classnames/bind";
import { useContext, useEffect } from "react";
import { MessageContext } from "~/context/message";
import styles from "./SuggestSearchUserMsg.module.scss";

const cx = classNames.bind(styles);

function SuggestSearchUserMsg({user, data, isActive, eventActiveItemMessage }) {
    const userId = user._id;
    return (
        <div className={cx("content")}>
            <div className={cx("title-search")}>Kết quả tìm kiếm</div>
            {data.map((user, index) => {
                if(user._id === userId) {
                    return <div key={index}></div>
                }
                return (
                    <div
                        className={cx(
                            "item-search",
                            `${user === isActive ? "active" : ""}`
                        )}
                        key={user._id}
                        onClick={() => eventActiveItemMessage(user)}
                    >
                        {
                            <>
                                <img
                                    className={cx("image")}
                                    src={
                                        user.avatar?.url ||
                                        "/images/avatar-default.png"
                                    }
                                />
                                <span className={cx("name", "dev-text-more")}>
                                    {user.name || "Người dùng không tồn tại"}
                                </span>
                            </>
                        }
                    </div>
                );
            })}
        </div>
    );
}

export default SuggestSearchUserMsg;
