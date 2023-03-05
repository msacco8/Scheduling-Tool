<script>
    var dayNames = ["","S", "M", "T", "W", "T", "F", "S"];

    /**
     * @type {any[]}
     */
	var timeBlocks = [];
    var JsonAvailStore = JSON.parse(localStorage.getItem("availabilitiesStore") || "{}")
    var groupAvailabilities = JSON.stringify(JsonAvailStore) != "{}" ? JsonAvailStore : {};
    /**
     * @type {number[][]}
     */
    let timeCountsMatrix = [];

    $: initContent();
  
    // choose what date/day gets displayed in each date box.
    function initContent() {
        initTimeBlocks();
    }

    // Adding 15 minute time blocks to each day of the week
    function initTimeBlocks() {
        timeBlocks = [];
        for (var i = 0; i < 96; i++) {
            let matrixRow = [];
            for (var j = 0; j < 8; j++) {
            // Note the structure of a time block
                timeBlocks.push({row: i, col: j, day: dayNames[j], startMin: i * 15})
                matrixRow.push(0);
                matrixRow.push(0);
            }
            timeCountsMatrix.push(matrixRow);
        }

        console.log(groupAvailabilities);
        // Getting count of each availability time
        for (let person in groupAvailabilities) {
            for (let index in groupAvailabilities[person]) {
                let jsonBlock = groupAvailabilities[person][index];
                for (let i = 0; i < jsonBlock.len; i++) {
                    timeCountsMatrix[jsonBlock.startRow + i][jsonBlock.startCol] += 1;
                }
            }
        }
        console.log(timeCountsMatrix[0]);
    }

</script>

<div class="header">Group's Availability</div>
<div class="calendar-container">

    <div class="calendar">
      {#each dayNames as day}
        <span class="day-name">{day}</span>
      {/each}
    </div>

    <div class="calendar-body">
        {#each timeBlocks as block}
          {#if block.col == 0 && (block.startMin % 60) == 0}
            <span class="time" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};">{block.startMin / 60}:00 </span>
          {:else if block.col == 0 && (block.startMin % 60) == 30}
            <span class="time" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};">{(block.startMin-30) / 60}:30</span>
          {:else if block.col == 0 && (block.startMin % 30) == 15}
            <span class="time" style="grid-row: {block.row + 1}; grid-column: {block.col + 1};"></span>
          {:else}
            {#if (block.startMin % 30) == 15}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span class="day" style="grid-row: {block.row}; grid-column: {block.col + 1}; border-top: 0; background: rgba(36, 176, 201, {0.05 * timeCountsMatrix[block.row][block.col+1]});"></span>
            {:else}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <span class="day" style="grid-row: {block.row}; grid-column: {block.col + 1}; background: rgba(36, 176, 201, {0.05 * timeCountsMatrix[block.row][block.col+1]}); "></span>
            {/if}
          {/if}
        {/each}
    </div>
</div>

<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
<style>
    .calendar-container {
    width: 100%;
    height: 75%;
    margin: auto;
    overflow: hidden;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0);
    user-select: none;
    }
    .calendar {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(8, minmax(35px, 1fr));
    grid-template-rows: 50px;
    grid-auto-rows: 50px;
    overflow: auto;
    }
    .calendar-body {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(8, minmax(35px, 1fr));
    grid-template-rows: 10px;
    grid-auto-rows: 10px;
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
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-transform: uppercase;
    color: #B1B1B1;
    text-align: center;
    font-size: 20px;
    }
    .header {
        text-align: center;
        margin-top: 10px;
        margin-bottom: 30px;
    }
</style>