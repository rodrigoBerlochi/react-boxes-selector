import styled from 'styled-components';

export const WithHover = styled.div`
    padding: 3px;
    cursor: pointer;
    &:hover {
        background: ${''.Colors.F2_5};
    }
`;

export const getStyles = () => {
    const basicStyles = {
        container: {
            padding: 6,
            listStyle: 'none',
            fontSize: ''.Typography.Sizing.Default,
            fontFamily: ''.Typography.FontFamily,
            width: '100%',
            margin: 0,
            boxSizing: 'border-box'
        },
        optHover: {
            backgroundColor: ''.Colors.F2_5
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
