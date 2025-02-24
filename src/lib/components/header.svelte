<script lang="ts">
    // props
    let { children }: any = $props();
</script>






<header id="header" class="bg-fff shadow">
    <h1 id="title">
        <span id="title-img">🏠︎</span>
        <span class="font-EB">HomeD</span>
        <a href="/" aria-label="home-link"></a>
    </h1>

    {#if children}
        {@render children()}
    {/if}
</header>






<style lang="scss">
    #header {
        position: relative;
        width: 100%;
        height: 60px;
        padding: 8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        z-index: 10000;


        #title {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            z-index: 1000;
            * { font-size: 2.6rem; }


            #title-img {
                border-radius: 50%;
                border: 3px solid #04a9f5;
                padding: 3px;
                color: #04a9f5;
            }


            a {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 100%;
            }
        }
    }
</style>