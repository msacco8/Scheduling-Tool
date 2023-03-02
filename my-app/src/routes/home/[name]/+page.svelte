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
</script>
<body>
      <div class="leftpanel">
            <h1>Scheduling a Meeting</h1>
            <div class="subheader">
                  <p>February 28-34, 2023</p>
                  <button>Add new</button>
            </div>
            <MainCal
                  bind:selectedBlockID={selectedBlockID}
                  bind:availabilities={availabilities}
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
</style>