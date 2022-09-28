import FormMessenger from "~/components/DefaultLayout/FormMessenger";
import Messenger from "~/pages/Messenger";



const publicRouter = [
    { path: "/", component: Messenger, layout: FormMessenger},
]

export default publicRouter;