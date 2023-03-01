<script>

    export let selectedBlockID;
    
</script>

<div class='edit-container'>
    {#if selectedBlockID != ""}
        <h1>{selectedBlockID}</h1>
    {:else}
        <h1>Editing</h1>
    {/if}
</div>


<style>
.edit-container {
    height: 100%;
}

</style>