<script lang="ts">
    import { applications } from "./applications.js";
    import { defaultThemes, type TerminalTheme } from "./colorScheme.js";
    import { defaultCommands } from "./commands.js";
    import FakeInput from "./FakeInput.svelte";
    import Input from "./Input.svelte";

    export let width = "100%";
    export let height = "100%";
    export let clearInputOnEnter = true;

    let terminalBox: HTMLElement;
    let showInput = true;
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

    async function enterIsPressed(command: string) {
        const splitCommand = command.split(" ");

        if (splitCommand[0] === "clear" || splitCommand[0] === "cls") {
            commands = [];
        } else {
            commands = [...commands, {
                type: "prev-command",
                command,
                date: Date.now()
            }];

            const applicationName = splitCommand[0];

            if (!Object.keys(applications).includes(applicationName)) {
                commands = [...commands, {
                    type: "response",
                    response: `bash: ${splitCommand[0]}: command not found<br><br>`,
                    date: Date.now()
                }];
                return
            }

            showInput = false;
            const applicationFlags = [];
            const applicationArgs = [];
            
            for (let i=1;i<splitCommand.length;i++) {
                if (splitCommand[i].substring(0,2) === "--") {
                    applicationFlags.push(splitCommand[i].substring(2));
                } else {
                    applicationArgs.push(splitCommand[i]);
                }
            }
            let dupTimePreventer = 1;

            await applications[applicationName].trigger(applicationArgs, applicationFlags, (text) => {
                commands = [...commands, {
                    type: "response",
                    response: text,
                    date: Date.now() + dupTimePreventer
                }];
                dupTimePreventer++;
            });

            showInput = true;
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
    {#if showInput}
        <Input clearOnEnter={clearInputOnEnter} on:enter={(e) => {
            enterIsPressed(e.detail);
            setTimeout(updateScroll, 1);
        }} />
    {/if}
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