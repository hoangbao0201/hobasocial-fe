import classNames from "classnames/bind";
import styles from "./ListPost.module.scss";

import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "~/context/postContext";
import CardPost from "./CardPost";
import Modal from "react-modal";
import FormCreatePost from "./FormCreatePost";
import Avatar from "~/components/Layouts/Avatar";

const cx = classNames.bind(styles);

function ListPost({ user }) {
    const { getMutiplePosts, likePost, unlikePost } = useContext(PostContext);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        const dataServerAllPosts = await getMutiplePosts(1, 5);
        setPosts(dataServerAllPosts.posts);
    };

    const eventIsShowModal = () => {
        setIsModal(!isModal);
    };

    const getNewPosts = async () => {
        const dataServerAllPosts = await getMutiplePosts(page + 1, 5);
        setPage(page + 1);

        const newPosts = [...posts, ...dataServerAllPosts.posts];

        setPosts(newPosts);
    };

    return (
        <div className={cx("content-list-post")}>
            <div className={cx("card-create-post")}>
                <Modal
                    isOpen={isModal}
                    onRequestClose={eventIsShowModal}
                    ariaHideApp={false}
                    style={{
                        content: {
                            margin: "auto",
                            padding: "0px",
                            display: "table",
                        },
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                        },
                    }}
                >
                    <FormCreatePost user={user} actionQuit={setIsModal}/>
                </Modal>

                <div className={cx("card-create-post-content")}>
                    <Avatar image={user.avatar.url} />
                    <button
                        className={cx("button-show-modal")}
                        onClick={eventIsShowModal}
                    >
                        {user.name || "Người dùng HoBa"} ơi, bạn đang nghĩ gì thế
                    </button>
                </div>
            </div>

            {posts.length === 0 ? (
                <div>Loading</div>
            ) : (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={getNewPosts}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {posts.map((post, index) => (
                        <CardPost
                            key={index}
                            post={post}
                            user={user}
                            likePost={likePost}
                            unlikePost={unlikePost}
                        />
                    ))}
                </InfiniteScroll>
            )}
        </div>
    );
}

export default ListPost;
