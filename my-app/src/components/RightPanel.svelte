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
    <a href="/recommendation"><button class="button">Submit Availablity</button></a>
</div>

<style>
    .right-panel {
        position: absolute;
        top: 0;
        right: 0;
        background-color: white;
        width: 26%;
        padding: 20px;
        height: 100%;
        min-height: 100%;
        margin: 0;

    }
    .right-panel-container {
        margin-bottom: 30px;
        padding: 5px;
        box-shadow: 0px 0px 0px 1px #E4E4E4;
        border-radius: 8px;
    }
    .editing {
        height: 350px;
    }
    .button{
        width: 100%;
        height: 47px;
        border:1px solid transparent;
        color: white;
        font-size: 16px;

        background: #5272E9;
        border-radius: 5px;
    }
    .button:hover {
        box-shadow: 0 5px 10px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.1);
    }

    .button:active {
        width: 100%;
        height: 47px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
</style>