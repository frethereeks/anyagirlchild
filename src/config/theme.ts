import { ThemeConfig } from "antd";

export const THEME_COLOR = {
    primary: "#0d182d",
    accentColor: "#64748b",
    "light-primary": "#16a39435",
    "lighter-primary": "#16a39415",
    secondary: "#16a394",
    "light-secondary": "#ffe8ca",
    background: "#f2f2f2",
    "light-grey": "#e5e6eb",
    danger: "#f34f7c",
    text: "#64748b",
}

export const fontFamily = {
    grotesk: "var(--grotesk)",
    poppins: "var(--poppins)",
}

export const appThemeConfig: ThemeConfig = {
    cssVar: true,
    token: {
        fontFamily: fontFamily.grotesk,
        colorPrimary: THEME_COLOR.primary,
        colorLinkHover: "inherit",
        colorLink: THEME_COLOR.accentColor,
        fontSize: 16
    },
    components: {
        Layout: {
            bodyBg: THEME_COLOR.background,
            siderBg: THEME_COLOR.text,
            headerBg: THEME_COLOR["light-secondary"],
            screenXS: 200,
            fontFamily: fontFamily.poppins,
            fontSize: 12,
        },
        Table: {
            // headerBg: THEME_COLOR["light-primary"],
            headerColor: THEME_COLOR.text,
            rowHoverBg: THEME_COLOR["background"],
            rowSelectedBg: THEME_COLOR["background"],
            rowSelectedHoverBg: THEME_COLOR["background"],
            fontFamily: "arial",
            fontSize: 14,
            cellPaddingInline: 15,
            cellPaddingBlock: 0,
            paddingContentHorizontal: 10,
            padding: 0
        },
        Button: {
            primaryColor: THEME_COLOR.background,
            colorPrimaryBg: THEME_COLOR.primary
        },
        Dropdown: {
            zIndexPopup: 800,
        },
        Input: {
            colorBgContainer: THEME_COLOR.background,
            hoverBorderColor: THEME_COLOR["light-primary"],
            controlOutline: "transparent",
            controlOutlineWidth: 0,
            colorText: THEME_COLOR.text,
            controlInteractiveSize: 10,
        },
        InputNumber: {
            colorBgContainer: THEME_COLOR.background,
        },
        Select: {
            colorBgContainer: '#fff',
            colorBgTextHover: '#fff',
            colorText: THEME_COLOR.text,
            zIndexPopup: 810,
            optionSelectedBg: "#fff",
            optionSelectedColor: THEME_COLOR.text
        },
        Tooltip: {
            zIndexPopupBase: 850,
            zIndexPopup: 860,
            zIndexBase: 870,
        }
    },

}