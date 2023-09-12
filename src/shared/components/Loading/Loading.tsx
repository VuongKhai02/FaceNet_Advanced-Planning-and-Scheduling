import React, { ReactNode } from "react";
import "./Loading.css";

interface LoadingProps {
    isShow?: boolean,
    title?: string
}

const Loading = ({ isShow = false, title = 'Đang tải...' }: LoadingProps) => {

    return (
        <div className={isShow ? 'wrapper_loading show' : 'wrapper_loading hide'}>
            <div className="loading">
                <div className="loadingio-spinner-spinner-vj1q9uaq4d">
                    <div className="ldio-iii820kizlm">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                    <span className="title_loading">{title}</span>
                </div>
            </div>
        </div>
    )
};

export default Loading;
