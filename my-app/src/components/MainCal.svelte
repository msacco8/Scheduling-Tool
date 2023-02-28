
<script>
	import {createEventDispatcher, onMount} from 'svelte';
  import AvailBlock from './AvailBlock.svelte';

	var dayNames = [["", ""], ["Sun", "28"], ["Mon", "29"], ["Tue", "30"], ["Wed", "31"], ["Thu", "32"], ["Fri", "33"], ["Sat", "34"]];
	/**
     * @type {any[]}
     */
	var timeBlocks = [];
	
 /**
     * @type {any[]}
     */
   $: availabilities = [];

	$: initContent();
  
	// choose what date/day gets displayed in each date box.
	function initContent() {
    initTimeBlocks();
	}

  // Adding 30 minute time blocks to each day of the week
  function initTimeBlocks() {
    timeBlocks = [];

    for (var i = 0; i < 48; i++) {
      for (var j = 0; j < 8; j++) {
        // Note the structure of a time block
        timeBlocks.push({row: i, col: j, day: dayNames[j][0], startMin: i * 30})
      }
    }
  }
	// function findRowCol(availBlock) {
	// 	for (var i = 0; i < timeBlocks.length; i++) {
	// 		let time = timeBlocks[i];
	// 		if (time.day ==  availBlock.day && time.startMin == availBlock.startMin)
	// 			return {row: time.row, col: time.col};
	// 	}
	// 	return null;	
	// }

  // Adds new availability block to calendar
  /**
     * @param {number} row
     * @param {any} col
     */
  function addNewAvailibity(row, col) {
    let time = (row - 1) * 30
    console.log(time)
    availabilities.push({title:time,className:"task--primary",len:1, startRow: row, startCol: col, day: "Tue"});
    availabilities = availabilities
    console.log(row, col)
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
            <span class="time" style="gr id-row: {block.row + 1}; grid-column: {block.col + 1};">{(block.startMin-30) / 60}:30 EST</span>
          {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span 
              on:click={() => addNewAvailibity(block.row + 1, block.col + 1)} 
              class="day" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};"></span>
          {/if}
        {/each}

            
        {#each availabilities as availBlock}
          <AvailBlock {availBlock} />
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
  background: #fff;
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
  grid-template-rows: 50px;
  grid-auto-rows: 50px;
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