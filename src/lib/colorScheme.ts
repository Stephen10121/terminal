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

export const defaultTheme: TerminalTheme = {
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
}