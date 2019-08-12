import React from 'react';
import { func, arrayOf, shape, string, number } from 'prop-types';
import { getStyles, Box } from './BoxList.styles';
import { CloseIcon } from '../CloseIcon/CloseIcon.jsx';
import { EllipseText } from '../EllipseText/EllipseText.jsx';

const styles = getStyles();

const BoxList = ({ 
    items, 
    handleTagClick, 
    maxWordLength 
}) => (
        <ul data-name="BoxList" style={styles.List} data-testid="selected-items">
            {items.map((item) => {
                return (
                    <Box 
                        style={styles.Box} 
                        key={item.value}
                        data-testid="selected-item"
                    >
                        <EllipseText 
                            length={maxWordLength}>
                                {item.displayValue}
                        </EllipseText>
                        <CloseIcon 
                            id={item.displayValue} 
                            handleClick={handleTagClick}
                        />
                    </Box>
                );
            })}
        </ul>
);

BoxList.propTypes = {
    items: arrayOf(shape({
        displayValue: string,
        value: string
    })).isRequired,
    handleTagClick: func.isRequired,
    maxWordLength: number,
};

BoxList.defaultProps = {
    maxWordLength: 12,
};

export default React.memo(BoxList);