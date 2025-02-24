<script lang="ts">
    import { gridStateStore } from "$stores/workspaceStore";



    
    // 그리드 옵션 click 이벤트
    const gridOptionClickEvt = () => {
        gridStateStore.set(!$gridStateStore);
    }
</script>





<div id="option-container" class="bg-fff bd-r-10 shadow">
    <button class="option-btn bg-fff font-EB bd-r-10" class:select={$gridStateStore}
    onclick={gridOptionClickEvt}>
        눈금
    </button>
</div>






<style lang="scss">
    #option-container {
        position: fixed;
        right: 15px;
        top: 75px;
        padding: 7px;
        display: flex;
        z-index: 1000;


        .option-btn {
            width: 60px;
            height: 40px;
            font-size: 1.2rem;
            cursor: pointer;
        }
        .option-btn.select {
            background-color: #04a9f5;
            color: #ffffff;
        }
    }
</style>