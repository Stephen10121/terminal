<script lang="ts">
    import { defaultTheme, type TerminalTheme } from "./colorScheme.js";
    import Input from "./Input.svelte";

    export let width = "100%";
    export let height = "100%";

    let theme: TerminalTheme = defaultTheme;

    let text = "Hello World";
</script>

<section id="terminal" class="terminal" style="--width:{width};--height:{height};--background-color:{theme.hex.background}">
    <!-- <p>{text}</p> -->
    <Input {theme} on:enter={(e) => {
        text = e.detail;
    }} />
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
        padding: 10px;
    }
</style>