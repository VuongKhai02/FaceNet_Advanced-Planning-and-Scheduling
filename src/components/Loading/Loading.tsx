import classNames from 'classnames/bind';
import { Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import styles from './Loading.module.css';

const cx = classNames.bind(styles);

const antIcon = <SyncOutlined className={cx('loading-spin')} spin />;
const Loading: React.FC = () => {
    return (<div className={cx("loading-container")}>
        <Spin indicator={antIcon} className={cx("loading-spin")} />
    </div>)
}

export default Loading;