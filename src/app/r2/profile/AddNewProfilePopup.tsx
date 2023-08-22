import { Popup } from "devextreme-react";
import Form from "devextreme/ui/form";

function AddNewProfilePopup() {
    return (
        <Popup
            title='Thêm mới Profile'
            showTitle={true}
            width={700}
            height={525}
            position={{
                my: "top",
                at: "top",
                of: window,
            }}>
            <div className='popup-content'>Hello World</div>
        </Popup>
    );
}

export default AddNewProfilePopup;
