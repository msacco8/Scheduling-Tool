
<script>
	import {createEventDispatcher, onMount} from 'svelte';

	var dayNames = [["", ""], ["Sun", "28"], ["Mon", "29"], ["Tue", "30"], ["Wed", "31"], ["Thu", "32"], ["Fri", "33"], ["Sat", "34"]];
	/**
     * @type {any[]}
     */
	var timeBlocks = [];
	
	/**
     * @type {any[]}
     */
  $: availabilities = [];
	function initAvailabilities() {
		availabilities=[
			{title:"11:00 Task Early in month",className:"task--primary",len:2, startMin: 30, day: "Tue"},
		];

		//This is where you calc the row/col to put each dated item
		for (let avail of availabilities) {
      console.log(avail);
			let rc = findRowCol(avail);
      console.log(rc);
			if (rc == null) {
			} else {
				avail.startCol = rc.col;
				avail.startRow = rc.row;
			}
		}
	}

	$: initContent();
  
	// choose what date/day gets displayed in each date box.
	function initContent() {
    initTimeBlocks();
		initAvailabilities();
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
	/**
     * @param {{ day: any; startMin: any; }} availBlock
     */
	function findRowCol(availBlock) {
		for (var i = 0; i < timeBlocks.length; i++) {
			let time = timeBlocks[i];
			if (time.day ==  availBlock.day && time.startMin == availBlock.startMin)
				return {row: time.row, col: time.col};
		}
		return null;	
	}

  // Adds new availability block to calendar
  function addNewAvailibity() {
    availabilities.push({title:"11:00 Task Early in month",className:"task--primary",len:2, startMin: 60, day: "Tue"});
    availabilities = availabilities
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
            <span class="time">{block.startMin / 60}:00 EST</span>
          {:else if block.col == 0 && (block.startMin % 60) == 30}
            <span class="time">{(block.startMin-30) / 60}:30 EST</span>
          {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span on:click={addNewAvailibity} class="day"></span>
          {/if}
        {/each}
            
        {#each availabilities as item}
            <section
                class="task {item.className}"
                style="grid-column: {item.startCol};      
                grid-row: {item.startRow};  
                align-self: {item.isBottom?'end':'center'};"
                >
                {item.title}
                {#if item.detailHeader}
                <div class="task-detail">
                    <h2>{item.detailHeader}</h2>
                    <p>{item.detailContent}</p>
                </div>
                {/if}
            </section>
        {/each}
    </div>
</div>


	
<style>
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
.task {
  border-left-width: 3px;
  padding: 8px 12px;
  margin: 10px;
  border-left-style: solid;
  font-size: 14px;
  position: relative;
  align-self: center;
	z-index:2;
	border-radius: 15px;
}
.task--warning {
  border-left-color: #fdb44d;
  background: #fef0db;
  color: #fc9b10;
  margin-top: -5px;
}
.task--danger {
  border-left-color: #fa607e;
  grid-column: 2 / span 3;
  grid-row: 3;
  margin-top: 15px;
  background: rgba(253, 197, 208, 0.7);
  color: #f8254e;
}
.task--info {
  border-left-color: #4786ff;
  margin-top: 15px;
  background: rgba(218, 231, 255, 0.7);
  color: #0a5eff;
}
.task--primary {
  background: #4786ff;
  border: 0;
  border-radius: 14px;
  color: #f00;
  box-shadow: 0 10px 14px rgba(71, 134, 255, 0.4);
}
.task-detail {
  position: absolute;
  left: 0;
  top: calc(100% + 8px);
  background: #efe;
  border: 1px solid rgba(166, 168, 179, 0.2);
  color: #100;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 14px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  z-index: 2;
}
.task-detail:after, .task-detail:before {
  bottom: 100%;
  left: 30%;
  border: solid transparent;
  content: " ";
  height: 100%;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.task-detail:before {
  border-bottom-color: rgba(166, 168, 179, 0.2);
  border-width: 8px;
  margin-left: -8px;
}
.task-detail:after {
  border-bottom-color: #fff;
  border-width: 6px;
  margin-left: -6px;
}
.task-detail h2 {
  font-size: 15px;
  margin: 0;
  color: #91565d;
}
.task-detail p {
  margin-top: 4px;
  font-size: 12px;
  margin-bottom: 0;
  font-weight: 500;
  color: rgba(81, 86, 93, 0.7);
}
</style>