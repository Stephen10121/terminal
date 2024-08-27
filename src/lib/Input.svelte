<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { type TerminalTheme } from "./colorScheme.js";

    export let theme: TerminalTheme;
    export let inputText = "";

    const dispatch = createEventDispatcher();
    let caret = 0;
    let inputBox: HTMLInputElement;

    function keyupevent(event: KeyboardEvent) {
        if (event.key === "Enter") {
            dispatch("enter", inputText);
        }

        if (!event.target) return;
        //@ts-ignore
        caret = event.target.selectionStart;
    }

    function getSelectedText(): string | undefined {
        if (typeof window.getSelection != "undefined") {
            return window.getSelection()?.toString();
            //@ts-ignore
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            //@ts-ignore
            return document.selection.createRange().text;
        }
        return undefined;
    }

    function windowClicked(event: MouseEvent) {
        //@ts-ignore
        if (event.target.id === "terminal") {
            inputBox.focus();
            //@ts-ignore
        } else if (event.target.id === "terminal-input-text") {
            var selectedText = getSelectedText();
            if (!selectedText) {
                inputBox.focus();
            }
        }
    }
</script>

<svelte:window on:click={windowClicked} />
<input bind:this={inputBox} class="sr-only" id="terminal-input" type="text" bind:value={inputText} on:keyup={keyupevent} on:keypress={keyupevent} on:keydown={keyupevent} />
<p id="terminal-input-text" style="--text-color:{theme.hex.brightWhite};">{inputText}<span class="blinker" style="--caret-pos: {caret};--caret-color:{theme.hex.cursor};"></span></p>

<style>
    p {
        font-family: monospace;
        font-size: 1rem;
        display: block;
        position: relative;
        color: var(--text-color);
        /* background-color: red; */
        width: fit-content;
        min-width: 1px;
        min-height: 18.8px;
    }

    .blinker {
        display: none;
        position: absolute;
        top: 0;
        left: calc(1ch * var(--caret-pos));
        /* left: 100%; */
        /* display: block; */
        width: 1ch;
        height: 100%;
        background-color: var(--caret-color);
        animation: blink 0.75s linear infinite;
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
    }

    #terminal-input:focus + p span {
        display: block;
    }
</style>