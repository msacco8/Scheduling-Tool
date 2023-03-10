<script>
// @ts-nocheck

    import { afterUpdate } from 'svelte'

      import MainCal from '/src/components/MainCal.svelte'
      import RightPanel from '/src/components/RightPanel.svelte'

      export let timeBlocksMatrix

       /**
     * @type {{ username: any; }}
     */
      export let data;

      let selectedBlockID = '';
      let JsonAvailStore = JSON.parse("{}");
      if (localStorage.getItem("availabilitiesStore") != "") {
            JsonAvailStore = JSON.parse(localStorage.getItem("availabilitiesStore") || "{}")
      }

      let JsonTimeStore = JSON.parse("{}");
      if (localStorage.getItem("timeStore") != "") {
            JsonTimeStore = JSON.parse(localStorage.getItem("timeStore") || "{}")
      }


      /**
     * @type {any[]}
     */
      let newEmptyAvailability = JsonAvailStore[data.username] ? JsonAvailStore[data.username] : [];
      let availabilities = JSON.stringify(JsonAvailStore) != "{}" ? newEmptyAvailability : [];
      /**
     * @type {{ clickToAddNewAvailability: () => any; }}
     */
      let mainCal;
</script>
<link href='https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,100;0,200;0,300;0,600;1,100;1,200;1,700' rel='stylesheet'>

<body>
      <div class="leftpanel">
            <h1 style="font-weight: 600;margin-left: 18px;">Scheduling a Meeting</h1>
            <div class="subheader">
                  <p>February 28-34, 2023</p>
                  <button on:click={() => mainCal.clickToAddNewAvailability()} class="button">+ Add New Availablity</button>
            </div>
            <!-- 
            MainCal Concept
            -->
            <MainCal
                  bind:selectedBlockID={selectedBlockID}
                  bind:availabilities={availabilities}
                  bind:timeBlocksMatrix={timeBlocksMatrix}
                  bind:this={mainCal}
                  bind:JsonAvailStore={JsonAvailStore}
                  bind:username={data.username}
            />
      </div>
      <!-- 
      RightPanel Concept
      -->
      <RightPanel 
      username={data.username}
      bind:JsonTimeStore={JsonTimeStore}
      bind:timeBlocksMatrix={timeBlocksMatrix}
      bind:JsonAvailStore={JsonAvailStore}
      bind:selectedBlockID={selectedBlockID}
      bind:availabilities={availabilities}
      />
</body>


<style>
body{
      font-family: 'Montserrat';
      background-color: #F9FAFC; 
      display: flex;
      flex-wrap: wrap;  
      justify-content: space-between;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      margin: 0px;
 }   
 .subheader{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;    
      font-weight: 600;
      margin-left: 18px;
 }
 .leftpanel{
      justify-content: space-between;
      width: 70%;
 }
 .button{
        width: 20%;
        height: 47px;
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
      width: 20%;
      height: 47px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>