<script lang="ts">
    import { defaultThemes, type TerminalTheme } from "./colorScheme.js";
    import { defaultCommands } from "./commands.js";
    import FakeInput from "./FakeInput.svelte";
    import Input from "./Input.svelte";

    export let width = "100%";
    export let height = "100%";
    export let clearInputOnEnter = true;

    let terminalBox: HTMLElement;
    let commands: ({
        type: "prev-command"
        command: string,
        date: number
    } | {
        type: "response",
        response: string,
        date: number
    })[] = [];

    let theme: TerminalTheme = defaultThemes.dark;

    function updateScroll(){
        terminalBox.scrollTop = terminalBox.scrollHeight;
    }

    function enterIsPressed(command: string) {
        if (command === "clear" || command === "cls") {
            commands = [];
        } else {
            commands = [...commands, {
                type: "prev-command",
                command,
                date: Date.now()
            }];
            const splitCommand = command.split(" ");
            
            for (let i=0;i<splitCommand.length;i++) {
                if (splitCommand[i].substring(0,2) === "--") {
                    const givenFlags = defaultCommands[splitCommand[0]].flags;
                    let testedFlag = splitCommand[i].substring(2);
                    if (givenFlags) {
                        if (Object.keys(givenFlags).includes(testedFlag)) {
                            commands = [...commands, {
                                type: "response",
                                //@ts-ignore
                                response: givenFlags[testedFlag](defaultCommands[splitCommand[0]]),
                                date: Date.now()
                            }];
                        } else {
                            commands = [...commands, {
                                type: "response",
                                response: defaultCommands[splitCommand[0]].flagNotFound(defaultCommands[splitCommand[0]], testedFlag),
                                date: Date.now()
                            }];
                        }
                        return
                    } else {
                        break
                    }
                }
            }
            
            for (let i=1;i<splitCommand.length;i++) {
                if (splitCommand[i].substring(0,2) !== "--") {
                    const givenArguments = defaultCommands[splitCommand[0]].args;
                    let testedArgument = splitCommand[i];
                    if (givenArguments) {
                        if (Object.keys(givenArguments).includes(testedArgument)) {
                            commands = [...commands, {
                                type: "response",
                                //@ts-ignore
                                response: givenArguments[testedArgument](defaultCommands[splitCommand[0]]),
                                date: Date.now()
                            }];
                        } else {
                            commands = [...commands, {
                                type: "response",
                                response: defaultCommands[splitCommand[0]].argNotFound(defaultCommands[splitCommand[0]], testedArgument),
                                date: Date.now()
                            }];
                        }
                        return
                    } else {
                        break
                    }
                }
            }
        }
    }
</script>

<section
    class="terminal"
    bind:this={terminalBox}
    id="terminal"
    style="
        --terminal-width: {width};
        --terminal-height: {height};
        --background-color: {theme.hex.background};
        --caret-color: {theme.hex.cursor};
        --foreground-color: {theme.hex.foreground};
        --text-color: {theme.hex.text};
        --black-color: {theme.hex.black};
        --red-color: {theme.hex.red};
        --green-color: {theme.hex.green};
        --yellow-color: {theme.hex.yellow};
        --blue-color: {theme.hex.blue};
        --magenta-color: {theme.hex.magenta};
        --cyan-color: {theme.hex.cyan};
        --white-color: {theme.hex.white};
        --brightBlack-color: {theme.hex.brightBlack};
        --brightRed-color: {theme.hex.brightRed};
        --brightGreen-color: {theme.hex.brightGreen};
        --brightYellow-color: {theme.hex.brightYellow};
        --brightBlue-color: {theme.hex.brightBlue};
        --brightMagenta-color: {theme.hex.brightMagenta};
        --brightCyan-color: {theme.hex.brightCyan};
        --brightWhite-color: {theme.hex.brightWhite};
    "
>
    <div>
        {#each commands as aCommand (aCommand.type + aCommand.date.toString())}
            {#if aCommand.type === "prev-command"}
                <FakeInput command={aCommand.command} />
            {:else if aCommand.type === "response"}
                <p style="color:var(--brightWhite-color);">{@html aCommand.response}</p>
            {/if}
        {/each}
    </div>
    <Input clearOnEnter={clearInputOnEnter} on:enter={(e) => {
        enterIsPressed(e.detail);
        setTimeout(updateScroll, 1);
    }} />
</section>

<style>
    #terminal,
    :global(#terminal *)
    {
        box-sizing: border-box;
    }

    p {
        font-family: monospace;
        font-size: 0.9rem;
        display: block;
        color: var(--brightWhite-color);
        max-width: 100%;
        min-width: 1px;
        min-height: 17px;
    }

    .terminal {
        background-color: var(--background-color);
        width: var(--terminal-width);
        max-width: var(--terminal-width);
        height: var(--terminal-height);
        max-height: var(--terminal-height);
        padding: 15px;
        overflow-y: auto;
        position: relative;
    }
</style>