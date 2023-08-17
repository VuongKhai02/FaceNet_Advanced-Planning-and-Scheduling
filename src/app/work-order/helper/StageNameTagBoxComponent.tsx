import React from "react";
import TagBox from "devextreme-react/tag-box";

export default class StageNameTagBoxComponent extends React.Component<{ data }> {
    constructor(props) {
        super(props);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
    }

    onValueChanged(e) {
        this.props.data.setValue(e.value);
    }

    onSelectionChanged() {
        this.props.data.component.updateDimensions();
    }

    render() {
        let data = [];
        if (this.props.data.value && !Array.isArray(this.props.data.value)) {
            data = this.props.data.value.split(",");
        }
        return (
            <TagBox
                dataSource={this.props.data.column.lookup.dataSource}
                defaultValue={data}
                valueExpr='name'
                displayExpr='description'
                showSelectionControls={true}
                maxDisplayedTags={3}
                showMultiTagOnly={false}
                applyValueMode='instantly'
                // applyValueMode="useButtons"
                searchEnabled={true}
                onValueChanged={this.onValueChanged}
                onSelectionChanged={this.onSelectionChanged}
            />
        );
    }
}
