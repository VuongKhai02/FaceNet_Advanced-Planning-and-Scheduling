import React, { FC } from 'react';
import { Tooltip } from 'antd';

interface SvgIconProps {
    icon: string;
    solid?: boolean;
    fill?: string;
    stroke?: string;
    onClick?: () => void;
    text?: string;
    textColor?: string;
    sizeIcon?: number;
    style?: React.CSSProperties;
    textSize?: number;
    tooltipTitle?: string;
}

const SvgIcon: FC<SvgIconProps> = ({
    icon,
    solid = false,
    fill = '',
    stroke = '',
    onClick,
    text,
    textColor = 'black',
    sizeIcon = 24,
    style = {},
    textSize = 14,
    tooltipTitle = '',
}) => {
    const iconElement = (
        <img src={icon} alt="SVG Icon" style={{ fill, stroke, width: sizeIcon, height: sizeIcon }} />
    );

    return (
        <Tooltip
            title={tooltipTitle}
            placement="top"
            overlayClassName='custom-tooltip'
            // color='#FF7A00'
            overlayStyle={{ color: 'blue' }}>
            <div
                onClick={onClick}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ...style }}
            >
                {iconElement}
                {text && (
                    <span style={{ marginLeft: '8px', color: textColor, fontSize: textSize }}>
                        {text}
                    </span>
                )}
            </div>
        </Tooltip>
    );
};

export default SvgIcon;
