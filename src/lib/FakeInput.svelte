<script lang="ts">
    export let device = "root@192.168.0.26";
    export let path = "/etc/nginx";
    export let command = "ssh root@192.168.0.25";
</script>

<p>
    <span class="green">{device}</span>:
    <span class="blue">{path}</span>$<span class="actual-text">{command}</span>
</p>

<style>
    p {
        font-family: monospace;
        font-size: 0.9rem;
        color: var(--brightWhite-color);
        display: block;
        width: fit-content;
        height: fit-content;
    }

    .green {
        color: var(--green-color);
    }

    .blue {
        color: var(--blue-color);
    }

    .actual-text {
        margin-left: 5px;
    }
</style>