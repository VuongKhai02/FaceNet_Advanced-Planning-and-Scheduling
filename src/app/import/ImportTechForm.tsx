import React, { useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import FileUploader from 'devextreme-react/file-uploader';
import Button1 from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import { useMainStore } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import axios from 'axios';
import { PLANNING_API_URL } from "../../config";

const fileExtensions = ['.csv', '.xls', '.xlsx'];

export const ImportTechForm = (props) => {

  const mainStore = useMainStore();

  const [file, setFile] = useState('');

  const fuRef = React.createRef<FileUploader>();
  let fileUpload;
  const onClick = () => {

    if (!file) {
      notify({
        message: 'File chưa được upload lên !',
        width: 450
      })
    }
    const headers = {
      'Authorization': 'Bearer ' + mainStore.authToken,
      'content-type': 'multipart/form-data'
    };
    const data = new FormData();
    data.append('file', file);
    // axios.post('http://192.168.68.91:3000/services/api/order/import/write', data, {headers})
    axios.post(PLANNING_API_URL + '/services/api/part-number/import', data, { headers })
      .then(response => {
        if (response.status === 200) {
          setFile('')
          // console.log(fileUpload)
          notify({
            message: 'Import thành công!',
            width: 450
          }, 'SUCCESS', 3000);
        } else if (response.status === 200) {
          notify(response.data, 'error', 3000);
        } else {
          notify('Import thất bại!', 'error', 3000);
        }
      }).catch(err => {
        notify(err.response.data.message, 'error', 3000);
      });
  }
  const onload = (file, callback) => {
    setFile(file);
  }


  return <div>
    {/* <h3>Import phiếu công nghệ</h3> */}
    <div className="widget-container">
      <div className="fileuploader-container">
        <FileUploader uploadFile={onload} ref={(ref) => fileUpload = ref}
          allowedFileExtensions={fileExtensions} />
        <span className="note">{'Chỉ cho phép file dạng và dung lượng không quá 1Mb:'}
          <span> .xls, .xlsx</span>
          <Button1 className="button-upload" icon="exportxlsx" text="Import" type="default"
            onClick={onClick} style={{ marginLeft: 900, marginBottom: 20 }} />
        </span>
        {/* <a href='/List_PartNumber.csv' className="note">Tải xuống file mẫu</a> */}
      </div>
    </div>
  </div>
}
