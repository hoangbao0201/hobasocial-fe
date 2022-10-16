import classNames from "classnames/bind";
import styles from "./FormCommentPost.module.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Avatar from "~/components/Layouts/Avatar";
import { useState } from "react";

const cx = classNames.bind(styles);

function FormCommentPost({ user }) {
    const [textValue, setTextValue] = useState("");

    return (
        <div className={cx("card-create-comment")}>
            <div className={cx("dev-devider")}></div>
            <div className={cx("card-create-comment-content")}>
                <Avatar image={user.avatar.url} />
                <div className={cx("grid-input-comment")}>
                    {/* <ReactQuill
                        theme="snow"
                        value={textValue}
                        onChange={setTextValue}
                        placeholder={`${
                            user.name || "Người dùng HoBa"
                        } ơi, bạn đang nghĩ gì thế?`}
                        modules={{
                            toolbar: false,
                        }}
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default FormCommentPost;
