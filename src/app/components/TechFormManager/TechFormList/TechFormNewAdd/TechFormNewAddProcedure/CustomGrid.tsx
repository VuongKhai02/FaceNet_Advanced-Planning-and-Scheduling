import DataGrid, { Column } from "devextreme-react/data-grid";
const CustomGrid = ({ dataSource }) => {
    const cellTemplate = (data) => {
        return (
            <div className='custom-cell'>
                <div className='row'>
                    <div className='cell-value'>{data.value}</div>
                </div>
                <div className='row'>
                    <div className='cell-value'>{data.value}</div>
                </div>
            </div>
        );
    };

    return (
        <DataGrid dataSource={dataSource}>
            <Column dataField='Id' caption='Your Column' cellTemplate={cellTemplate} />
        </DataGrid>
    );
};

export default CustomGrid;
