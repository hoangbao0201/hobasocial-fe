import classNames from "classnames/bind";
import styles from "./ListPost.module.scss";

import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "~/context/postContext";
import CardPost from "./CardPost";
import CardCreatePost from "./CardCreatePost";
import LoadingPost from "~/components/Layouts/Loading/LoadingPost";

const cx = classNames.bind(styles);

function ListPost({ user }) {
    const { getMutiplePosts, likePost, unlikePost, deletePost } = useContext(PostContext);
    const [posts, setPosts] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        const dataServerAllPosts = await getMutiplePosts(page, 10);
        setPosts(dataServerAllPosts.posts);
    };

    const getNewPosts = async () => {
        const dataServerAllPosts = await getMutiplePosts(page + 1, 10);
        setPage(page + 1);

        // New posts
        const newPosts = [...posts, ...dataServerAllPosts.posts];
        setPosts(newPosts);
    };

    return (
        <div className={cx("content-list-post")}>
            <CardCreatePost user={user} actionGetAllPosts={getAllPosts} />

            {posts.length === 0 ? (
                <>
                    <LoadingPost />
                    <LoadingPost />
                    <LoadingPost />
                    <LoadingPost />
                    <LoadingPost />
                </>
            ) : (
                <>
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
                                deletePost={deletePost}
                                actionGetAllPosts={getAllPosts}
                            />
                        ))}
                    </InfiniteScroll>
                </>
            )}
        </div>
    );
}

export default ListPost;
