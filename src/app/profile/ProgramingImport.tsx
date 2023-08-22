import React, { useRef, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import FileUploader from "devextreme-react/file-uploader";
import Button1 from "devextreme-react/button";
import { Button } from "antd";
import notify from "devextreme/ui/notify";
import { restServices } from "../../jmix/services";
import { jmixREST } from "../../index";
import { useMainStore } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import axios from "axios";
import { set } from "mobx";
import { collection } from "@haulmont/jmix-react-core";
import { PlanningWorkOrder } from "../../jmix/entities/PlanningWorkOrder";
import { PlanningProductionOrder } from "../../jmix/entities/PlanningProductionOrder";
import { PLANNING_API_URL } from "../../config";

const ROUTING_PATH = "/programingImport";

const fileExtensions = ["csv", ".xls", ".xlsx"];

const ProgramingImport = observer(() => {
    const mainStore = useMainStore();

    const [file, setFile] = useState("");

    const fuRef = React.createRef<FileUploader>();
    let fileUpload;
    const onClick = () => {
        if (!file) {
            notify({
                message: "File chưa được upload lên !",
                width: 450,
            });
        }
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "multipart/form-data",
        };
        const data = new FormData();
        data.append("file", file);
        // axios.post('http://192.168.68.91:3000/services/api/order/import/write', data, {headers})
        axios.post(PLANNING_API_URL + "/services/api/programing/import", data, { headers }).then((response) => {
            if (response.status === 200) {
                setFile("");
                // console.log(fileUpload)
                notify(
                    {
                        message: "Import thành công!",
                        width: 450,
                    },
                    "SUCCESS",
                    3000,
                );
            } else if (response.status === 200) {
                notify(response.data, "error", 3000);
            } else {
                notify("Import thất bại!", "error", 3000);
            }
        });
    };
    const onload = (file, callback) => {
        setFile(file);
    };

    return (
        <>
            <div>
                <h3>Import Programing</h3>
                <div className='widget-container'>
                    <div className='fileuploader-container'>
                        <FileUploader uploadFile={onload} ref={(ref) => (fileUpload = ref)} allowedFileExtensions={fileExtensions} />
                        <span className='note'>
                            {"Allowed file extensions: "}
                            <span>.xls, .xlsx</span>
                        </span>
                        <a href='/Programing_name_List.xlsx' className='note'>
                            Tải Programing Name Template
                        </a>
                        <Button1 className='button-upload' icon='exportxlsx' text='Import programing' type='default' onClick={onClick} />
                    </div>
                </div>

                {/*  gird data list of product order*/}
            </div>
        </>
    );

    function getOrderDay(rowData) {
        return new Date(rowData.OrderDate).getDay();
    }
});

export default ProgramingImport;

registerScreen({
    component: ProgramingImport,
    caption: "5. Import Programing",
    screenId: "ProgramingImport",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
