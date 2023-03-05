<script>
// @ts-nocheck


    import { onMount } from "svelte";
    import { v4 as uuidv4 } from 'uuid';

    // cell drag select svelte

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
      let blockID;
      let hitRadius = 15;
      $: cursor = "";
      $: isBottomDraggable = false;
      $: isTopDraggable = false;
      $: prevMouseY = 0;

      /**
     * @param {number} row
     * @param {number} col
     */
      function isTimeBlockAvailable(row, col) {
        if (calendarMatrix[row][col] == 0) {
          return true;
        }
        return false
      }
      /**
     * @param {any} e
     */
    function handleExtendOnDrag(e) {
      let clickY = e.clientY;
      let blockTop = this_avail.offsetTop - sTop;
      let blockBottom = blockTop + this_avail.offsetHeight;
    //   console.log(e);
    //   console.log("Click y:", clickY, "Block bottom:", blockBottom);

      if(blockTop + hitRadius >= clickY && blockTop <= clickY) {
        isTopDraggable = true;
        prevMouseY = blockTop + hitRadius + 10;
        console.log("top is draggable");
      } else if(blockBottom - hitRadius <= clickY && blockBottom >= clickY) {
        isBottomDraggable = true;
        prevMouseY = blockBottom - hitRadius;
        console.log("bottom is draggable");
      }
    }

    /**
     * @param {any} e
     */
    // This handles the drag and extend movement of an AvailBlock
    function handleMouseMove(e) {
      console.log(sTop);
      console.log(e);

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
        console.log(prevMouseY);
        if (clickY <= prevMouseY - 15 && availBlock.startRow > 1 && isTimeBlockAvailable(availBlock.startRow-1, thisCol)) {
          cursor="ns-resize";
          selectedBlockID = availBlock.id
          prevMouseY = clickY;
          availBlock.startRow -= 1;
          availBlock.len += 1;
          console.log(availBlock.len);
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
    }

    /**
     * @param {any} e
     */
    function handleMouseLeave(e) {
      console.log(e.target.scrollTop)
      prevMouseY = this_avail.offsetTop - (this_avail.offsetHeight / 2)
      isBottomDraggable = false;
      isTopDraggable = false;
    }

    /**
     * @param {any} e
     */
    function handleDoubleClick(e) {
      console.log("Double clicked block: ")
      console.log(availBlock)
      selectedBlockID = availBlock.id;
      console.log("In double click function, Selected Block ID: " + selectedBlockID)
    }


    onMount(async() => {
        selectedBlockID = availBlock.id
    })

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
    class="task {availBlock.className} {availBlock.availability}"
    style="grid-column: {availBlock.startCol};  
    grid-row: {availBlock.startRow} / span {availBlock.len};  
    align-self: {availBlock.isBottom?'end':'center'};
    cursor: {cursor};"
    >
    <!-- {availBlock.title} -->
</div>

<style>
.ifneeded {
    background: orange !important;
}
.task {
  border-left-width: 3px;
  margin-right: 10px;
  border-left-style: solid;
  font-size: 14px;
  position: relative;
  align-self: center;
  z-index:2;
  border-radius: 15px;
  height: 100%;
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
  border-radius: 10px;
  color: #f00;
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