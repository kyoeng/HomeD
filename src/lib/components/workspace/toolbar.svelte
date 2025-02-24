<script lang="ts">
    import buildIcon from "$assets/images/build-icon.svg";
    import selectBuildIcon from "$assets/images/build-icon-select.svg";
    import furnitureIcon from "$assets/images/furniture-icon.svg";
    import selectFurnitureIcon from "$assets/images/furniture-icon-select.svg";
    import floorIcon from "$assets/images/floor-icon.svg";
    import selectFloorIcon from "$assets/images/floor-icon-select.svg";
    import wallIcon from "$assets/images/wall-icon.svg";
    import selectWallIcon from "$assets/images/wall-icon-select.svg";
    import doorIcon from "$assets/images/door-icon.svg";
    import selectDoorIcon from "$assets/images/door-icon-select.svg";
    import { buildSelectStateStore, selectStateStore } from "$stores/workspaceStore";


    // 버튼 click 이벤트
    const btnClickEvt = (e: Event) => {
        const btnType = (e.currentTarget as HTMLElement).dataset.type as string;

        if ($selectStateStore !== btnType) selectStateStore.set(btnType);
        else selectStateStore.set(null);
    }


    // 빌드 카테고리 버튼 click 이벤트
    const buildBtnsClickEvt = (e: Event) => {
        const btnType = (e.currentTarget as HTMLElement).dataset.type as string;

        if ($buildSelectStateStore !== btnType) buildSelectStateStore.set(btnType);
        else buildSelectStateStore.set(null);
    }
</script>




<!-- toolbar -->
<div id="toolbar-container" class="bg-fff bd-r-10 shadow">
    <button class="tool-btn bg-fff font-EB bd-r-10" class:select={$selectStateStore === "build"} 
    data-type="build" onclick={btnClickEvt}>
        <img src="{$selectStateStore === "build" ? selectBuildIcon : buildIcon}" alt="build-icon">
        빌드
    </button>

    <button class="tool-btn bg-fff font-EB bd-r-10" class:select={$selectStateStore === "furniture"} 
    data-type="furniture" onclick={btnClickEvt}>
        <img src="{$selectStateStore === "furniture" ? selectFurnitureIcon : furnitureIcon}" alt="furniture-icon">
        가구
    </button>
</div>


{#if $selectStateStore === "build"}
    <div id="build-container" class="tool-container bg-fff bd-r-10 shadow">
        <p class="tool-title font-EB">빌드 &#40;Build&#41;</p>

        <div id="building-area" class="bg-base">

        </div>

        <div id="build-btn-wrapper">
            <button onclick={buildBtnsClickEvt} data-type="floor"
            class="build-btn bg-base font-B bd-r-5 shadow-light" class:select={$buildSelectStateStore === "floor"}>
                <img src="{$buildSelectStateStore === "floor" ? selectFloorIcon : floorIcon}" alt="floor-icon">
                바닥
            </button>
        
            <button onclick={buildBtnsClickEvt} data-type="wall"
            class="build-btn bg-base font-B bd-r-5 shadow-light" class:select={$buildSelectStateStore === "wall"}>
                <img src="{$buildSelectStateStore === "wall" ? selectWallIcon : wallIcon}" alt="wall-icon">
                벽
            </button>
        
            <button onclick={buildBtnsClickEvt} data-type="door"
            class="build-btn bg-base font-B bd-r-5 shadow-light" class:select={$buildSelectStateStore === "door"}>
                <img src="{$buildSelectStateStore === "door" ? selectDoorIcon : doorIcon}" alt="door-icon">
                문
            </button>
        </div>
    </div>
{/if}





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


    .tool-container {
        position: fixed;
        left: 100px;
        top: 75px;
        width: 250px;
        z-index: 1000;
        display: flex;
        flex-direction: column;


        .tool-title {
            font-size: 1.6rem;
            margin: 30px 0;
            padding: 0 15px;
        }
    }



    #build-container {


        #building-area {
            width: 100%;
            padding: 30px 15px;
            border-top: 1px solid rgba($color: #000000, $alpha: 0.15);
            border-bottom: 1px solid rgba($color: #000000, $alpha: 0.15);
        }
    
    
        #build-btn-wrapper {
            display: flex;
            flex-direction: column;
            padding: 15px;
            gap: 15px;
    
    
            .build-btn {
                width: 100%;
                height: 45px;
                font-size: 1.4rem;
                padding: 0 10px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;
                cursor: pointer;
    
    
                img {
                    width: 20px;
                    height: 20px;
                }
            }
            .build-btn.select {
                background-color: #04a9f5;
                color: #ffffff;
            }
        }
    }
</style>