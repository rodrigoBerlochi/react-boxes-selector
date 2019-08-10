import React from 'react';
import { string, number, bool } from 'prop-types';

export const EllipseText = ({ 
    children, 
    length, 
    tail, 
}) => {
    let text = '';

    if (children.length <= length) {
        text = children;
    } else {
        text = `${children.substring(0, (length - tail.length))}${tail}`;
    }

    return (
        <span 
            title={text.endsWith(tail) ? children : null}>
                {text}
        </span>
    );
};

EllipseText.propTypes = {
    children: string.isRequired,
    length: number.isRequired,
    tail: string,
};

EllipseText.defaultProps = {
    tail: '...',
};
