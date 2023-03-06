
<script>
	import {createEventDispatcher, onMount} from 'svelte';
  import AvailBlock from './AvailBlock.svelte';
  import { v4 as uuidv4 } from 'uuid';

  // @ts-ignore
  /**
     * @type {string}
     */
  export let selectedBlockID;
  /**
     * @type {any}
     */
  export let availabilities;

  /**
     * @type {{ [x: string]: any; }}
     */
   export let JsonAvailStore;

  /**
     * @type {string | number}
     */
   export let username;


  export function clickToAddNewAvailability () {
    for (var i = 1; i < 48; i++) {
      for (var j = 2; j < 9; j++) {
        if(addNewAvailability(i, j)) {
          return;
        }
      }
    }
  }

  console.log("MainCal selectedBlockID: " + selectedBlockID)

	var dayNames = [["Time EST", ""], ["Sun", "28"], ["Mon", "29"], ["Tue", "30"], ["Wed", "31"], ["Thu", "32"], ["Fri", "33"], ["Sat", "34"]];
	/**
     * @type {any[]}
     */
	var timeBlocks = [];
  /**
     * @type {any}
     */
  let sTop = 0;
  /**
     * @type {number[][]}
     */
  export let timeBlocksMatrix = []

	$: initContent();
  
	// choose what date/day gets displayed in each date box.
	function initContent() {
    initTimeBlocks();
	}

  // Adding 15 minute time blocks to each day of the week
  function initTimeBlocks() {
    timeBlocks = [];

    for (var i = 0; i < 48; i++) {
      var matrixRow = [];
      for (var j = 0; j < 8; j++) {
        // Note the structure of a time block
        timeBlocks.push({row: i, col: j, day: dayNames[j][0], startMin: i * 15})
        matrixRow.push(0);
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
  function addNewAvailability(row, col) {
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
        id: uuidv4(),
        startRow: row,
        startCol: col,
        day: dayNames[col-1],
        location: "Virtual",
        availability: "preferred"
      }
      console.log(blockToAdd)
      availabilities.push(blockToAdd);
      updateLocalStorageAvailabilities();
      

      // Assigning spot in matrix as used by this availBlock 
      for (let i = 0; i < availabilities[availabilities.length-1].len; i++) {
        timeBlocksMatrix[row+i][col] = 1;
      }
      // console.log("Before updating avail")
      // console.log(availabilities)
      // // availabilities = availabilities
      // console.log("after updating avail")
      // console.log(availabilities)
      return true;
    }
    return false;
  }

  /**
     * @param { number} row
     * @param { number} col
     */
  function isTimeBlockAvailable(row, col) {
        if (timeBlocksMatrix[row][col] == 0) {
          return true;
        }
        return false
      }

  let dragging = false;
  let prevMouseY = 0;
  /**
     * @param {any} e
     */
  function handleExtendOnDrag(e) {
    let style = e.target.attributes.style.value;
    style = style.toString().split(": ");
    style = style[1].split(" / ");
    let row = parseInt(style[0].trim());
    let col = parseInt(style[1].trim());

    if (col != 1) {
      addNewAvailability(row, col);
      dragging = true;
      prevMouseY = e.clientY;
    }
  }

    /**
     * @param {any} e
     */
  function handleMouseMove(e) {
    let clickY = e.clientY;
    let availBlock = availabilities[availabilities.length - 1];
    let thisCol = availBlock.startCol;
    if (dragging) {
      // Extending bottom of block
      if (clickY >= prevMouseY + 15 && isTimeBlockAvailable(availBlock.startRow + availBlock.len, thisCol)) {
        selectedBlockID = availBlock.id
        prevMouseY = clickY;
        availBlock.len += 1;
        timeBlocksMatrix[availBlock.startRow + availBlock.len-1][thisCol] = 1;
      }
      // Trimming bottom of block
      if (clickY <= prevMouseY - 15 && availBlock.len > 1) {
        selectedBlockID = availBlock.id
        prevMouseY = clickY;
        availBlock.len -= 1;
        timeBlocksMatrix[availBlock.startRow + availBlock.len][thisCol] = 0;
      }
    }
    availabilities = availabilities;
  }

  function handleMouseLeave() {
    dragging = false;
  }

  function updateLocalStorageAvailabilities() {
    JsonAvailStore[username] = availabilities;
    JsonAvailStore = JsonAvailStore;
    localStorage.setItem("availabilitiesStore", JSON.stringify(JsonAvailStore));
  }

</script>


<div class="calendar-container">

    <div class="calendar">
      {#each dayNames as day}
        <span class="day-name">{day[1]}<br/>{day[0]}</span>
      {/each}
    </div>

    <div class="calendar-body" 
    on:mousedown={handleExtendOnDrag} 
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    on:mouseup={handleMouseLeave}
    on:scroll={(e)=>sTop=e.target.scrollTop}>
        {#each timeBlocks as block}
          {#if block.col == 0 && (block.startMin % 60) == 0}
            <span class="time" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};">{((block.startMin / 60) + 8) % 12 == 0 ? 12 : ((block.startMin / 60) + 8) % 12}:00  {((block.startMin / 60) + 8) >= 12 ? "PM" : "AM"}</span>
          {:else if block.col == 0 && (block.startMin % 60) == 30}
            <span class="time" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};">{(((block.startMin-30) / 60) + 8) % 12 == 0 ? 12 : (((block.startMin-30) / 60) + 8) % 12}:30 {(((block.startMin-30) / 60) + 8) >= 12 ? "PM" : "AM"}</span>
          {:else if block.col == 0 && (block.startMin % 30) == 15}
            <span class="time" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};"></span>
          {:else}
            {#if (block.startMin % 30) == 15}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span 
              on:click={() => addNewAvailability(block.row + 1, block.col + 1) } 
              class="day" style="grid-row: {block.row + 1}; grid-column: {block.col + 1}; border-top: 0;"></span>
            {:else}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span 
              on:click={() => addNewAvailability(block.row + 1, block.col + 1)} 
              class="day" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};"></span>
            {/if}
          {/if}
        {/each}

            
        {#each availabilities as availBlock}
          <AvailBlock 
            bind:availabilities={availabilities}
            bind:availBlock={availBlock}
            bind:selectedBlockID={selectedBlockID}
            bind:calendarMatrix={timeBlocksMatrix}
            bind:JsonAvailStore={JsonAvailStore}
            bind:username={username}
            bind:sTop={sTop}
          />
        {/each}
    </div>
</div>


<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
<style>
.calendar-container {
  width: 100%;
  margin-top: 70px;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);
  max-width: 1200px;
  user-select: none;
}
.calendar {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(8, minmax(122px, 1fr));
  grid-template-rows: 50px;
  grid-auto-rows: 50px;
  overflow: auto;
  margin-bottom: 25px;
}
.calendar-body {
  display: grid;
  width: 100%;
  height: 500px;
  grid-template-columns: repeat(8, minmax(122px, 1fr));
  grid-template-rows: 25px;
  grid-auto-rows: 25px;
  overflow-y: scroll;
  z-index: 1
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
  text-align: left;
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
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  color: #B1B1B1;
  text-align: center;
}
</style>