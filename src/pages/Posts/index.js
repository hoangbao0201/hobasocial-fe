import classNames from "classnames/bind";
import styles from "./Posts.module.scss";

import Footer from "~/components/Layouts/Footer";
import Header from "~/components/Layouts/Header";
import ScrollTop from "~/components/Layouts/ScrollTop";
import ListPost from "./ListPost";
import { useContext, useState } from "react";
import { AuthContext } from "~/context/authContext";
import SidebarListUser from "./SidebarListUser";
import SidebarWeather from "./SidebarWeather";
import { PostContext } from "~/context/postContext";

const cx = classNames.bind(styles);

function Posts() {
    const {
        state: { user },
    } = useContext(AuthContext);
    const { getMutiplePosts } = useContext(PostContext);

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    const getAllPosts = async () => {
        const dataServerAllPosts = await getMutiplePosts(1, 10);
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
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <div className={cx("content-sidebar-weather", "dev-col-3")}>
                        <SidebarWeather />
                    </div>

                    <div className={cx("content-list-card", "dev-col-6")}>
                        <ListPost
                            user={user}
                            posts={posts}
                            setPosts={setPosts}
                            getAllPosts={getAllPosts}
                            getNewPosts={getNewPosts}
                        />
                    </div>

                    <div
                        className={cx("content-sidebar-list-user", "dev-col-3")}
                    >
                        <SidebarListUser />
                    </div>
                </div>
                <ScrollTop />
            </div>
            <Footer />
        </div>
    );
}

export default Posts;
