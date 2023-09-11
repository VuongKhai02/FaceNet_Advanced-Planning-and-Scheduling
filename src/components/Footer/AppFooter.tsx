import classNames from "classnames/bind";
import { Layout } from "antd";
import styles from "./AppFooter.module.css";

const cx = classNames.bind(styles);
const { Footer } = Layout;
const AppFooter: React.FC = () => {
    return <>
        <Footer className={cx("padding-0")} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="container">
                <div className="copyright">
                    © Copyright <strong>FaceNet</strong>. All Rights Reserved &nbsp;
                    Designed by <a href="https://facenet.vn/">FaceNet</a>
                </div>
            </div>
        </Footer>

    </>

}

export default AppFooter;