<script lang="ts">
    import { defaultTheme, type TerminalTheme } from "./colorScheme.js";
    import Input from "./Input.svelte";

    export let width = "100%";
    export let height = "100%";

    let theme: TerminalTheme = defaultTheme;
</script>

<section
    id="terminal"
    class="terminal"
    style="
        --width: {width};
        --height: {height};
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
    <Input />
</section>

<style>
    .terminal,
    .terminal * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    
    p {
        font-family: monospace;
    }

    .terminal {
        background-color: var(--background-color);
        width: var(--width);
        height: var(--height);
        padding: 15px;
    }
</style>