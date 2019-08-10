import styled from 'styled-components';
import { Semantics, Basics } from '../theme.styles';

export const Box = styled.li`{
    background: ${Semantics.Elements.SolidBackground};
    &:hover {
        background: ${Semantics.Elements.SolidBackgroundHover}
    }
}`;

export const getStyles = () => {
    const basicStyles = {
        List: {
            listStyle: 'none',
            paddingLeft: 0,
            margin: 0,
            display: 'inline',
            fontSize: Semantics.Fonts.Size.Main,
            fontFamily: Basics.Typography.Family,
        },
        Box: {
            float: 'left',
            paddingTop: 6,
            marginRight: 2,
            marginBottom: 2,
            paddingLeft: 6,
            borderRadius: Semantics.Elements.BorderRadius,
            height: 18,
            cursor: 'pointer',
            paddingRight: 2
        }
    };

    return {
        ...basicStyles
        //, ...basicStyles.prop1, newprop: val (usage example to extend a basic rule)
    };
};
