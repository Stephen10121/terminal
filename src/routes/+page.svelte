<script lang="ts">
    import type { TerminalTheme } from "$lib/colorScheme.js";
    import Terminal from "$lib/Terminal.svelte";
    let currentTheme: string;

    let blueTheme: TerminalTheme = 
        {
            "source": "rootloops.sh",
            "displayColor": "brightBlue",
            "hex": {
                "background": "#08272c",
                "foreground": "#b9edf7",
                "text": "#08272c",
                "cursor": "#51bdce",
                "black": "#08272c",
                "red": "#edb0c2",
                "green": "#bbcf7d",
                "yellow": "#ebb890",
                "blue": "#9bcbed",
                "magenta": "#cbbaed",
                "cyan": "#7ed8c6",
                "white": "#51bdce",
                "brightBlack": "#236974",
                "brightRed": "#f4cfd9",
                "brightGreen": "#d2e4a0",
                "brightYellow": "#f4d3ba",
                "brightBlue": "#c1dff4",
                "brightMagenta": "#ded4f4",
                "brightCyan": "#a3ebdc",
                "brightWhite": "#b9edf7"
            }
    }

    $: {
        console.log(currentTheme);
    }
</script>

<main>
    <Terminal
        extraThemes = {{
            custom: blueTheme
        }}
        bind:currentTheme={currentTheme}
        customApplications={{
            outsider: {
                description: "This is the help command. Use it whenever you need help.",
                async trigger(_args, _flags, print) {
                    print("This is the help command.")
                    return 0;
                }
            }
        }}
    />
</main>

<style>
    main {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        /* padding: 100px; */
    }
</style>