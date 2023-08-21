import React, { useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import FileUploader from "devextreme-react/file-uploader";
import Button1 from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import { useMainStore } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import axios from "axios";
import { LoadPanel } from "devextreme-react/load-panel";
import { PLANNING_API_URL } from "../../config";

const ROUTING_PATH = "/programingDetailImport";

const fileExtensions = ["csv", ".xls", ".xlsx"];

const ProgramingDetailImport = observer(() => {
    const mainStore = useMainStore();

    const [loadPanelVisible, setLoadPanelVisible] = useState(false);

    const [file, setFile] = useState("");

    const fuRef = React.createRef<FileUploader>();
    let fileUpload;
    const onClick = () => {
        if (!file) {
            notify({
                message: "File chưa được upload lên !",
                width: 450,
            });
            return;
        }

        setLoadPanelVisible(true);
        const headers = {
            Authorization: "Bearer " + mainStore.authToken,
            "content-type": "multipart/form-data",
        };
        const data = new FormData();
        data.append("file", file);
        // axios.post('http://192.168.68.91:3000/services/api/order/import/write', data, {headers})
        axios
            .post(PLANNING_API_URL + "/services/api/programing-detail/import", data, { headers })
            .then((response) => {
                setLoadPanelVisible(false);
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
                    notify(response.data, "error", 10000);
                }
            })
            .catch((err) => {
                setLoadPanelVisible(false);
                notify(err.response.data.message, "error", 10000);
            });
    };
    const onload = (file, callback) => {
        setFile(file);
    };

    const hideLoadPanel = () => {
        setLoadPanelVisible(false);
    };

    return (
        <>
            <div id='importDiv'>
                <h3>Programing Detail Import</h3>
                <div className='widget-container'>
                    <div className='fileuploader-container'>
                        <FileUploader
                            uploadFile={onload}
                            ref={(ref) => (fileUpload = ref)}
                            allowedFileExtensions={fileExtensions}></FileUploader>
                        <span className='note'>
                            {"Allowed file extensions: "}
                            <span>.xls, .xlsx</span>
                        </span>
                        <a href='/programing-detail.xlsx' className='note'>
                            Tải Programing Detail Template
                        </a>
                        <Button1
                            className='button-upload'
                            icon='exportxlsx'
                            text='Import chi tiết programing'
                            type='default'
                            onClick={onClick}
                        />
                    </div>
                </div>

                {/*  gird data list of product order*/}
            </div>
            <LoadPanel
                shadingColor='rgba(0,0,0,0.4)'
                position={"center"}
                onHiding={hideLoadPanel}
                visible={loadPanelVisible}
                showIndicator={true}
                shading={true}
                showPane={true}
                closeOnOutsideClick={true}
                message='Đang tải...'
            />
        </>
    );

    function getOrderDay(rowData) {
        return new Date(rowData.OrderDate).getDay();
    }
});

export default ProgramingDetailImport;

registerScreen({
    component: ProgramingDetailImport,
    caption: "6. ProgramingDetailImport",
    screenId: "ProgramingDetailImport",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
