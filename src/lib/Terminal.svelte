<script lang="ts">
    import { defaultApplications, type ApplicationsObject } from "./applications.js";
    import { defaultThemes, type TerminalTheme } from "./colorScheme.js";
    import FakeInput from "./FakeInput.svelte";
    import Input from "./Input.svelte";

    export let width = "100%";
    export let height = "100%";
    export let clearInputOnEnter = true;
    export let customApplications: ApplicationsObject = {}

    let applications: ApplicationsObject = {
        ...defaultApplications,
        ...customApplications,
        theme: {
        description: 'The theme command lets you choose the theme of the terminal. For more information use this command: <span style="color:var(--green-color);">theme --help</span>',
        async trigger(args, flags, print) {
            if (flags.includes("help")) {
                print(`The <span style="color:var(--blue-color);">theme</span> command lets you choose a theme.<br>For example: <span style="color:var(--blue-color);">'theme doughnut'</span> lets you choose the doughnut theme.<br>To see all themes use this command: <span style="color:var(--blue-color);">'theme --list'</span>`);
                return 0;
            }
            if (flags.includes("list")) {
                print(`To select a theme, do something like this: <span style="color:var(--blue-color);">'theme red'</span>.<br>Themes:<br><span style="color:var(--brightMagenta-color);">doughnut</span><br><span style="color:var(--red-color);">red</span><br><span style="color:var(--brightBlack-color);">dark</span>`);
                return 0;
            }
            if (args.includes("red")) {
                print("Setting theme to red.");
                theme = defaultThemes.red;
                return 0;
            }
            if (args.includes("doughnut")) {
                print("Setting theme to doughnut.");
                theme = defaultThemes.doughnut;
                return 0;
            }
            if (args.includes("dark")) {
                print("Setting theme to dark.");
                theme = defaultThemes.dark;
                return 0;
            }
            return 0;
        }
    },
    };

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

            if (applicationName.length === 0) return;

            if (applicationName === "help") {
                let applicationDescriptions = [];
                const applicationsArray = Object.keys(applications);
                for (let i=0;i<applicationsArray.length;i++) {
                    applicationDescriptions.push(`<span style="color:var(--cyan-color);">${applicationsArray[i]}</span>     ${applications[applicationsArray[i]].description}`);
                }
                commands = [...commands, {
                    type: "response",
                    response: `${applicationDescriptions.join("<br>")}`,
                    date: Date.now()
                }];
                return
            }

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

            const exitCode = await applications[applicationName].trigger(applicationArgs, applicationFlags, (text) => {
                commands = [...commands, {
                    type: "response",
                    response: text,
                    date: Date.now() + dupTimePreventer
                }];
                dupTimePreventer++;
            });

            if (exitCode !== 0) {
                commands = [...commands, {
                    type: "response",
                    response: `<span style="color:var(--magenta-color);">Program exited with code <span style="color:var(--red-color);">'${exitCode}'</span></span>`,
                    date: Date.now() + dupTimePreventer
                }];
            }

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
                <pre class="responseText">{@html aCommand.response}</pre>
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

    pre {
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

    .terminal div {
        pointer-events: none;
    }

    .responseText {
        color:var(--brightWhite-color);
        display: block;
        width: fit-content;
        pointer-events: all;
    }
</style>