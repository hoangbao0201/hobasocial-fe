import classNames from "classnames/bind";
import styles from "./SuggestSearch.module.scss";

const cx = classNames.bind(styles);
const initialImage =
    "https://res.cloudinary.com/dcwekkkez/image/upload/v1656135268/oaf2aq4uxyat9d66ih3r.jpg";

function SuggestSearch({ data }) {
    return (
        <div className={cx("content")}>
            <div className={cx("list-item")}>
                {
                    <>
                        <img
                            className={cx("image")}
                            src={
                                !!data
                                    ? !!data.avatar
                                        ? data.avatar
                                        : initialImage
                                    : initialImage
                            }
                        />
                        <span className={cx("name")}>
                            {data.name || "Người dùng không tồn tại"}
                        </span>
                    </>
                }
            </div>
        </div>
    );
}

export default SuggestSearch;
