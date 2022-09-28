import classNames from 'classnames/bind'
import styles from './GlobalStyles.module.scss';

import "./app.css"

const cx = classNames.bind(styles);

function GlobalStyles({ children }) {
    return <div className={cx('globalstyles')}>{ children }</div>;
}

export default GlobalStyles;