import classNames from "classnames/bind";
import styles from "./FormCommentPost.module.scss";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

import Avatar from "~/components/Layouts/Avatar";
import {
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from "react";
import { PostContext } from "~/context/postContext";
import { iconSolidMore } from "~/.public/icon";

const cx = classNames.bind(styles);

const InitialPosts = {
    comments: [],
};

const PostsReducer = (state, action) => {
    // console.log(action)
    switch (action.type) {
        case "SET_COMMENT":
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };
        case "CHANGE_COMMENT_ID":
            console.log(action.payload)
            return {
                ...state,
                comments: action.payload
            };

        default:
            return state;
    }
};

const ItemComment = ({ item, user, post, deleteComment }) => {
    const [isItemComment, setIsItemComment] = useState(true);

    const eventDeleteComment = async (commentId) => {
        if (window.confirm("Bạn có thật sự muốn xóa?")) {
            setIsItemComment(false);
            await deleteComment(
                { commentId: commentId },
                post._id
            );
        }
    };
    if(!isItemComment) {
        return;
    }
    return (
        <div className={cx("item-comment")} key={item?._id}>
            <Avatar image={item.commentBy.avatar.url} />
            <div className={cx("item-comment-frames-msg")}>
                <div className={cx("frames-msg-name")}>
                    {item.commentBy?.name}
                </div>
                <div className={cx("frames-msg-text")}>{item.text}</div>
            </div>
            <span className={cx("btn-more-action")}>
                {item.commentBy._id === user._id && (
                    <Tippy
                        arrow={true}
                        placement="bottom-end"
                        duration="100"
                        trigger="click"
                        theme="light"
                        appendTo="parent"
                        interactive="true"
                        content={
                            <div
                                className={cx("action-delete-comment")}
                                onClick={() => eventDeleteComment(item._id)}
                            >
                                Xóa comment
                            </div>
                        }
                    >
                        <i className={cx("icon-solid-action")}>
                            {iconSolidMore}
                        </i>
                    </Tippy>
                )}
            </span>
        </div>
    );
};

function FormCommentPost({ user, post }) {
    const [state, dispatch] = useReducer(PostsReducer, {
        comments: post.comments,
    });
    const { addComment, deleteComment } = useContext(PostContext);

    const inputRef = useRef();
    const [textValue, setTextValue] = useState("");
    const [numberOfItemsShow, setNumberOfItemsShow] = useState(5);

    const eventShowMore = () => {
        if (numberOfItemsShow + 5 <= state.comments.length) {
            setNumberOfItemsShow((value) => value + 5);
        } else {
            setNumberOfItemsShow(state.comments.length);
        }
    };

    const ItemsToShow = useMemo(() => {
        return state.comments.slice(0, numberOfItemsShow).map((item) => {
            return (
                <ItemComment
                    key={item._id}
                    item={item}
                    user={user}
                    post={post}
                    deleteComment={deleteComment}
                />
            );
        });
    }, [numberOfItemsShow, state]);

    const eventCommentPost = async () => {
        if (textValue === "") {
            return;
        }
        const valueComment = textValue;
        setTextValue("");
        inputRef.current.focus();

        const fakeId = `fakeId-${Math.random()}-${new Date()}`;
        dispatch({
            type: "SET_COMMENT",
            payload: {
                _id: fakeId,
                text: valueComment,
                commentBy: {
                    _id: user._id,
                    name: user.name,
                    avatar: {
                        url: user.avatar.url,
                        public_id: user.avatar.public_id,
                    },
                },
            },
        });

        const dataServerAddComment = await addComment(
            { text: valueComment },
            post._id
        );

        dispatch({
            type: "CHANGE_COMMENT_ID",
            payload: dataServerAddComment.postComment.comments
        });
    };

    return (
        <div className={cx("card-comment")}>
            <div className={cx("dev-devider")}></div>
            <div className={cx("card-comment-create")}>
                <Avatar image={user.avatar.url} />
                <div className={cx("frames-input-comment")}>
                    <input
                        ref={inputRef}
                        className={cx("input-text")}
                        placeholder="Viết bình luận..."
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                eventCommentPost();
                            }
                        }}
                    />
                </div>
            </div>

            <div className={cx("card-comment-list-comment")}>
                {ItemsToShow.length > 0 ? ItemsToShow : ""}
                {state.comments.length > numberOfItemsShow && (
                    <span
                        className={cx("btn-show-more")}
                        onClick={eventShowMore}
                    >
                        Xem thêm bình luận
                    </span>
                )}
            </div>
        </div>
    );
}

export default FormCommentPost;
