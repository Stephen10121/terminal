<script lang="ts">
    import Terminal from "$lib/Terminal.svelte";
</script>

<main>
    <Terminal 
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
        padding: 100px;
    }
</style>