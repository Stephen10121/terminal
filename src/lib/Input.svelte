<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let inputText = "";
    export let clearOnEnter = true;

    const dispatch = createEventDispatcher();
    let caret = 0;
    let caretHeight = 1;
    let inputBox: HTMLInputElement;
    let terminalInputText: HTMLParagraphElement;



    function keydownevent(event: KeyboardEvent) {
        if (event.key === "Enter") {
            dispatch("enter", inputText);
            if (clearOnEnter) {
                inputText = "";
                setTimeout(() => {
                    caret = 0;
                }, 1);
            }
        }

        if (!event.target) return;
        //@ts-ignore
        caret = event.target.selectionStart;
        if (terminalInputText) {
            caretHeight = Math.trunc(terminalInputText.scrollHeight/17);
        }
    }
    function keyevent(event: KeyboardEvent) {
        

        if (!event.target) return;
        //@ts-ignore
        caret = event.target.selectionStart;
        if (terminalInputText) {
            caretHeight = Math.trunc(terminalInputText.scrollHeight/17);
            console.log(caretHeight)
        }
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

<input bind:this={inputBox} class="sr-only" id="terminal-input" type="text" bind:value={inputText} on:keyup={keyevent} on:keypress={keyevent} on:keydown={keydownevent} />
<p id="terminal-input-text" bind:this={terminalInputText}>
    <span class="green">root@192.168.0.26</span>:
    <span class="blue">/etc/nginx</span>$<span class="actual-text">{inputText}
        <span class="blinker" style="--caret-pos: {caret};--caret-height:{caretHeight};"></span>
    </span>
</p>

<style>
    p {
        font-family: monospace;
        font-size: 0.9rem;
        display: block;
        color: var(--brightWhite-color);
        max-width: 100%;
        min-width: 1px;
        min-height: 17px;
        /* overflow: hidden; */
    }

    .actual-text {
        position: relative;
        min-width: 1px;
        margin-left: 5px;
    }

    .blinker {
        display: none;
        position: absolute;
        bottom: 0;
        left: calc(1ch * var(--caret-pos));
        width: 1ch;
        height: 17px;
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

    .green {
        color: var(--green-color);
    }

    .blue {
        color: var(--blue-color);
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

    #terminal-input:focus + p .blinker {
        display: block;
    }
</style>