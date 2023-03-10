<script>
    // @ts-ignore
    import GroupCal from '/src/components/GroupCal.svelte'


    /**
     * @type {any[]}
     */
    let timeCountsMatrix = [];
    var JsonAvailStore = JSON.parse(localStorage.getItem("availabilitiesStore") || "{}");
    var groupAvailabilities = JSON.stringify(JsonAvailStore) != "{}" ? JsonAvailStore : {};

    function bestTime() {
        let mx = 0;
        for (var i = 0; i < 48; i++) {
            let matrixRow = [];
            for (var j = 0; j < 8; j++) {
            // Note the structure of a time block
                matrixRow.push(0);
                matrixRow.push(0);
            }
            timeCountsMatrix.push(matrixRow);
        }

        // Getting count of each availability time
        for (let person in groupAvailabilities) {
            for (let index in groupAvailabilities[person]) {
                let jsonBlock = groupAvailabilities[person][index];
                for (let i = 0; i < jsonBlock.len; i++) {
                    let weight = jsonBlock.availability == "preferred" ? 1 : 0.5;
                    timeCountsMatrix[jsonBlock.startRow + i][jsonBlock.startCol] += weight;
                    mx = Math.max(mx, timeCountsMatrix[jsonBlock.startRow + i][jsonBlock.startCol])
                }
            }
        }

        let maxOfEachDay = [];
        for (var col = 0; col < 8; col++) {
            let thisDay = [];
            for (var row = 0; row < 48; row++) {
                if (timeCountsMatrix[row][col] == mx) {
                    thisDay.push(row);
                }
            }
            maxOfEachDay.push(thisDay)
        }

        let day = 0;
        for (let i = 0; i < maxOfEachDay.length; i++) {
            if (maxOfEachDay[day].length < maxOfEachDay[i].length) {
                day = i;
            }
        }
        let days = ["", "Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
        let meetingDay = days[day-1];
        let minutes = (maxOfEachDay[day][0]-1 + 32) * 15;
        let start = ""
        let end = ""
        let startMeridian = ""
        let endMeridian = ""

        if (minutes < (12 * 4 * 15)) {
            startMeridian = "AM";
        } else {
            startMeridian = "PM";
        }

        if (minutes % 60 == 0) {
            start=(minutes / 60) % 12 == 0 ? "12:00" : (minutes / 60) % 12 + ":00";
        } else if (minutes % 60 == 30) {
            start=((minutes-30) / 60) % 12 == 0 ? "12:30" : ((minutes-30) / 60) % 12 + ":30";
        } else if (minutes % 60 == 45) {
            start=((minutes-45) / 60) % 12 == 0 ? "12:45" : ((minutes-45) / 60) % 12 + ":45";
        } else {
            start=((minutes-15) / 60) % 12 == 0 ? "12:15" : ((minutes-15) / 60) % 12 + ":15";
        }

        minutes += 15 * (maxOfEachDay[day][maxOfEachDay[day].length-1] - maxOfEachDay[day][0] +1)

        if ((maxOfEachDay[day][maxOfEachDay[day].length-1] - maxOfEachDay[day][0] +1) < 2) {
            return "No Available Time";
        }

        if (minutes < (12 * 4 * 15)) {
            endMeridian = "AM";
        } else {
            endMeridian = "PM";
        }

        if (minutes % 60 == 0) {
            end=(minutes / 60) % 12 == 0 ? "12:00" : (minutes / 60) % 12 + ":00";
        } else if (minutes % 60 == 30) {
            end=((minutes-30) / 60) % 12 == 0 ? "12:30" : ((minutes-30) / 60) % 12 + ":30";
        } else if (minutes % 60 == 45) {
            end=((minutes-45) / 60) % 12 == 0 ? "12:45" : ((minutes-45) / 60) % 12 + ":45";
        } else {
            end=((minutes-15) / 60) % 12 == 0 ? "12:15" : ((minutes-15) / 60) % 12 + ":15";
        }
        return meetingDay + " " + start + " " + startMeridian + " - " + end + " " + endMeridian;
    }

    let meetingTime = bestTime();

</script>
<link href='https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,100;0,200;0,300;0,600;1,100;1,200;1,700' rel='stylesheet'>

<body>
    <div class="center-panel">
        <div class="panel-body">
            <div>
                <h1 style="margin-top:20px; font-weight: 600px;">Thank you!</h1>
            </div>
            
            <div>
                <p>Below is the groups current availability and the current<br>best time interval for a 30 min meeting</p>
            </div>
            <div class="groupcal-container">
                <!-- 
                GroupCal Concept
                -->
                <GroupCal/>
            </div>
             <div style="margin-bottom:10px;">
                Any 30 minute meeting within the following time interval <br>will work for most people in the group: <br><b>{meetingTime}</b>
             </div >
             <a href="/"><buton>Return to Landing Page</buton></a>
        </div>
    </div>
</body>



<style>
    body{
        font-family: 'Montserrat';
        background-color: #F9FAFC; 
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        vertical-align: bottom;
        position: relative;
        margin-top: 0px;
    } 
    .center-panel {
        position: absolute;
        bottom: 0;
        background-color: white; 
        width: 50%;
        height: 90%;
        border-radius: 20px 20px 0px 0px;
        filter: drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.15));
    }
    .panel-body{
        text-align: center;
    }
    .groupcal-container {
        margin-top: 20px;
        margin-bottom: 15px;
        padding: 15px;
        box-shadow: 0px 0px 0px 1px #E4E4E4;
        border-radius: 8px;
        display: flex;
        flex-wrap: wrap;  
        align-items: center;
        height: 400px;
        width: 48%;
        display: inline-block;
    }
</style>