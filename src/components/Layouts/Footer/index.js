import classNames from 'classnames/bind'
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return <div className={cx('wrapper')}>
        <div className={cx("container")}>
            <div className={cx("grid-image-logo")}>
                <img className={cx("image-logo")} src='/images/logo.png' alt='logo'/>
            </div>
            <div className={cx("grid-list-item")}>
                {/* Html, Css, Js, React, NodeJS, Express, MongoDB, Cloudinary */}
            </div>
        </div>
    </div>;
}

export default Footer;