import { Semantics, Basics } from '../theme.styles';

const {
    Elements,
} =  Semantics;

export const getStyles = () => {
    const basicStyles = {
        isOpen: {
            display: 'block'
        },
        isClosed: {
            display: 'none'
        },
        container: {
            outline: `${Elements.StrokeSize} ${Elements.StrokeStyle} ${Elements.BorderColor}`,
            backgroundColor: Basics.Colors.White,
            position: 'absolute',
            marginTop: 0,
            width: '100%',
            boxSizing: 'border-box',
            zIndex: 1000,
            WebkitBoxShadow: Basics.Shadow, 
            boxShadow: Basics.Shadow,
        }
    };

    return {
        ...basicStyles
        //, ...basicStyles.prop1, newprop
    };
};
