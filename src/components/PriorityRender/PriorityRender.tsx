import classNames from 'classnames/bind';
import styles from './PriorityRender.module.css';

const cx = classNames.bind(styles);

function PriorityRender({value}) {
    return ( <div className={cx('priority', `p${value}`)}>
        <span>
            {value}
        </span>
    </div> );
}

export default PriorityRender;