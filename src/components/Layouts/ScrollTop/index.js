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
            } else {
                setShowScrollTop(false);
            }
        });
    }, []);

    return (
        <>
            {showScrollTop && (
                <div className={cx("grid-scroll-top")} onClick={eventScrollTop}>
                    {/* <img className={cx("image-scroll-top")} src="/images/rocket.png"/> */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 414.465 414.465"
                    >
                        <path d="M334.828,251.855l-43.282-27.689V86.51c0-11.781-4.51-23.117-12.608-31.676L240.734,14.43  C232.024,5.219,219.908,0,207.232,0s-24.792,5.219-33.501,14.43l-38.204,40.404c-8.098,8.559-12.608,19.895-12.608,31.676v137.656  l-43.282,27.689c-4.614,2.951-7.405,8.053-7.405,13.529v44.414c0,8.867,7.19,16.059,16.06,16.059h57.181  c-0.375,3.498-0.576,7.033-0.576,10.592c0,42.07,47.571,72.119,52.996,75.406c2.87,1.74,6.104,2.609,9.339,2.609  c3.234,0,6.469-0.869,9.339-2.609c5.424-3.287,52.996-33.336,52.996-75.406c0-3.559-0.201-7.094-0.576-10.592h57.181  c8.87,0,16.06-7.191,16.06-16.059v-44.414C342.232,259.908,339.441,254.807,334.828,251.855z M207.232,82.99  c22.074,0,39.969,17.895,39.969,39.969s-17.895,39.969-39.969,39.969s-39.969-17.895-39.969-39.969S185.158,82.99,207.232,82.99z   M233.535,336.449c0,13.986-14.965,28.98-26.301,37.951c-11.348-8.98-26.304-23.969-26.304-37.951c0-3.598,0.307-7.143,0.903-10.592  h50.799C233.228,329.307,233.535,332.852,233.535,336.449z" />
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                    </svg>
                </div>
            )}
        </>
    );
}

export default ScrollTop;
