import React from 'react';
import { func, arrayOf, shape, string, number } from 'prop-types';
import { getStyles, Tag } from './styles';
import { CloseIcon } from '../CloseIcon/CloseIcon';
import { EllipseText } from '../EllipseText/EllipseText';

const styles = getStyles();

export const BoxList = ({ items, handleTagClick, maxWordLength }) => {
    return (
        <ul className="wdc-tag-list" style={styles.tags}>
            {items.map((item) => {
                return (
                    <Tag style={styles.tag} key={item.value}>
                        <EllipseText length={maxWordLength}>{item.displayValue}</EllipseText>
                        <CloseIcon id={item.displayValue} handleClick={handleTagClick}
                        />
                    </Tag>);
            })}
        </ul>
    );
};

BoxList.propTypes = {
    items: arrayOf(shape({
        displayValue: string,
        value: string
    })).isRequired,
    handleTagClick: func.isRequired,
    maxWordLength: number
};

BoxList.defaultProps = {
    maxWordLength: 12
};
