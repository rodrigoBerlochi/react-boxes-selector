export const Basics = {
    Colors: {
        Darkest: '#91b5c0',
        DarkMedium: '#97bdbd',
        Dark: '#9fcabb',
        Light: '#add7a7',
        Lightest: '#bbe594',
        Grayed: '#d9dfd4',
        White: '#ffffff',
    },
    Typography: {
        Sizing: {
            Small: 10,
            Regular: 12,
        },
        Family: 'Helvetica,Arial,sans-serif',
    },
    Spacing: {},
    Shadow: '5px 5px 12px -2px rgba(0,0,0,0.39)',
};

export const Semantics = {
    Elements: {
        EnabledBorderColor: Basics.Darkest,
        DisabledBorderColor: Basics.Grayed,
        BorderColor: Basics.Dark,
        StrokeSize: 1,
        StrokeStyle: 'solid',
        BorderRadius: 1,
        SolidBackground: Basics.DarkMedium,
        SolidBackgroundHover: Basics.Darkest,
        Transparent: 0.5,
    },
    Fonts: {
        Size: {
            Main: Basics.Typography.Sizing.Regular,
            Secondary: Basics.Typography.Sizing.Small,
        },
        Colors: {
            Main: Basics.Colors.DarkMedium,
            MainOverDark: Basics.Colors.White,
            Disabled: Basics.Colors.Disabled,
            Secondary: Basics.Colors.Light,
        }
    },
}