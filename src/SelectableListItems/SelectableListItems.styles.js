import styled from 'styled-components';
import { Semantics, Basics } from '../theme.styles';

export const WithHover = styled.div`
    padding: 3px;
    cursor: pointer;
    &:hover {
        background: ${Semantics.Elements.SolidBackgroundHover};
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
