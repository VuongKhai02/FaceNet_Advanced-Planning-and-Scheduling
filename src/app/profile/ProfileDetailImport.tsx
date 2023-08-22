import React, { useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import FileUploader from "devextreme-react/file-uploader";
import Button1 from "devextreme-react/button";
import notify from "devextreme/ui/notify";
import { useMainStore } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import axios from "axios";
import { PLANNING_API_URL } from "../../config";

const ROUTING_PATH = "/profileDetailImport";

const fileExtensions = ["csv", ".xls", ".xlsx"];

const ProfileDetailImport = observer(() => {
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
        axios.post(PLANNING_API_URL + "/services/api/profile-detail/import", data, { headers }).then((response) => {
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
                <h3>Import Profile Detail</h3>
                <div className='widget-container'>
                    <div className='fileuploader-container'>
                        <FileUploader uploadFile={onload} ref={(ref) => (fileUpload = ref)} allowedFileExtensions={fileExtensions} />
                        <span className='note'>
                            {"Allowed file extensions: "}
                            <span>.xls, .xlsx</span>
                        </span>
                        <a href='/Profile_Detail.xlsx' className='note'>
                            Tải ProfileDetail Template
                        </a>
                        <Button1 className='button-upload' icon='exportxlsx' text='Import ProfileDetail' type='default' onClick={onClick} />
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

export default ProfileDetailImport;

registerScreen({
    component: ProfileDetailImport,
    caption: "4. ProfileDetailImport",
    screenId: "ProfileDetailImport",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
