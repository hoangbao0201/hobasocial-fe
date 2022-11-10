import classNames from "classnames/bind";
import styles from "./Profile.module.scss";

import Avatar from "~/components/Layouts/Avatar";
import Header from "~/components/Layouts/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/context/authContext";
import { useParams } from "react-router-dom";
import ListPost from "./ListPost";
import { PostContext } from "~/context/postContext";

const cx = classNames.bind(styles);

function Profile() {
    const { connectUser } = useContext(AuthContext);
    const { getUserPost } = useContext(PostContext);
    const { id } = useParams();
    
    const [infoUser, setInfoUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getInfoUser();
    }, [])

    const eventGetUserPost = async () => {
        const dataServerUserPosts = await getUserPost(1, 10, id);
        setPosts(dataServerUserPosts.posts);
    }
    
    const getInfoUser = async () => {
        const dataServerInfoUser = await connectUser(id);
        setInfoUser(dataServerInfoUser.user);
    }

    const getNewPosts = async () => {
        const dataServerAllPosts = await getUserPost(page + 1, 10, id);
        setPage(page + 1);

        // New posts
        const newPosts = [...posts, ...dataServerAllPosts.posts];
        setPosts(newPosts);
    };

    if(!infoUser) {
        return
    }
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("grid-cover-image")}>
                <img
                    className={cx("cover-image")}
                    src="/images/coverImage.jpg"
                />
            </div>
            <div className={cx("grid-avatar")}>
                <Avatar image={infoUser.avatar.url} size="big" />
                <div className={cx("name")}>{infoUser.name}</div>
            </div>

            <ListPost indexPage={page} user={infoUser} posts={posts} setPosts={setPosts} getAllPosts={eventGetUserPost} getNewPosts={getNewPosts} />
        </div>
    );
}

export default Profile;
