import { Semantics, Basics } from '../theme.styles';

const {
    Elements,
    Fonts,
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
            maxHeight: (Fonts.Size.Main * 16),
            overflowY: 'auto',
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
