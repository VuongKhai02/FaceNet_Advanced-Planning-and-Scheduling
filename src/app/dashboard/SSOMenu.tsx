import React from "react";
import { Button } from "devextreme-react/button";
import "./style.css";
import { Image } from "antd";
import { PLANNING_API_URL } from "../../config";

class SSOMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    weatherClick() {
        window.open(PLANNING_API_URL, "");
    }

    doneClick() {}

    sendClick() {}

    plusClick() {}

    backClick() {}

    render() {
        const currentURL = window.location.href; // returns the absolute URL of a page

        const pathname = window.location.pathname;
        return (
            <div>
                <div className='dx-fieldset'>
                    <div className='fields-container'>
                        <div className='dx-field'>
                            <div className='dx-field-value'>
                                <Image width={200} preview={false} src='image/planning.jpg' onClick={this.weatherClick} />
                            </div>
                            <div className='dx-field-label'>PLANNING</div>
                        </div>
                        <div className='dx-field'>
                            <div className='dx-field-value'>
                                <Image width={200} preview={false} src='image/qms.png' onClick={this.weatherClick} />
                            </div>
                            <div className='dx-field-label'>QMS</div>
                        </div>
                        <div className='dx-field'>
                            <div className='dx-field-value'>
                                <Image width={200} preview={false} src='image/scada.jpg' onClick={this.weatherClick} />
                            </div>
                            <div className='dx-field-label'>SCADA</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SSOMenu;
