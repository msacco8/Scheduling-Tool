<script>
      // @ts-ignore
      import MainCal from '/src/components/MainCal.svelte'
      // @ts-ignore
      import RightPanel from '/src/components/RightPanel.svelte'

       /**
     * @type {{ username: any; }}
     */
        export let data;

      let selectedBlockID = 'no';
      /**
     * @type {any[]}
     */
      let currentBlocks = [];
</script>

<div>
      <div class="home">
            <div>
                  <h1>Scheduling a Meeting</h1>
                  <p>February 28-34, 2023</p>
                  <MainCal
                        bind:selectedBlockID={selectedBlockID}
                        bind:currentBlocks={currentBlocks}
                  />
            </div>
            <RightPanel username={data.username} bind:selectedBlockID={selectedBlockID}/>
      </div>
</div>

<style>
 .home {
      display: flex;
      flex-wrap: wrap;  
      background-color: #F9FAFC;  
 }   
</style>