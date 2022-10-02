import Posts from "~/pages/Posts";
import Login from "~/pages/Login";
import Messenger from "~/pages/Messenger";
import Register from "~/pages/Register";
import InfoProfile from "~/pages/InfoProfile";
import CheckUser from "~/utils/checkUser";


const publicRouter = [
    
    { path: "/auth/login", component: Login},
    { path: "/auth/register", component: Register},

    { path: "/", component: Messenger, layout: CheckUser},
    { path: "/posts", component: Posts, layout: CheckUser},
    { path: "/update-profile", component: InfoProfile, layout: CheckUser},
    
]

export default publicRouter;