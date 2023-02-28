<script>
      import MainCal from '/src/components/MainCal.svelte'
      import RightPanel from '/src/components/RightPanel.svelte'
</script>

<div>
      <div class="home">
            <div>
                  <h1>Scheduling a Meeting</h1>
                  <p>February 28-34, 2023</p>
                  <MainCal/>
            </div>
            <RightPanel/>
      </div>
</div>

<style>
 .home {
      display: flex;
      flex-wrap: wrap;  
      background-color: #F9FAFC;  
 }   
</style>