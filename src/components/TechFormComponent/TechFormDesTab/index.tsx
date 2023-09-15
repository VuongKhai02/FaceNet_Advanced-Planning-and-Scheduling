import { TabPanel } from "devextreme-react";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./TechFormDesTab.module.css"
import './root.css'

const cx = classNames.bind(styles);

function TechFormDesTab({data, component}) {

    const [myState, setMyState] = useState({
        animationEnabled: true,
        swipeEnabled: true,
        loop: true,
        selectedIndex: 0,
    })

    console.log(data)
    const onSelectionChanged = (e) => {
        if (e.name === 'selectedIndex') {
            setMyState({
                ...myState,
                selectedIndex: e.value
            })
          }
    }

    const itemTitleRender = (e) => {
        return <span className={cx('tab-name')}>{e.cardName}</span>
    }
    return ( <TabPanel
        dataSource={data}
        selectedIndex={myState.selectedIndex}
        onOptionChanged={onSelectionChanged}
        loop={myState.loop}
        itemTitleRender={itemTitleRender}
        itemComponent={component}
        animationEnabled={myState.animationEnabled}
        swipeEnabled={myState.swipeEnabled}
    /> );
}

export default TechFormDesTab;