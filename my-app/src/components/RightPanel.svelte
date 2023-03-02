<script>
    import ToolTips from './ToolTips.svelte';
    import EditPanel from './EditPanel.svelte';
    import { afterUpdate } from 'svelte';
    
    export let username = "";
    /**
     * @type {string}
     */
     export let selectedBlockID;
     /**
     * @type {any}
     */
      export let availabilities;
    afterUpdate(() => {
        console.log("RightPanel selectedBlock: " + selectedBlockID)
        console.log("avails in rightpanel is: ")
        console.log(availabilities)
    })
    
</script>

<div class="right-panel">
    <div class="right-panel-container">
        <p>{username}</p>
    </div>
    <div class="right-panel-container editing">
        <EditPanel
            bind:selectedBlockID={selectedBlockID}
            bind:availabilities={availabilities}
        />
    </div>
    <div class="right-panel-container">
        <ToolTips/>
    </div>
    <p><a href="/recommendation">Submit Availablity</a></p>
</div>

<style>
    .right-panel {
        background-color: white;
        width: 25%;
        padding: 20px;
    }
    .right-panel-container {
        margin-bottom: 20px;
        padding: 5px;
        box-shadow: 0px 0px 0px 1px #E4E4E4;
        border-radius: 8px;
    }
    .editing {
        height: 50%;
    }
</style>