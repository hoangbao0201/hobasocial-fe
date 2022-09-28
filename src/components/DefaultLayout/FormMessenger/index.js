import classNames from "classnames/bind";
import Header from "~/components/Layouts/Header";
import styles from "./FormMessenger.module.scss";

const cx = classNames.bind(styles);

function FormMessenger({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Header />
            {children}
        </div>
    );
}

export default FormMessenger;
