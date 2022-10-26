import classNames from "classnames/bind";
import styles from "./ListPost.module.scss";

import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "~/context/postContext";
import CardPost from "./CardPost";
import CardCreatePost from "./CardCreatePost";
import LoadingPost from "~/components/Layouts/Loading/LoadingPost";

const cx = classNames.bind(styles);

function ListPost({ user, posts, setPosts, getAllPosts, getNewPosts }) {
    const { likePost, unlikePost, deletePost } = useContext(PostContext);

    const [isLoadingCreatePost, setIsLoadingCreatePost] = useState(false);

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className={cx("content-list-post")}>
            <CardCreatePost
                user={user}
                posts={posts}
                setPosts={setPosts}
                setIsLoadingCreatePost={setIsLoadingCreatePost}
            />

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
                    {isLoadingCreatePost && <LoadingPost />}
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={getNewPosts}
                        hasMore={true}
                        loader={<LoadingPost />}
                    >
                        {posts.map((post, index) => (
                            <CardPost
                                key={post._id}
                                // key={index}
                                user={user}
                                post={post}
                                likePost={likePost}
                                unlikePost={unlikePost}
                                deletePost={deletePost}
                            />
                        ))}
                    </InfiniteScroll>
                </>
            )}
        </div>
    );
}

export default ListPost;
