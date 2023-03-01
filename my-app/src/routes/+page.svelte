<script>
    let name = "";
</script>

<h1>Welcome to Sync</h1>
<p>Enter your Full Name to continue</p>
<input type="text" id="fname" name="firstname" bind:value={name}>
{#if name != ""}
    <p><a href="/home/{name}" >Continue</a></p>
{:else}
    <p>Continue</p>
{/if}
