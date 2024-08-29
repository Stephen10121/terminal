<script lang="ts">
    import { defaultTheme, type TerminalTheme } from "./colorScheme.js";
    import FakeInput from "./FakeInput.svelte";
    import Input from "./Input.svelte";

    export let width = "100%";
    export let height = "100%";

    let terminalBox: HTMLElement;
    let commands: {
        command: string,
        date: number
    }[] = [];

    let theme: TerminalTheme = defaultTheme;

    function updateScroll(){
        terminalBox.scrollTop = terminalBox.scrollHeight;
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
        {#each commands as aCommand (aCommand.command + aCommand.date.toString())}
            <FakeInput command={aCommand.command} />
        {/each}
        <Input on:enter={(e) => {
            if (e.detail === "clear" || e.detail === "cls") {
                commands = []
            } else {
                commands = [...commands, {
                    command: e.detail,
                    date: Date.now()
                }];
            }
            setTimeout(updateScroll, 1);
        }} />
</section>

<style>
    .terminal,
    .terminal * 
    {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
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