<script lang="ts">
    import { threeStore } from "$stores/workspaceStore";
</script>




<div id="option-container" class="bg-fff bd-r-10 shadow">
    <button class="option-btn bg-fff font-EB bd-r-10" class:on={$threeStore?.grid.visible}
    onclick={threeStore.gridOnOff}>
        눈금
    </button>

    <button id="center-btn" class="option-btn bg-fff font-EB bd-r-10" onclick={threeStore.cameraCenterView}>
        ✛
    </button>
</div>




<style lang="scss">
    #option-container {
        position: fixed;
        right: 15px;
        top: 75px;
        padding: 5px;
        display: flex;
        justify-content: flex-end;
        flex-direction: row-reverse;
        gap: 5px;
        z-index: 1000;


        .option-btn {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            cursor: pointer;
        }
        .option-btn.on {
            background-color: #04a9f5;
            color: #ffffff;
        }


        #center-btn { font-size: 2rem; }
    }
</style>