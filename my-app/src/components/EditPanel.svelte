<script>
// @ts-nocheck

    import { beforeUpdate, afterUpdate, onMount } from 'svelte';
    /**
     * @type {string}
     */
    export let selectedBlockID;
     /**
     * @type {any[]}
     */
    export let availabilities;

    // let currentBlock = availabilities.find(el => el.id === selectedBlockID)
    let currentBlockIndex;
    /**
     * @type {any}
     */
    let currentBlock;
    let currentStart;
    let currentEnd;
    // currentStart = getStart(currentBlock.startRow) ? currentBlock : '';
    // currentEnd = getStart(currentBlock.startRow + currentBlock.len) ? currentBlock : '';
    // @ts-ignore
    function handleSubmit(event) {
        const formData = new FormData(event.target)

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            // @ts-ignore
            data[key] = value;
        }
        console.log(data)

        // update fields of selected block
        let newTimes = getLength(data.start, data.end)
        currentBlock.startRow = newTimes[0] + 1
        currentBlock.len = newTimes[1]
        currentBlock.location = data.location;
        currentBlock.availability = data.availability;
        
        availabilities = availabilitiesmatrixRow.push(0);

        console.log("submitted")
    }
     // @ts-ignore
    beforeUpdate(() => {
        if (selectedBlockID) {
            currentBlock = availabilities.find(el => el.id === selectedBlockID)
            console.log(currentBlock.startRow)
            currentStart = getStart(currentBlock.startRow);
            currentEnd = getStart(currentBlock.startRow + currentBlock.len);
        }
     })

     function getStart(row) {
        // need to get a string like "hh:mm" from start row
        let minutes = (parseInt(row) * 15) - 15; //some integer
        let m = minutes % 60;
        let h = (minutes-m)/60;
        let HHMM = (h < 10 ? "0" : "") + h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();
        console.log(HHMM)
        return HHMM
     }

     function getLength(start, end) {
        let [hStart, mStart] = start.split(":");
        let [hEnd, mEnd]= end.split(":");
        hStart = parseInt(hStart);
        mStart = parseInt(mStart);
        hEnd = parseInt(hEnd);
        mEnd = parseInt(mEnd);
        // console.log("start hours" + hStart);
        // console.log("start minutes" + mStart);
        let startBlocks = (hStart * 4) + Math.floor(mStart / 15)
        let endBlocks = (hEnd * 4) + Math.floor(mEnd / 15)
        console.log(startBlocks) 
        console.log(endBlocks)
        return [startBlocks, endBlocks - startBlocks]
        
     }
</script>

<div class='edit-container'>
    {#if selectedBlockID != ""}
        <h2 style="text-align: center">{currentBlock.day[0]} February {currentBlock.day[1]}</h2>
        <form on:submit|preventDefault={handleSubmit}>
            <label for="start">Choose a start time for this block:</label>
            <input
                class="inp time-input"
                type="time"
                id="start"
                name="start"
                min="00:00"
                max="24:00"
                step="900"
                value={currentStart}
                required
            >
            <label for="end">Choose an end time for this block:</label>
            <input
                class="inp time-input"
                type="time"
                id="end"
                name="end"
                min="00:00"
                max="24:00"
                step="900"
                value={currentEnd}
                required>
            <label for="location-select">Choose a location:</label>
            <select class="inp location-input" name="location" id="location-select">
                <option value="">--Please choose an option--</option>
                <!-- create locations object and loop to add each option -->
                <option value="virtual">Virtual</option>
            </select>
            <label for="availability-select">Choose an availability:</label>
            <select class="inp availability-input" name="availability" id="availability-select">
                <option value="">--Please choose an option--</option>
                <option value="preferred">Preferred</option>
                <option value="ifneeded">If Needed</option>
            </select>
            <input class="button submit-button" type="submit" value="Submit">
          </form>
        <!-- <p>
            {"start row: " + currentBlock.startRow}
            {"start col: " + currentBlock.startCol}
            {"id: " + currentBlock.id}
            {"location: " + currentBlock.location}
            {"availability: " + currentBlock.availability}
            {"len: " + currentBlock.len}
        </p> -->
    {:else}
        <h3>Please double click on an existing block or create a new block to edit.</h3>
    {/if}
</div>


<style>

form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.inp {
    margin: 2px;
}

.time-input {
    width: 100%
}

.submit-button {
    margin: 5px;
    width: 50%;
    height: 3vh;

}
.location-input {
    width: 100%;
    height: 3vh
}

.availability-input {
    width: 100%;
    height: 3vh
}
.edit-container {
    height: 100%;
}

</style>