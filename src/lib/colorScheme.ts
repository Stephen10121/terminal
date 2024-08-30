export type TerminalTheme = {
    "source": string,
    "hex": {
        "background": string,
        "foreground": string,
        "text": string,
        "cursor": string,
        "black": string,
        "red": string,
        "green": string,
        "yellow": string,
        "blue": string,
        "magenta": string,
        "cyan": string,
        "white": string,
        "brightBlack": string,
        "brightRed": string,
        "brightGreen": string,
        "brightYellow": string,
        "brightBlue": string,
        "brightMagenta": string,
        "brightCyan": string,
        "brightWhite": string
    }
}

export const defaultThemes = {
    red: {
        "source": "rootloops.sh",
        "hex": {
            "background": "#331922",
            "foreground": "#f1dce2",
            "text": "#331922",
            "cursor": "#d299a9",
            "black": "#331922",
            "red": "#d87595",
            "green": "#90a254",
            "yellow": "#c88953",
            "blue": "#5ba1d0",
            "magenta": "#a586d9",
            "cyan": "#55aa9b",
            "white": "#d299a9",
            "brightBlack": "#814b5c",
            "brightRed": "#e592ab",
            "brightGreen": "#a5b966",
            "brightYellow": "#dd9f6b",
            "brightBlue": "#78b6e2",
            "brightMagenta": "#b8a0e4",
            "brightCyan": "#67c1b0",
            "brightWhite": "#f1dce2"
        }
    },
    dark: {
        "source": "rootloops.sh",
        "hex": {
            "background": "#0a0611",
            "foreground": "#f2eff8",
            "text": "#0a0611",
            "cursor": "#beb1da",
            "black": "#0a0611",
            "red": "#d97780",
            "green": "#7aa860",
            "yellow": "#bc904f",
            "blue": "#6b9bd9",
            "magenta": "#b77ed1",
            "cyan": "#52a9a9",
            "white": "#beb1da",
            "brightBlack": "#584875",
            "brightRed": "#e6949a",
            "brightGreen": "#8ebf73",
            "brightYellow": "#d3a563",
            "brightBlue": "#88b1e5",
            "brightMagenta": "#c899de",
            "brightCyan": "#63c0bf",
            "brightWhite": "#f2eff8"
        }
    },
    doughnut: {
        "source": "rootloops.sh",
        "hex": {
            "background": "#f3eefd",
            "foreground": "#0d021c",
            "text": "#f3eefd",
            "cursor": "#642ca4",
            "black": "#f3eefd",
            "red": "#f58993",
            "green": "#7fc453",
            "yellow": "#dfa13e",
            "blue": "#7cb1f5",
            "magenta": "#d18fef",
            "cyan": "#3dc4c4",
            "white": "#642ca4",
            "brightBlack": "#c4a8f7",
            "brightRed": "#f9acb1",
            "brightGreen": "#90dc61",
            "brightYellow": "#f3b862",
            "brightBlue": "#a1c7f8",
            "brightMagenta": "#deaff4",
            "brightCyan": "#4fdcdc",
            "brightWhite": "#0d021c"
        }
    }
}