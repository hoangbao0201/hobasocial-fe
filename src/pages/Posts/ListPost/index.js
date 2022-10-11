import classNames from "classnames/bind";
import styles from "./ListPost.module.scss";

import { iconComment, iconHeart, iconHeartFull } from "~/.public/icon";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/context/authContext";
import { PostContext } from "~/context/postContext";
import CardPost from "./CardPost";
import CardCreatePost from "./CardCreatePost";

const cx = classNames.bind(styles);

function ListPost({ user }) {
    const { getMutiplePosts, likePost, unlikePost } = useContext(PostContext);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        const dataServerAllPosts = await getMutiplePosts(1, 5);
        setPosts(dataServerAllPosts.posts);
    };

    const getNewPosts = async () => {
        const dataServerAllPosts = await getMutiplePosts(page + 1, 5);
        setPage(page + 1);

        const newPosts = [...posts, ...dataServerAllPosts.posts];
        // console.log("old: ", posts)
        // console.log("new: ", newPosts)

        // setTimeout(() => {
        setPosts(newPosts);
        // }, 5000)
    };

    return (
        <div className={cx("content-list-post")}>
            <CardCreatePost />
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
