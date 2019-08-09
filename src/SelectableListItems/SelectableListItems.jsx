import React from 'react';
import { func, number, arrayOf, shape, string } from 'prop-types';
import { getStyles, WithHover } from './styles';

// TODO fix this
const styles = getStyles();

export const SelectableListItems = ({ items, cursor, handleItemClick, noMoreOptionsMessage }) => {
    if (items.length === 0) {
        return (<ul style={styles.container}><li styles={styles.msgOption}>{noMoreOptionsMessage}</li></ul>);
    }
    return (
        <ul style={styles.container}>
            {items.map((item, idx, arr) => {
                // add hover when list is reduced to only 1 option or arrow nav is over current item
                return (
                    <li
                        style={(arr.length === 1) || (cursor !== 0 && ++idx === cursor) ? styles.optHover : null}
                        key={item.value}
                        onClick={(event) => {
                            handleItemClick(event);
                        }}
                    >
                        <WithHover>{item.displayValue}</WithHover>
                    </li>);
            })}
        </ul>
    );
};

// TODO extract arrayOf object ot ext module
SelectableListItems.propTypes = {
    handleItemClick: func.isRequired,
    cursor: number.isRequired,
    items: arrayOf(shape({
        displayValue: string,
        value: string
    })).isRequired,
    noMoreOptionsMessage: string
};
