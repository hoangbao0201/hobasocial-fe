import classNames from 'classnames/bind'
import Footer from '~/components/Layouts/Footer';
import Header from '~/components/Layouts/Header';
import styles from './ErrorPage.module.scss';

const cx = classNames.bind(styles);

function ErrorPage() {
    return <div className={cx('wrapper')}>
        <Header />
        <div className={cx("grid-content")}>
            <div className={cx("container")}>nguyen</div>
        </div>
        <Footer />
    </div>;
}

export default ErrorPage;