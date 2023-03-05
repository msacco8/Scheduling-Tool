<script>        
    let name = "";
</script>
<link href='https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,100;0,200;0,300;0,600;1,100;1,200;1,700' rel='stylesheet'>

<body>
    <div class="center-panel">
        <div class="panel-body">
            <img src="logo.png" alt="Sync logo" style="width:70px;height:70px;">
            <p style="font-weight: bold; font-size: 30px;margin-top:0px;">Welcome to Sync</p>
            <p style="margin-bottom:150px;">Enter your Full Name to continue</p>
            <input class="input-box" type="text" id="fname" name="firstname" bind:value={name}>
            {#if name != ""} 
            <a href="/home/{name}" ><button class="button">Continue</button></a>
            {:else}
                <button class="button" style="cursor: not-allowed;">Continue</button>
            {/if}
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
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px 20px 0px 0px;
        filter: drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.15));
    }
    .panel-body{
        text-align: center;
    }
    .input-box{
        width: 462px;
        height: 43px;
        border-radius: 8px;
        border:1px solid #E4E4E4
    }
    .button{
        position: absolute;
        width: 50%;
        height: 47px;
        left: 25%;
        top: 573px;
        border:1px solid transparent;
        color: white;

        background: #5272E9;
        border-radius: 5px;
    }
    .button:hover {
        box-shadow: 0 5px 10px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.1);
    }

    .button:active {
        position: absolute;
        width: 50%;
        height: 47px;
        left: 25%;
        top: 573px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
 </style>
