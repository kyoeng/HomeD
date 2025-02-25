<script lang="ts">
    import Loading from "$components/loading.svelte";
    import loadingStore from "$stores/loadingStore";
    import { beforeNavigate } from "$app/navigation";
    import { page } from "$app/state";




    // props
    let { children } = $props();

    // Mobile 기기로 접속했는지 확인
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);




    // beforeNavigate()
    beforeNavigate(({to, cancel}) => {
        const currentPath = page.url.pathname;

        // 현재 페이지와 이동할 페이지가 동일한지 비교 (다르면 로딩화면 on)
        if (to?.url.pathname === currentPath) cancel();
        else loadingStore.loadingOn();
    });
</script>





{#if isMobile}
    <div id="mobile-info-container">
        <p id="mobile-info-text">해당 사이트는 모바일 기기를 지원하지 않습니다.</p>
    </div>
{:else}
    {#if $loadingStore}
        <Loading />
    {/if}

    <div id="layout-container">
        {@render children()}
    </div>
{/if}





<style lang="scss">
    #mobile-info-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        #mobile-info-text { font-size: 1.6rem; }
    }


    #layout-container {
        width: 100%;
        height: 100%;
        min-width: 1240px;
        min-height: 1024px;



        :global(.limit) {
            width: 100%;
            max-width: 1240px;
            margin: 0 auto;
        }

        :global(.bd-r-5) { border-radius: 5px; }
        :global(.bd-r-10) { border-radius: 10px; }

        :global(.bd) { border: 1px solid rgba($color: #000000, $alpha: 0.23); }
        :global(.bd-thick) { border: 1px solid rgba($color: #000000, $alpha: 23); }
        :global(.bd-blue) { border: 1px solid rgba($color: #04a9f5, $alpha: 1); }
        :global(.bd-blue-thick) { border: 1px solid rgba($color: #04a9f5, $alpha: 1); }

        :global(.font-B) { font-family: "NanumSquareRoundBold"; }
        :global(.font-EB) { font-family: "NanumSquareRoundExtraBold"; }

        :global(.font-fff) { color: #ffffff; }
        :global(.font-blue) { color: #04a9f5; }

        :global(.bg-fff) { background-color: #ffffff; }
        :global(.bg-blue) { background-color: #04a9f5; }
        :global(.bg-base) { background-color: #edf8fe; }

        :global(.shadow) { box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.4); }
        :global(.shadow-light) { box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.25); }
        :global(.shadow-10) { box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.4); }
    }
</style>