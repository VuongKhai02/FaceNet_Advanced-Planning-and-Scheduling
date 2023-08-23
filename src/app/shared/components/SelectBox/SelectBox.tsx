import React, { useState } from 'react';

const SelectBox = ({ dataSource, valueExpr, displayExpr, style, placeholder }) => {
    const [selectedItems, setSelectedItems] = useState<any>([]);

    const handleCheckboxChange = (id) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(id)
                ? prevSelectedItems.filter((item) => item !== id)
                : [...prevSelectedItems, id]
        );
    };

    return (
        <div style={style}>
            {dataSource.map((item) => (
                <div key={item.id}>
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                    />
                    <span>{item[displayExpr]}</span>
                </div>
            ))}
        </div>
    );
};


export default SelectBox;
