<script>
      // @ts-ignore
      import MainCal from '/src/components/MainCal.svelte'
      // @ts-ignore
      import RightPanel from '/src/components/RightPanel.svelte'

       /**
     * @type {{ username: any; }}
     */
        export let data;
</script>

<div>
      <div class="home">
            <div>
                  <h1>Scheduling a Meeting</h1>
                  <p>February 28-34, 2023</p>
                  <MainCal/>
            </div>
            <RightPanel username={data.username}/>
      </div>
</div>

<style>
 .home {
      display: flex;
      flex-wrap: wrap;  
      background-color: #F9FAFC;  
 }   
</style>