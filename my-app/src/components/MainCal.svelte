
<script>
	import {createEventDispatcher, onMount} from 'svelte';
  import AvailBlock from './AvailBlock.svelte';

  // @ts-ignore
  /**
     * @type {string}
     */
  export let selectedBlockID;
  /**
     * @type {any}
     */
   export let currentBlocks;
  console.log("MainCal selectedBlockID: " + selectedBlockID)

	var dayNames = [["", ""], ["Sun", "28"], ["Mon", "29"], ["Tue", "30"], ["Wed", "31"], ["Thu", "32"], ["Fri", "33"], ["Sat", "34"]];
	/**
     * @type {any[]}
     */
	var timeBlocks = [];
  /**
     * @type {number[][]}
     */
  var timeBlocksMatrix = []
	
 /**
     * @type {any[]}
     */
  $: availabilities = currentBlocks;

	$: initContent();
  
	// choose what date/day gets displayed in each date box.
	function initContent() {
    initTimeBlocks();
	}

  // Adding 30 minute time blocks to each day of the week
  function initTimeBlocks() {
    timeBlocks = [];

    for (var i = 0; i < 96; i++) {
      var matrixRow = [];
      for (var j = 0; j < 8; j++) {
        // Note the structure of a time block
        timeBlocks.push({row: i, col: j, day: dayNames[j][0], startMin: i * 15})
        matrixRow.push(0);
      }
      timeBlocksMatrix.push(matrixRow);
    }
  }

  // Adds new availability block to calendar
  /**
     * @param {number} row
     * @param {any} col
     */
  function addNewAvailibity(row, col) {
    let isBlockAvailable = 0;
    for (let i = 0; i < 2; i++) {
      isBlockAvailable += timeBlocksMatrix[row+i][col]
    }

    if (isBlockAvailable == 0) {
      let time = (row - 1) * 30
      console.log(time)
      let blockToAdd = {
        title: time,
        className: "task--primary",
        len: 2,
        startRow: row,
        startCol: col,
        id: "id" + row + ":" + col,
        day: "Tue",
        location: "None",
        availability: 1
      }
      selectedBlockID = blockToAdd.id
      availabilities.push(blockToAdd);

      // Assigning spot in matrix as used by this availBlock 
      for (let i = 0; i < availabilities[availabilities.length-1].len; i++) {
        timeBlocksMatrix[row+i][col] = 1;
      }
      
      availabilities = availabilities
      console.log(availabilities)
      console.log(currentBlocks)
    }
  }

</script>


<div class="calendar-container">

    <div class="calendar">
      {#each dayNames as day}
        <span class="day-name">{day[1]}<br/>{day[0]}</span>
      {/each}
    </div>

    <div class="calendar-body">
        {#each timeBlocks as block}
          {#if block.col == 0 && (block.startMin % 60) == 0}
            <span class="time" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};">{block.startMin / 60}:00 EST</span>
          {:else if block.col == 0 && (block.startMin % 60) == 30}
            <span class="time" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};">{(block.startMin-30) / 60}:30 EST</span>
          {:else if block.col == 0 && (block.startMin % 30) == 15}
            <span class="time" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};"></span>
          {:else}
            {#if (block.startMin % 30) == 15}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span 
              on:click={() => addNewAvailibity(block.row + 1, block.col + 1)} 
              class="day" style="grid-row: {block.row + 1}; grid-column: {block.col + 1}; border-top: 0;"></span>
            {:else}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span 
              on:click={() => addNewAvailibity(block.row + 1, block.col + 1)} 
              class="day" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};"></span>
            {/if}
          {/if}
        {/each}

            
        {#each availabilities as availBlock}
          <AvailBlock 
            bind:availBlock={availBlock}
            bind:selectedBlockID={selectedBlockID}
            calendarMatrix={timeBlocksMatrix}
          />
        {/each}
    </div>
</div>


	
<style>

.test {
  position: relative;
  z-index: 2;
}
.calendar-container {
  width: 90%;
  margin: auto;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
  max-width: 1200px;
}
.calendar {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(8, minmax(120px, 1fr));
  grid-template-rows: 50px;
  grid-auto-rows: 50px;
  overflow: auto;
}
.calendar-body {
  display: grid;
  width: 100%;
  height: 500px;
  grid-template-columns: repeat(8, minmax(120px, 1fr));
  grid-template-rows: 25px;
  grid-auto-rows: 25px;
  overflow-y: scroll;
  z-index: 1
}

.calendar-body-availblocks {
  display: grid;
  width: 100%;
  height: 500px;
  grid-template-columns: repeat(8, minmax(120px, 1fr));
  grid-template-rows: 50px;
  grid-auto-rows: 50px;
  overflow-y: scroll;
  position: relative;
  z-index: 2
}
.day {
  border-top: 1px solid #DCDCDC;
  border-right: 1px solid #DCDCDC;
  text-align: right;
  padding: 14px 20px;
  letter-spacing: 1px;
  font-size: 14px;
  box-sizing: border-box;
  color: #98a0a6;
  position: relative;
  z-index: 1;
}
.time {
  border-top: 1px solid #DCDCDC;
  border-right: 1px solid #DCDCDC;
  text-align: right;
  padding: 0px 20px;
  letter-spacing: 1px;
  font-size: 14px;
  box-sizing: border-box;
  color: #98a0a6;
  position: relative;
  z-index: 1;
}
.day:nth-of-type(8n + 8) {
  border-right: 0;
}
.time:nth-of-type(8n + 1) {
  border-top: 0;
  border-bottom: 0;
  border-right: 0;
}
.day-name {
  font-size: 12px;
  text-transform: uppercase;
  color: #e9a1a7;
  text-align: center;
  font-weight: 500;
}
</style>