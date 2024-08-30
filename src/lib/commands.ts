export type CommandParams = {
    name: string,
    description: string,
    flagNotFound: (command: CommandParams, givenFlag: string) => string,
    argNotFound: (command: CommandParams, givenArg: string) => string,
    flags?: {
        [key: string]: (command: CommandParams) => string
    },
    args?: {
        [key: string]: (command: CommandParams) => string
    }
}

let testCommand: CommandParams = {
    name: "theme",
    description: `The <span style="color:var(--blue-color);">theme</span> command lets you choose a theme.<br>For example: <span style="color:var(--blue-color);">'theme doughnut'</span> lets you choose the doughnut theme.<br>To see all themes use this command: <span style="color:var(--blue-color);">'theme --list'</span>`,
    flagNotFound: (_command, givenFlag) => {
        return `<span style="color:var(--blue-color);">--${givenFlag}</span> is not a valid flag. Type <span style="color:var(--blue-color);">'theme --help'</span> for help.`
    },
    argNotFound: (_command, givenArg) => {
        return `<span style="color:var(--blue-color);">${givenArg}</span> is not a valid argument. Type <span style="color:var(--blue-color);">'theme --help'</span> for help.`
    },
    flags: {
        help: (command) => {
            return command.description;
        },
        list: () => {
            return `To select a theme, do something like this: <span style="color:var(--blue-color);">'theme red'</span>.<br>Themes:<br><span style="color:var(--brightMagenta-color);">doughnut</span><br><span style="color:var(--red-color);">red</span><br><span style="color:var(--brightBlack-color);">dark</span>`
        }
    },
    args: {
        red: () => "red theme",
        dark: () => "dark theme",
        doughnut: () => "doughnut theme",
    }
}

export let defaultCommands: {[key: string]: CommandParams} = {
    theme: testCommand
}