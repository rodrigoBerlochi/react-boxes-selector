import styled from 'styled-components';

export const InputX = styled.div`{
    outline-color: ${''.Colors.L6};
    &:not([disabled]):hover{
        outline-color: ${''.Colors.L8};
    }
    &[disabled]{
        outline-color: ${''.Colors.L5};
    }
}`;

export const getStyles = () => {
    const basicStyles = {
        widget: {
            position: 'relative',
            fontSize: ''.Typography.Sizing.Default,
            fontFamily: ''.Typography.FontFamily,
            color: ''.Typography.Color.Primary,
            width: '100%'
        },
        inputX: {
            outlineWidth: 1,
            outlineStyle: 'solid',
            width: '100%',
            borderRadius: 1,
            paddingRight: 6,
            paddingTop: 2,
            paddingLeft: 2,
            minHeight: 24,
            maxHeight: 56,
            boxSizing: 'border-box',
            overflow: 'hidden',
            overflowY: 'auto'
        },
        autoSize: {
            border: 'none',
            paddingLeft: 6,
            outline: 'none',
            fontSize: ''.Typography.Sizing.Default,
            fontFamily: ''.Typography.FontFamily,
            height: 24
        },
        bgWhite: {
            background: 'white'
        }
    };

    return {
        ...basicStyles
        //, ...basicStyles.prop1, newprop: val (usage example to extend a basic rule)
    };
};
