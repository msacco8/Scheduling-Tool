<!-- 
  Definition of AvailBlock Concept
 -->

<script>
// @ts-nocheck
  import { onMount } from "svelte";

  export let JsonAvailStore;
  export let availBlock;
  export let username;
  export let sTop;
  /**
   * @type {any}
   */
  export let availabilities;
  /**
   * @type {string}
   */
  export let selectedBlockID;
  /**
  * @type {number[][]}
  */
  export let calendarMatrix;
    /**
   * @type {HTMLElement}
   */
    let this_avail;
    /**
   * @type {string}
   */
    let hitRadius = 15;
    $: cursor = "";
    $: isBottomDraggable = false;
    $: isTopDraggable = false;
    $: prevMouseY = 0;

    /**
   * @param {number} row
   * @param {number} col
   */

  // Checks if a timeBlock at a specific row, col is available
  function isTimeBlockAvailable(row, col) {
    if (calendarMatrix[row][col] == 0) {
      return true;
    }
    return false
  }

  /**
   * @param {any} e
   */
  // Logic behind making an availBlock extendable
  function handleExtendOnDrag(e) {
    let clickY = e.clientY;
    let blockTop = this_avail.offsetTop - sTop;
    let blockBottom = blockTop + this_avail.offsetHeight;

    if(blockTop + hitRadius >= clickY && blockTop <= clickY) {
      isTopDraggable = true;
      prevMouseY = blockTop + hitRadius + 10;
    } else if(blockBottom - hitRadius <= clickY && blockBottom >= clickY) {
      isBottomDraggable = true;
      prevMouseY = blockBottom - hitRadius - 10;
    }
  }

  /**
   * @param {any} e
   */
  // This handles the drag and extend movement of an AvailBlock
  function handleMouseMove(e) {
    let clickY = e.clientY;
    let thisCol = availBlock.startCol;
    let blockTop = this_avail.offsetTop - sTop;
    let blockBottom = blockTop + this_avail.offsetHeight;
    
    if((blockTop + hitRadius >= clickY && blockTop <= clickY) ||
        (blockBottom - hitRadius <= clickY && blockBottom >= clickY)) {
        cursor="ns-resize";
        } else {
          cursor="";
        }
      
    if (isTopDraggable) {
      // Extending top of block
      if (clickY <= prevMouseY - 15 && availBlock.startRow > 1 && isTimeBlockAvailable(availBlock.startRow-1, thisCol)) {
        cursor="ns-resize";
        selectedBlockID = availBlock.id
        prevMouseY = clickY;
        availBlock.startRow -= 1;
        availBlock.len += 1;
        calendarMatrix[availBlock.startRow][thisCol] = 1;
      }
      // Trimming top of block
      if (clickY >= prevMouseY + 15 && availBlock.len > 1) {
        cursor="ns-resize";
        selectedBlockID = availBlock.id
        prevMouseY = clickY;
        availBlock.startRow += 1;
        availBlock.len -= 1;
        calendarMatrix[availBlock.startRow-1][thisCol] = 0;
      }
    }

    if (isBottomDraggable) {
      // Extending bottom of block
      if (clickY >= prevMouseY + 15 && isTimeBlockAvailable(availBlock.startRow + availBlock.len, thisCol)) {
        cursor="ns-resize";
        selectedBlockID = availBlock.id
        prevMouseY = clickY;
        availBlock.len += 1;
        calendarMatrix[availBlock.startRow + availBlock.len-1][thisCol] = 1;
      }
      // Trimming bottom of block
      if (clickY <= prevMouseY - 15 && availBlock.len > 1) {
        cursor="ns-resize";
        selectedBlockID = availBlock.id
        prevMouseY = clickY;
        availBlock.len -= 1;
        calendarMatrix[availBlock.startRow + availBlock.len][thisCol] = 0;
      }
    }
    updateLocalStorageAvailabilities()
    timeFrame = getTimeFrame()
  }

  /**
   * @param {any} e
   */
  function handleMouseLeave(e) {
    prevMouseY = this_avail.offsetTop - (this_avail.offsetHeight / 2)
    isBottomDraggable = false;
    isTopDraggable = false;
  }

  /**
   * @param {any} e
   */
  function handleDoubleClick(e) {
    selectedBlockID = availBlock.id;
  }

  // Gets time frame that availBlock occupies in order to display it
  function getTimeFrame() {
    let minutes = (availBlock.startRow - 1 + 32) * 15;
    let start = ""
    let end = ""
    if (minutes % 60 == 0) {
      start=(minutes / 60) % 12 == 0 ? "12:00" : (minutes / 60) % 12 + ":00";
    } else if (minutes % 60 == 30) {
      start=((minutes-30) / 60) % 12 == 0 ? "12:30" : ((minutes-30) / 60) % 12 + ":30";
    } else if (minutes % 60 == 45) {
      start=((minutes-45) / 60) % 12 == 0 ? "12:45" : ((minutes-45) / 60) % 12 + ":45";
    } else {
      start=((minutes-15) / 60) % 12 == 0 ? "12:15" : ((minutes-15) / 60) % 12 + ":15";
    }

    minutes += 15 * availBlock.len
    if (minutes % 60 == 0) {
      end=(minutes / 60) % 12 == 0 ? "12:00" : (minutes / 60) % 12 + ":00";
    } else if (minutes % 60 == 30) {
      end=((minutes-30) / 60) % 12 == 0 ? "12:30" : ((minutes-30) / 60) % 12 + ":30";
    } else if (minutes % 60 == 45) {
      end=((minutes-45) / 60) % 12 == 0 ? "12:45" : ((minutes-45) / 60) % 12 + ":45";
    } else {
      end=((minutes-15) / 60) % 12 == 0 ? "12:15" : ((minutes-15) / 60) % 12 + ":15";
    }
    return start + " - " + end;
  }

  $: timeFrame = getTimeFrame()


  onMount(async() => {
      selectedBlockID = availBlock.id
  })

  // Updates local storage
  function updateLocalStorageAvailabilities() {
    JsonAvailStore[username] = availabilities;
    JsonAvailStore = JsonAvailStore;
    localStorage.setItem("availabilitiesStore", JSON.stringify(JsonAvailStore));
  }

