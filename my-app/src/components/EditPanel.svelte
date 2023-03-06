<script>
// @ts-nocheck

    import { beforeUpdate, afterUpdate, onMount } from 'svelte';
    import GroupCal from './GroupCal.svelte';
    /**
     * @type {string}
     */
    export let selectedBlockID;
    export let timeBlocksMatrix;
     /**
     * @type {any[]}
     */
    export let availabilities;

    export let username;

    let dayNames = [[["Sun", "28"], 2], [["Mon", "29"], 3], [["Tue", "30"], 4], [["Wed", "31"], 5], [["Thu", "32"], 6], [["Fri", "33"], 7], [["Sat", "34"], 8]];

    let JsonAvailStore = JSON.parse("{}");
    if (localStorage.getItem("availabilitiesStore") != "") {
        JsonAvailStore = JSON.parse(localStorage.getItem("availabilitiesStore") || "{}")
    }

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

        let newDays = data.day.split(',')
        console.log(newDays)

        for (let i = 0; i < currentBlock.len; i++) {
            timeBlocksMatrix[currentBlock.startRow+i][currentBlock.startCol] = 0;
        }

        // update fields of selected block
        let newTimes = getLength(data.start, data.end)
        currentBlock.startRow = newTimes[0] + 1
        currentBlock.len = newTimes[1]
        currentBlock.location = data.location;
        currentBlock.availability = data.availability;
        currentBlock.day = newDays.slice(0,2);
        currentBlock.startCol = newDays[2];
        console.log(data.day)

        for (let i = 0; i < currentBlock.len; i++) {
            timeBlocksMatrix[currentBlock.startRow+i][currentBlock.startCol] = 1;
        }

        selectedBlockID = '';
        availabilities = availabilities;
        updateLocalStorageAvailabilities()

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
        let h = 8 + (minutes-m)/60;
        let HHMM = (h < 10 ? "0" : "") + h.toString() + ":" + (m < 10 ? "0" : "") + m.toString();
        console.log(HHMM)
        return HHMM
     }

    function updateLocalStorageAvailabilities() {
        JsonAvailStore[username] = availabilities;
        JsonAvailStore = JsonAvailStore;
        localStorage.setItem("availabilitiesStore", JSON.stringify(JsonAvailStore));
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
        let startBlocks = (hStart * 4) + Math.floor(mStart / 15) - 32;
        let endBlocks = (hEnd * 4) + Math.floor(mEnd / 15) - 32;
        console.log(startBlocks) 
        console.log(endBlocks)
        return [startBlocks, endBlocks - startBlocks]
     }

     function handleDelete() {
        console.log(currentBlock.id)
        console.log(timeBlocksMatrix)
        for (let i = 0; i < currentBlock.len; i++) {
            timeBlocksMatrix[currentBlock.startRow+i][currentBlock.startCol] = 0;
        }
        availabilities = availabilities.filter(el => el.id != currentBlock.id)
        selectedBlockID = ''
        updateLocalStorageAvailabilities()
     }

</script>
<link href='https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,100;0,200;0,300;0,600;1,100;1,200;1,700' rel='stylesheet'>

<div class='edit-container'>
    {#if selectedBlockID != ""}
        <p style="font-weight: 600; margin-bottom: 10px">{currentBlock.day[0]} February {currentBlock.day[1]} Availability</p>
        <form on:submit|preventDefault={handleSubmit}>
            <label class="inp-label" for="day-select">Choose a day for this block:</label>
            <select class="inp day-input" name="day" id="day-select">
                {#each dayNames as day}
                    {#if currentBlock.day[0] === day[0][0]}
                        <option value={day} selected>{day[0][0] + ', ' + day[0][1]}</option>
                    {:else}
                        <option value={day}>{day[0][0] + ', ' + day[0][1]}</option>
                    {/if}
                {/each}
            </select>
            <label class="inp-label" for="start">Choose a start time for this block:</label>
            <input
                class="inp time-input"
                type="time"
                id="start"
                name="start"
                min="08:00"
                max="20:00"
                step="900"
                value={currentStart}
                required
            >
            <label class="inp-label" for="end">Choose an end time for this block:</label>
            <input
                class="inp time-input"
                type="time"
                id="end"
                name="end"
                min={currentStart}
                max="20:00"
                step="900"
                value={currentEnd}
                required>
            <label class="inp-label" for="location-text">Choose a location:</label>
            <input type="text" class="inp location-input" name="location" id="location-text" value={currentBlock.location}>
            <label class="inp-label" for="availability-select">Choose an availability:</label>
            <select class="inp availability-input" name="availability" id="availability-select">
                <!-- <option value="">--Please choose an option--</option> -->
                <option value="preferred" selected={currentBlock.availability === 1 ? "selected" : '' }>Preferred</option>
                <option value="ifneeded" selected={currentBlock.availability === "ifneeded" ? "selected" : '' }>If Needed</option>
            </select>
            <input class="button" type="submit" value="Save">
            <button style="margin-left: 65px;" type="button" class="button" on:click={handleDelete}>Delete</button>
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
        <GroupCal/>
    {/if}
</div>


<style>

.inp-label {
    
}

form {
    display: flex;
    flex-wrap: wrap;
}

.inp {
    margin: 2px;
    margin-bottom: 10px;
    background: #FFFFFF;
    box-shadow: 0px 0px 0px 1px #E4E4E4;
    border-radius: 8px;
    border:1px solid transparent;
}

.time-input {
    width: 100%;
}

.day-input {
    width: 100%;
    height: 3vh;
}
.location-input {
    width: 100%;
    height: 2.5vh
}

.availability-input {
    width: 100%;
    height: 3vh
}
.edit-container {
    height: 100%;
}

.button{
        width: 40%;
        border:1px solid transparent;
        color: white;
        font-size: 16px;

        background: #5272E9;
        border-radius: 5px;
    }
.button:hover {
      box-shadow: 0 5px 10px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.1);
}

.button:active {
      width: 40%;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

</style>