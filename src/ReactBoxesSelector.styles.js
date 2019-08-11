import styled from 'styled-components';
import { Semantics, Basics } from './theme.styles';

export const CompoundedInput = styled.div`{
    outline-color: ${Semantics.Elements.BorderColor};
    background-color: ${Basics.Colors.White};
    &:not([disabled]):hover{
        outline-color: ${Semantics.Elements.EnabledBorderColor};
    }
    &[disabled]{
        outline-color: ${Semantics.Elements.DisabledBorderColor};
    }
}`;

export const getStyles = () => {
    const basicStyles = {
        widget: {
            position: 'relative',
            fontSize: Semantics.Fonts.Size.Main,
            fontFamily: Basics.Typography.Family,
            color: Semantics.Fonts.Colors.Main,
            width: '100%'
        },
        compoundedInput: {
            outlineWidth: Semantics.Elements.StrokeSize,
            outlineStyle: Semantics.Elements.StrokeStyle,
            width: '100%',
            borderRadius: Semantics.Elements.BorderRadius,
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
            fontSize: Semantics.Fonts.Size.Main,
            fontFamily: Basics.Typography.Family,
            height: 24
        },
        bgWhite: {
            background: Basics.Colors.White,
        }
    };

    return {
        ...basicStyles
        //, ...basicStyles.prop1, newprop: val (usage example to extend a basic rule)
    };
};
