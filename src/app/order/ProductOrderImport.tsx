import React, { useRef, useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import FileUploader from "devextreme-react/file-uploader";
import { Button as Button1 } from "devextreme-react/button";
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
import { PLANNING_API_URL, SCADA_URL } from "../../config";

const ROUTING_PATH = "/productOrder";

const fileExtensions = [".xls", ".xlsx"];

const ProductOrderImport = observer(() => {
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
        axios.post(PLANNING_API_URL + "/services/api/order/import/write", data, { headers }).then((response) => {
            if (response.status === 200 && response.data === "SUCCESS") {
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
                <h3>Import Đơn Hàng</h3>
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
                        <a href='/PO_template.xlsx' className='note'>
                            Tải template
                        </a>
                        <Button1 className='button-upload' icon='exportxlsx' text='Import Order' type='success' onClick={onClick} />
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

export default ProductOrderImport;

registerScreen({
    component: ProductOrderImport,
    caption: "screen.ProductOrder",
    screenId: "screen.ProductOrder",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
