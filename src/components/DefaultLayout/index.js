import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return <div className={cx("wrapper")}>
        <Header />
        {children}
        <Footer />
    </div>;
}

export default DefaultLayout;
