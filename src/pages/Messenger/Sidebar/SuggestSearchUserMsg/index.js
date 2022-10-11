import classNames from "classnames/bind";
import styles from "./SuggestSearchUserMsg.module.scss";

const cx = classNames.bind(styles);
const initialImage =
    "https://res.cloudinary.com/dcwekkkez/image/upload/v1656135268/oaf2aq4uxyat9d66ih3r.jpg";

function SuggestSearchUserMsg({ data, active, action }) {
    return (
        <div className={cx("content")}>
            <div className={cx("title-search")}>Kết quả tìm kiếm</div>
            {data.map((user, index) => {
                return (
                    <div className={cx("item-search", `${user === active ? "active" : ""}`)} key={index} onClick={() => action(user)}>
                        {
                            <>
                                <img
                                    className={cx("image")}
                                    src={
                                        !!user.avatar
                                            ? !!user.avatar.url
                                                ? user.avatar.url
                                                : initialImage
                                            : initialImage
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
