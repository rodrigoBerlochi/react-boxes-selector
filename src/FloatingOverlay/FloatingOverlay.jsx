import React from 'react';
import { bool, element, object, oneOfType, string } from 'prop-types';
import { getStyles } from './styles';

const styles = getStyles();

// todo can it be a render prop?
export const FloatingOverlay = ({shouldOpen, children, overlayRef}) => {
    const status = shouldOpen ? styles.isOpen : styles.isClosed;
    return (
        <div ref={overlayRef} className="wdc-floating-overlay" style={Object.assign({}, status, styles.container)}>
            {children}
        </div>
    );
};

FloatingOverlay.propTypes = {
    shouldOpen: bool.isRequired,
    children: oneOfType([element.isRequired, string]),
    overlayRef: object
};
