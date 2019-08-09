import React from 'react';
import { string, number, bool } from 'prop-types';

export const EllipseText = ({ children, length, tail, shouldShowTooltip }) => {
    let text = '';

    if (children.length <= length) {
        text = children;
    } else {
        text = children.substring(0, (length - tail.length));
        text += tail;
    }

    return (
        <span title={text.endsWith(tail) ? children : null}>{text}</span>
    );
};

EllipseText.propTypes = {
    children: string.isRequired,
    length: number.isRequired,
    tail: string,
    shouldShowTooltip: bool
};

EllipseText.defaultProps = {
    tail: '...',
    shouldShowTooltip: true
};
