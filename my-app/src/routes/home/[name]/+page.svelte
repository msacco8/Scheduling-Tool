<script>
    import { afterUpdate } from 'svelte'

      // @ts-ignore
      import MainCal from '/src/components/MainCal.svelte'
      // @ts-ignore
      import RightPanel from '/src/components/RightPanel.svelte'

       /**
     * @type {{ username: any; }}
     */
      export let data;

      let selectedBlockID = '';
      /**
     * @type {any[]}
     */
      let availabilities = [];
      afterUpdate(() => {
            console.log("main page avails is: ")
            console.log(availabilities)
      })
      /**
     * @type {{ clickToAddNewAvailability: () => any; }}
     */
      let mainCal;
</script>
<body>
      <div class="leftpanel">
            <h1>Scheduling a Meeting</h1>
            <div class="subheader">
                  <p>February 28-34, 2023</p>
                  <button on:click={() => mainCal.clickToAddNewAvailability()} class="button">+ Add New Availablity</button>
            </div>
            <MainCal
                  bind:selectedBlockID={selectedBlockID}
                  bind:availabilities={availabilities}
                  bind:this={mainCal}
            />
      </div>
      <RightPanel 
      username={data.username}
      bind:selectedBlockID={selectedBlockID}
      bind:availabilities={availabilities}
      />
</body>


<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
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
 }   
 .subheader{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;   
      margin-bottom: 50px;  
 }
 .leftpanel{
      justify-content: space-between;
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