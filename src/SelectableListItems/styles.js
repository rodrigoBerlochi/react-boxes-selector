import {TabStyles} from '@tabloids/widgets';
import styled from 'styled-components';

export const WithHover = styled.div`
    padding: 3px;
    cursor: pointer;
    &:hover {
        background: ${TabStyles.Colors.F2_5};
    }
`;

export const getStyles = () => {
    const basicStyles = {
        container: {
            padding: 6,
            listStyle: 'none',
            fontSize: TabStyles.Typography.Sizing.Default,
            fontFamily: TabStyles.Typography.FontFamily,
            width: '100%',
            margin: 0,
            boxSizing: 'border-box'
        },
        optHover: {
            backgroundColor: TabStyles.Colors.F2_5
        },
        msgOption: {
            cursor: 'default'
        }
    };

    return {
        ...basicStyles
        //, ...basicStyles.prop1, newprop
    };
};
