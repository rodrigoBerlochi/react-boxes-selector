import {TabStyles} from '@tabloids/widgets';
import styled from 'styled-components';

export const Tag = styled.li`{
    background: ${TabStyles.Colors.F2_5};
    &:hover {
        background: ${TabStyles.Colors.F5}
    }
}`;

export const getStyles = () => {
    const basicStyles = {
        tags: {
            listStyle: 'none',
            paddingLeft: 0,
            margin: 0,
            display: 'inline',
            fontSize: TabStyles.Typography.Sizing.Default,
            fontFamily: TabStyles.Typography.FontFamily
        },
        tag: {
            float: 'left',
            paddingTop: 6,
            marginRight: 2,
            marginBottom: 2,
            paddingLeft: 6,
            borderRadius: 2,
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
