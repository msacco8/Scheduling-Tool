<script>
// @ts-nocheck

    import ToolTips from './ToolTips.svelte';
    import EditPanel from './EditPanel.svelte';
    import { afterUpdate } from 'svelte';
    import { onMount } from 'svelte';

    // var fs = require('fs');
    let newLine = '\r\n';
    let fields = ['User', 'Time (ms)'];

    
    // @ts-ignore
    export let username;
    export let JsonTimeStore;
    /**
     * @type {string}
     */
     export let selectedBlockID;
     export let timeBlocksMatrix;
     /**
     * @type {any}
     */
      export let availabilities;

      let startTime;
      let endTime;
    afterUpdate(() => {
        console.log("RightPanel selectedBlock: " + selectedBlockID)
        console.log("avails in rightpanel is: ")
        console.log(availabilities)
    });

    onMount(() => {
        startTime = new Date().getTime();
    });

    function handleSubmitAvail() {
        endTime = new Date().getTime();
        let timePassed = endTime - startTime;
        JsonTimeStore[username] = timePassed;
        JsonTimeStore = JsonTimeStore;

        // JsonAvailStore[username] = [availabilities, timePassed];
        // JsonAvailStore
        // JsonAvailStore['enterTime'] += [{username : username, time: timePassed}]
        // JsonAvailStore = JsonAvailStore;
        localStorage.setItem("timeStore", JSON.stringify(JsonTimeStore));
    }
    
</script>

<div class="right-panel">
    <div class="right-panel-container">
        <img src="/pfp1.png" alt="Profile" style="width:70px;height:70px;">
        <p>{username}</p>
    </div>
    <div class="right-panel-container editing">
        <EditPanel
            bind:username={username}
            bind:selectedBlockID={selectedBlockID}
            bind:availabilities={availabilities}
            bind:timeBlocksMatrix={timeBlocksMatrix}
        />
    </div>
    <div class="right-panel-container">
        <ToolTips/>
    </div>
    <a href="/recommendation"><button on:click={handleSubmitAvail} class="button">Submit Availablity</button></a>
</div>

<style>
    .right-panel {
        position: absolute;
        top: 0;
        right: 0;
        background-color: white;
        width: 24%;
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
        display: flex;
        flex-wrap: wrap;  
        align-items: center;
    }
    .editing {
        height: 340px;
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