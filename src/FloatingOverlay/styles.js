import {TabStyles} from '@tabloids/widgets';

export const getStyles = () => {
    const basicStyles = {
        isOpen: {
            display: 'block'
        },
        isClosed: {
            display: 'none'
        },
        container: {
            outline: '1px solid',
            outlineColor: TabStyles.Colors.L6,
            backgroundColor: TabStyles.Colors.White,
            boxShadow: TabStyles.Shadow.High,
            position: 'absolute',
            marginTop: 0,
            width: '100%',
            maxHeight: (TabStyles.Typography.Sizing.Default * 16),
            overflowY: 'auto',
            boxSizing: 'border-box',
            zIndex: 1000
        }
    };

    return {
        ...basicStyles
        //, ...basicStyles.prop1, newprop
    };
};
