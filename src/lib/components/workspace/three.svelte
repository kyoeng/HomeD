<script lang="ts">
    import { threeStore } from "$stores/workspaceStore";
    import { onDestroy, onMount } from "svelte";
    


    // err info state
    let errState = $state(false);

    // three container
    let container: HTMLDivElement;
    

    // onMount()
    onMount(async () => {
        // three store 초기화 및 에러 처리
        if (!await threeStore.init(container)) {
            errState = true;
            return;
        }

        window.addEventListener("resize", () => threeStore.resizeEvt(container));
        window.addEventListener("keydown", threeStore.keydownEvt);
        window.addEventListener("keyup", threeStore.keyupEvt);
        $threeStore?.renderer.domElement.addEventListener("mousedown", threeStore.mousedownEvt);
        $threeStore?.renderer.domElement.addEventListener("mousemove", threeStore.mousemoveEvt);
        $threeStore?.renderer.domElement.addEventListener("mouseup", threeStore.mouseupEvt);
    });

    // onDestroy()
    onDestroy(() => {
        if (!errState) {
            window.removeEventListener("resize", () => threeStore.resizeEvt(container));
            window.removeEventListener("keydown", threeStore.keydownEvt);
            window.removeEventListener("keyup", threeStore.keyupEvt);
            $threeStore?.renderer.domElement.removeEventListener("mousedown", threeStore.mousedownEvt);
            $threeStore?.renderer.domElement.removeEventListener("mousemove", threeStore.mousemoveEvt);
            $threeStore?.renderer.domElement.removeEventListener("mouseup", threeStore.mouseupEvt);
        }
    });
</script>




{#if errState}
    <p id="err-info" class="bg-base font-B">
        에러가 발생했습니다. 다시 시도해주세요.
    </p>
{/if}

<div id="three-container" bind:this={container}></div>




<style lang="scss">
    #err-info {
        position: fixed;
        width: 100%;
        height: calc(100% - 60px);
        left: 0;
        top: 60px;
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    }

    #three-container {
        position: fixed;
        width: 100%;
        height: calc(100% - 60px);
        left: 0;
        top: 60px;
    }
</style>