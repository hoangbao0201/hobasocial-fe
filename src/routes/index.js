import Posts from "~/pages/Posts";
import Login from "~/pages/Login";
import Messenger from "~/pages/Messenger";
import Register from "~/pages/Register";
import UpdateUser from "~/pages/UpdateUser";
import CheckUser from "~/utils/checkUser";
import Profile from "~/pages/Profile";


const publicRouter = [
    
    { path: "/auth/login", component: Login},
    { path: "/auth/register", component: Register},

    { path: "/", component: Posts, layout: CheckUser},
    { path: "/messenger", component: Messenger, layout: CheckUser},
    { path: "/update-profile", component: UpdateUser, layout: CheckUser},
    { path: "/:id", component: Profile, layout: CheckUser},
    
]

export default publicRouter;