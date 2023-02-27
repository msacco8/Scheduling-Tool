
<script>
	import {createEventDispatcher, onMount} from 'svelte';

	var dayNames = [["", ""], ["Sun", "28"], ["Mon", "29"], ["Tue", "30"], ["Wed", "31"], ["Thu", "32"], ["Fri", "33"], ["Sat", "34"]];
	/**
     * @type {any[]}
     */
	var timeBlocks = [];	//	The days to display in each box
	
	//	The Calendar Component just displays stuff in a row & column. It has no knowledge of dates.
	//	The items[] below are placed (by you) in a specified row & column of the calendar.
	//	You need to call findRowCol() to calc the row/col based on each items start date. Each date box has a Date() property.
	//	And, if an item overlaps rows, then you need to add a 2nd item on the subsequent row.
	/**
     * @type {any[]}
     */
	var items = [];
	function initMonthItems() {
		items=[
			// {title:"11:00 Task Early in month",className:"task--primary",date:new Date(y,m,7),len:2},
			// {title:"7:30 Wk 2 tasks",className:"task--warning",date:d1,len:2},
			// {title:"Overlapping Stuff (isBottom:true)",date:d1,className:"task--info",len:4,isBottom:true},
			// {title:"10:00 More Stuff to do",date:new Date(y,m,7),className:"task--info",len:2,detailHeader:"Difficult",detailContent:"But not especially so"},
			// {title:"All day task",date:new Date(y,m,7),className:"task--danger",len:1,vlen:2},
		];
		//This is where you calc the row/col to put each dated item
		for (let i of items) {
			// let rc = findRowCol(i.date);
			// if (rc == null) {
			// 	console.log('didn`t find date for ',i);
			// 	console.log(i.date);
			// 	i.startCol = i.startRow = 0;
			// } else {
			// 	i.startCol = rc.col;
			// 	i.startRow = rc.row;
			// }
		}
	}

	$: initContent();
  
	// choose what date/day gets displayed in each date box.
	function initContent() {
		// initMonth();
		initMonthItems();
    initTimeBlocks();
	}

  // Adding 30 minute time blocks to each day of the week
  function initTimeBlocks() {
    timeBlocks = [];

    for (var i = 0; i < 48; i++) {
      for (var j = 0; j < 8; j++) {
        // Note the structure of a time block
        timeBlocks.push({id: j, day: dayNames[j], startMin: i * 30})
      }
    }
  }

	// function initMonth() {
	// 	days = [];
	// 	//	find the last Monday of the previous month
	// 	var firstDay = new Date(year, month, 1).getDay();
	// 	//console.log('fd='+firstDay+' '+dayNames[firstDay]);
	// 	var daysInThisMonth = new Date(year, month+1, 0).getDate();
	// 	var daysInLastMonth = new Date(year, month, 0).getDate();
	// 	var prevMonth = month==0 ? 11 : month-1;
		
	// 	//	show the days before the start of this month (disabled) - always less than 7
	// 	for (let i=daysInLastMonth-firstDay;i<daysInLastMonth;i++) {
	// 		let d = new Date(prevMonth==11?year-1:year,prevMonth,i+1);
	// 		days.push({name:''+(i+1),enabled:false,date:d,});
	// 	}
	// 	//	show the days in this month (enabled) - always 28 - 31
	// 	for (let i=0;i<daysInThisMonth;i++) {
	// 		let d = new Date(year,month,i+1);
	// 		if (i==0) days.push({name:monthAbbrev+' '+(i+1),enabled:true,date:d,});
	// 		else days.push({name:''+(i+1),enabled:true,date:d,});
	// 		//console.log('i='+i+'  dt is '+d+' date() is '+d.getDate());
	// 	}
	// 	//	show any days to fill up the last row (disabled) - always less than 7
	// 	for (let i=0;days.length%7;i++) {
	// 		let d = new Date((month==11?year+1:year),(month+1)%12,i+1);
	// 		if (i==0) days.push({name:nextMonthAbbrev+' '+(i+1),enabled:false,date:d,});
	// 		else days.push({name:''+(i+1),enabled:false,date:d,});
	// 	}
	// }
	/**
     * @param {{ getYear: () => any; getMonth: () => any; getDate: () => any; }} availBlock
     */
	function findRowCol(availBlock) {
		for (var i = 0; i< timeBlocks.length; i++) {
			// let d = days[i].date;
			// if (d.getYear() === availBlock.getYear()
			// 	&& d.getMonth() === availBlock.getMonth()
			// 	&& d.getDate() === availBlock.getDate())
			// 	return {row:Math.floor(i/7)+2,col:i%7+1};
		}
		return null;	
	}
</script>


<div class="calendar-container">
    <div class="calendar">
        {#each dayNames as day}
          <span class="day-name">{day[1]}<br/>{day[0]}</span>
        {/each}
    
        {#each timeBlocks as block}
          {#if block.id == 0}
            <span class="day">{block.startMin / 30}:00 EST</span>
          {:else}
            <span class="day"></span>
          {/if}
        {/each}
            
        {#each items as item}
            <section
                class="task {item.className}"
                style="grid-column: {item.startCol} / span {item.len};      
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
.day {
  border-bottom: 1px solid #DCDCDC;
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
  grid-column: 1;
}
.day:nth-of-type(8n + 8) {
  border-right: 0;
}
/* .day:nth-of-type(n + 1):nth-of-type(-n + 7) {
  grid-row: 1;
}
.day:nth-of-type(n + 8):nth-of-type(-n + 14) {
  grid-row: 2;
}
.day:nth-of-type(n + 15):nth-of-type(-n + 21) {
  grid-row: 3;
}
.day:nth-of-type(n + 22):nth-of-type(-n + 28) {
  grid-row: 4;
}
.day:nth-of-type(n + 29):nth-of-type(-n + 35) {
  grid-row: 5;
}
.day:nth-of-type(n + 36):nth-of-type(-n + 42) {
  grid-row: 6;
}
.day:nth-of-type(7n + 1) {
  grid-column: 1/1;
}
.day:nth-of-type(7n + 2) {
  grid-column: 2/2;
}
.day:nth-of-type(7n + 3) {
  grid-column: 3/3;
}
.day:nth-of-type(7n + 4) {
  grid-column: 4/4;
}
.day:nth-of-type(7n + 5) {
  grid-column: 5/5;
}
.day:nth-of-type(7n + 6) {
  grid-column: 6/6;
}
.day:nth-of-type(7n + 7) {
  grid-column: 7/7;
} */
.day-name {
  font-size: 12px;
  text-transform: uppercase;
  color: #e9a1a7;
  text-align: center;
  border-bottom: 1px solid #DCDCDC;
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
  height: 0;
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