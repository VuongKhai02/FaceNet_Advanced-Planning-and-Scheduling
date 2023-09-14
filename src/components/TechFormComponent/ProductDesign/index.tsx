import classNames from "classnames/bind";
import styles from "./ProductDesign.module.css"
import { useTechFormContext } from "../../../pages/components/TechFormManager/TechFormUpdate/TechFormUpdate";

const cx = classNames.bind(styles);

function ProductDesign({ value, setValue }) {

    const [techFormState, dispatch] = useTechFormContext();

    return (<div className={cx('wrapper')}>
        <div className={cx('outer-rectangle')}>
            <div className={cx('inner-rectangle')}>
                <div className={cx('text')}>Chú ý: -Màu theo tờ mẫu đã làm T05/2020</div>
            </div>

            <div className={cx('image-container')}>
                <img
                    src='https://www.visa.com.vn/dam/VCOM/regional/ap/vietnam/global-elements/images/vn-visa-classic-card-498x280.png'
                    alt='Credit Card'
                    className={cx('credit-card-image')}
                />
            </div>
        </div>
    </div>);
}

export default ProductDesign;