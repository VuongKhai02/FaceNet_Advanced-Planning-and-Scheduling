import React, { useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import FileUploader from "devextreme-react/file-uploader";
import Button1 from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import { useMainStore } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { PLANNING_API_URL } from "../../config";

const ROUTING_PATH = "/feederImport";

const fileExtensions = ["csv", ".xls", ".xlsx"];

const FeederImport = observer(() => {
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
        axios
            .post(PLANNING_API_URL + "/services/api/feeder/import", data, { headers })
            .then((response: AxiosResponse) => {
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
            })
            .catch((error: AxiosError) => {
                console.log(error.response?.data);
                notify(error.response?.data, "error", 3000);
            });
    };
    const onload = (file, callback) => {
        setFile(file);
    };

    return (
        <>
            <div>
                <h3>Import Feeder</h3>
                <div className='widget-container'>
                    <div className='fileuploader-container'>
                        <FileUploader uploadFile={onload} ref={(ref) => (fileUpload = ref)} allowedFileExtensions={fileExtensions} />
                        <span className='note'>
                            {"Allowed file extensions: "}
                            <span>.xls, .xlsx</span>
                        </span>
                        <a href='/List_Feeder.xlsx' className='note'>
                            Tải Feeder Template
                        </a>
                        <Button1 className='button-upload' icon='exportxlsx' text='Import feeder' type='default' onClick={onClick} />
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

export default FeederImport;

registerScreen({
    component: FeederImport,
    caption: "1. Import Feeder",
    screenId: "FeederImport",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
