import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./ScrollTop.module.scss";

const cx = classNames.bind(styles);

function ScrollTop() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const eventScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            }
            else {
                setShowScrollTop(false);
            }
        });
    }, []);

    return (
        <>
            {showScrollTop && (
                <div className={cx("grid-scroll-top")} onClick={eventScrollTop}>
                    <img className={cx("image-scroll-top")} src="/images/rocket.png"/>
                </div>
            )}
        </>
    );
}

export default ScrollTop;
