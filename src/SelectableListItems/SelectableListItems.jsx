import React, { useCallback } from 'react';
import { func, number, arrayOf, shape, string } from 'prop-types';
import { getStyles } from './SelectableListItems.styles';
import { Scrollbars } from 'react-custom-scrollbars';


const styles = getStyles();

export const SelectableListItems = ({ 
    items, 
    cursor, 
    handleItemClick, 
    noMoreOptionsMessage,
    switchToMouseNavigation,
}) => {
    if (items.length === 0) {
        return (<ul style={styles.container}><li styles={styles.msgOption}>{noMoreOptionsMessage}</li></ul>);
    }

    // to offer a fluid navigation between arrow keys and mouse hovering, current-hovered item
    // is based on the cursor position state prop, instead of DOM hovering event
    const setHoveredItem = useCallback((e) => {
        const pos = parseInt(e.currentTarget.dataset.position);
        switchToMouseNavigation(pos === 0 ? 1 : pos);
    }, [switchToMouseNavigation]);

    return (
            <ul style={styles.container}>
                <Scrollbars
                    style={{ width: '100%'}} 
                    autoHeight 
                    autoHide
                >
                    {items.map((item, idx, arr) => {
                        // add hover when list is reduced to only 1 option or arrow nav is over current item
                        return (
                            <li
                                style={(arr.length === 1) || (cursor !== 0 && ++idx === cursor) ? styles.optHover : null}
                                key={item.value}
                                onClick={(event) => {
                                    handleItemClick(event);
                                }}
                                onMouseOver={setHoveredItem}
                                data-position={idx}
                            >
                                <div style={styles.item}>{item.displayValue}</div>
                            </li>);
                    })}
                </Scrollbars>
            </ul>
        
    );
};

SelectableListItems.propTypes = {
    handleItemClick: func.isRequired,
    cursor: number.isRequired,
    items: arrayOf(shape({
        displayValue: string,
        value: string
    })).isRequired,
    noMoreOptionsMessage: string,
    switchToMouseNavigation: func.isRequired,
};
