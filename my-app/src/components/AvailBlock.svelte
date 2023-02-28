<script>

      /**
     * @type {{ className: any; startCol: any; startRow: any; len: any; isBottom: any; title: any; }}
     */
       export let availBlock;
      /**
     * @type {HTMLElement}
     */
      let this_avail;
      $: isBottomDraggable = false;
      $: isTopDraggable = false;

      
      /**
     * @param {any} e
     */
    function handleExtendOnDrag(e) {
      let clickY = e.clientY;
      let blockTop = this_avail.offsetTop;
      let hitRadius = 15;
      let blockBottom = blockTop + this_avail.offsetHeight;

      if(blockTop + hitRadius >= clickY && blockTop <= clickY) {
        isTopDraggable = true;
        console.log("top is draggable");
      } else if(blockBottom - hitRadius <= clickY && blockBottom >= clickY) {
        isBottomDraggable = true;
        console.log("bottom is draggable");
      }
    }

    /**
     * @param {any} e
     */
    function handleMouseMove(e) {
      if (isTopDraggable && availBlock.startRow > 0) {
        availBlock.startRow -= 1;
        availBlock.len += 1;
      }
      if (isBottomDraggable) {
        availBlock.len += 1;
      }
      console.log(availBlock.len);
      console.log("Mouse moved");
    }

    /**
     * @param {any} e
     */
    function handleMouseLeave(e) {
      isBottomDraggable = false;
      console.log("leaving")
      isTopDraggable = false;
    }
</script>

<section
    on:mousedown={handleExtendOnDrag}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseLeave}
    on:mouseup={handleMouseLeave}
    bind:this={this_avail}
    class="task {availBlock.className}"
    style="grid-column: {availBlock.startCol};      
    grid-row: {availBlock.startRow} / span {availBlock.len};  
    align-self: {availBlock.isBottom?'end':'center'};"
    >
    {availBlock.title}
</section>

<style>
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
  border-radius: 14px;
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