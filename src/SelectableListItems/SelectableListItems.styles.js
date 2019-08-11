import styled from 'styled-components';
import { Semantics, Basics } from '../theme.styles';

export const getStyles = () => {
    const basicStyles = {
        container: {
            padding: 6,
            listStyle: 'none',
            fontSize: Semantics.Fonts.Size.Main,
            fontFamily: Basics.Typography.Family,
            width: '100%',
            margin: 0,
            boxSizing: 'border-box',
        },
        optHover: {
            backgroundColor: Semantics.Elements.SolidBackgroundHover,
            color: Basics.Colors.White,
        },
        msgOption: {
            cursor: 'default',
        },
        item: {
            padding: 4,
        }
    };

    return {
        ...basicStyles
        //, ...basicStyles.prop1, newprop
    };
};
