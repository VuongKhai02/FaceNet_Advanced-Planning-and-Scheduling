import React, { FC } from 'react';

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
}) => {
    return (
        <div
            onClick={onClick}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', ...style }}
        >
            <img src={icon} alt="SVG Icon" style={{ fill, stroke, width: sizeIcon, height: sizeIcon }} />
            {text && (
                <span style={{ marginLeft: '8px', color: textColor, fontSize: textSize }}>{text}</span>
            )}
        </div>
    );
};

export default SvgIcon;