</script>

<div
    on:mousedown={handleExtendOnDrag}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    on:mouseup={handleMouseLeave}
    on:dblclick={handleDoubleClick}
    bind:this={this_avail}
    id={availBlock.id}
    class="task {availBlock.availability}"
    style="grid-column: {availBlock.startCol};  
    grid-row: {availBlock.startRow} / span {availBlock.len};  
    align-self: {availBlock.isBottom?'end':'center'};
    cursor: {cursor};"
    >
    <div class="inner-block-{availBlock.availability}">
      <div style="font-size: 13px">
        {availBlock.availability == "noavailability" ? "Scheduling Time" : (availBlock.availability == "preferred" ? "Available" : "If Need Be")}
      </div>
      <div style="font-size: 11px">
        {availBlock.location}
      </div>
      <div style="position: absolute; bottom:0; font-size: 13px">
        {timeFrame}
      </div>
    </div>
</div>

<style>
.inner-block-ifneeded{
  padding: 3px;
  width: 90%;
  background-color: #FFFAE9;
  border-radius: 0px 7px 7px 0px;
  color: #E9C852;
}
.inner-block-preferred {
  padding: 3px;
  width: 90%;
  background-color: #E6FEFF;
  border-radius: 0px 7px 7px 0px;
  color: #24B0C9;
}
.ifneeded {
  background: #E9C852;
}
.preferred {
  background: #24B0C9;
}
.task {
  margin-right: 10px;
  font-size: 14px;
  position: relative;
  align-self: center;
  z-index:2;
  border-radius: 7px;
  height: 100%;
  display: flex;
  justify-content: right;
}
</style>