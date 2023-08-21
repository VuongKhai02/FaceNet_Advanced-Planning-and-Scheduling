/* eslint react/jsx-no-bind: off */
import React, { useState } from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";
import { Button } from "devextreme-react/button";
import { Sortable } from "devextreme-react/sortable";
import TabPanel from "devextreme-react/tab-panel";
import "devextreme/data/odata/store";

import service from "./data.js";
import EmployeeTemplate from "./EmployeeTemplate.js";
import { SelectBox } from "devextreme-react";
import { str } from "../../../utils/utils";

const allEmployees = service.getEmployees();

const ROUTING_PATH = "/test";
//
const Test = observer(() => {
    const [employees, setEmployees] = React.useState<
        {
            ID: number;
            FirstName: string;
            LastName: string;
            Prefix: string;
            Position: string;
            Picture: string;
            BirthDate: string;
            HireDate: string;
            Notes: string;
            Address: string;
            State: string;
            City: string;
        }[]
    >(allEmployees.slice(0, 3));
    const [selectedItem, setSelectedItem] = React.useState(allEmployees[0]);

    function addButtonHandler() {
        const newItem = allEmployees.filter((employee) => employees.indexOf(employee) === -1)[0];

        setEmployees([...employees, newItem]);
        setSelectedItem(newItem);
    }

    function disableButton() {
        return employees.length === allEmployees.length;
    }

    function closeButtonHandler(item) {
        const newEmployees = [...employees];
        const index = newEmployees.indexOf(item);

        newEmployees.splice(index, 1);
        setEmployees(newEmployees);

        if (index >= newEmployees.length && index > 0) {
            setSelectedItem(newEmployees[index - 1]);
        }
    }

    function renderTitle(data) {
        function closeHandler() {
            closeButtonHandler(data);
        }

        return (
            <React.Fragment>
                <div>
                    <span>
                        {data.FirstName} {data.LastName}
                    </span>
                    {employees.length >= 2 && <i className='dx-icon dx-icon-close' onClick={closeHandler} />}
                </div>
            </React.Fragment>
        );
    }

    function onSelectionChanged(args) {
        setSelectedItem(args.addedItems[0]);
    }

    function onTabDragStart(e) {
        e.itemData = e.fromData[e.fromIndex];
    }

    function onTabDrop(e) {
        const newEmployees = [...employees];

        newEmployees.splice(e.fromIndex, 1);
        newEmployees.splice(e.toIndex, 0, e.itemData);

        setEmployees(newEmployees);
    }

    const [value, setValue] = useState({
        ID: 1,
        FirstName: "John",
        LastName: "Heart",
        Prefix: "Mr.",
        Position: "CEO",
        Picture: "images/employees/01.png",
        BirthDate: "1964/03/16",
        HireDate: "1995/01/15",
        Notes: "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003. When not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
        Address: "351 S Hill St.",
        State: "California",
        City: "Los Angeles",
    });

    return (
        <React.Fragment>
            <SelectBox
                searchEnabled={true}
                acceptCustomValue={true}
                noDataText={"sjioduiohsdfioj"}
                dataSource={employees}
                displayExpr={"FirstName"}
                valueExpr={"ID"}
                defaultValue={value}
                value={value}
            />

            {/*<div id="container">*/}
            {/*  <Button*/}
            {/*    disabled={disableButton()}*/}
            {/*    text="Add Tab"*/}
            {/*    icon="add"*/}
            {/*    type="default"*/}
            {/*    onClick={addButtonHandler}*/}
            {/*  />*/}
            {/*</div>*/}
            {/*<Sortable*/}
            {/*  filter=".dx-tab"*/}
            {/*  data={employees}*/}
            {/*  itemOrientation="horizontal"*/}
            {/*  dragDirection="horizontal"*/}
            {/*  onDragStart={onTabDragStart}*/}
            {/*  onReorder={onTabDrop}*/}
            {/*>*/}
            {/*  <TabPanel*/}
            {/*    dataSource={employees}*/}
            {/*    height={410}*/}
            {/*    itemTitleRender={renderTitle}*/}
            {/*    deferRendering={false}*/}
            {/*    showNavButtons={true}*/}
            {/*    selectedItem={selectedItem}*/}
            {/*    repaintChangesOnly={true}*/}
            {/*    onSelectionChanged={onSelectionChanged}*/}
            {/*    itemComponent={EmployeeTemplate}*/}
            {/*  />*/}
            {/*</Sortable>*/}
        </React.Fragment>
    );
});
export default Test;

registerScreen({
    component: Test,
    caption: "Quản lý Test",
    screenId: "screen.Test",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH,
    },
});
