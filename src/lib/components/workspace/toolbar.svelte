<script lang="ts">
    import buildIcon from "$assets/images/build-icon.svg";
    import selectBuildIcon from "$assets/images/build-icon-select.svg";
    import furnitureIcon from "$assets/images/furniture-icon.svg";
    import selectFurnitureIcon from "$assets/images/furniture-icon-select.svg";
    import { categoryStateStore } from "$stores/workspaceStore";


    // 버튼 click 이벤트
    const btnClickEvt = (e: Event) => {
        const btnType = (e.currentTarget as HTMLElement).dataset.type as string;

        if ($categoryStateStore !== btnType) categoryStateStore.set(btnType);
        else categoryStateStore.set(null);
    }
</script>




<!-- toolbar -->
<div id="toolbar-container" class="bg-fff bd-r-10 shadow">
    <button class="tool-btn bg-fff font-EB bd-r-10" class:select={$categoryStateStore === "build"} 
    data-type="build" onclick={btnClickEvt}>
        <img src="{$categoryStateStore === "build" ? selectBuildIcon : buildIcon}" alt="build-icon">
        빌드
    </button>

    <button class="tool-btn bg-fff font-EB bd-r-10" class:select={$categoryStateStore === "furniture"} 
    data-type="furniture" onclick={btnClickEvt}>
        <img src="{$categoryStateStore === "furniture" ? selectFurnitureIcon : furnitureIcon}" alt="furniture-icon">
        가구
    </button>
</div>





<style lang="scss">
    #toolbar-container {
        position: fixed;
        left: 15px;
        top: 75px;
        width: 70px;
        padding: 7px;
        display: flex;
        flex-direction: column;
        z-index: 1000;


        .tool-btn {
            width: 100%;
            height: 56px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            font-size: 1.2rem;
            cursor: pointer;


            img {
                width: 23px;
                height: 23px;
            }
        }
        .tool-btn.select {
            background-color: #04a9f5;
            color: #ffffff;
        }
    }
</style>