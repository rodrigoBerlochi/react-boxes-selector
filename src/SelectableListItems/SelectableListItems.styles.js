import styled from 'styled-components';
import { Semantics, Basics } from '../theme.styles';

export const WithHover = styled.div`
    padding: 3px;
    cursor: pointer;
    &:hover {
        background-color: ${Semantics.Elements.SolidBackgroundHover};
        color: ${Basics.Colors.White};
    }
`;

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
        }
    };

    return {
        ...basicStyles
        //, ...basicStyles.prop1, newprop
    };
};
