<script>
    import { beforeUpdate, afterUpdate } from 'svelte';
    /**
     * @type {string}
     */
    export let selectedBlockID;
     /**
     * @type {any[]}
     */
    export let currentBlocks;

    /**
     * @type {{ startRow: string; startCol: string; id: string; location: string; availability: string; }}
     */
    let currentBlock;
    let currentBlockIndex;

     // @ts-ignore
     beforeUpdate(() => {
        // currentBlockIndex = currentBlocks.findIndex(el => el.id === selectedBlockID)
        currentBlock = currentBlocks.find(el => el.id = selectedBlockID)
        console.log(currentBlock)
        console.log(currentBlocks)
        console.log("Selected Block ID: " + selectedBlockID)
     })
</script>

<div class='edit-container'>
    {#if selectedBlockID != ""}
        <h1>{selectedBlockID}</h1>
        <p>
            {"start row: " + currentBlock.startRow}
            {"start col: " + currentBlock.startCol}
            {"id: " + currentBlock.id}
            {"location: " + currentBlock.location}
            {"availability: " + currentBlock.availability}
            {"len: " + currentBlock.len}
        </p>
    {:else}
        <h3>Please double click on an existing block or create a new block to edit.</h3>
    {/if}
</div>


<style>
.edit-container {
    height: 100%;
}

</style>