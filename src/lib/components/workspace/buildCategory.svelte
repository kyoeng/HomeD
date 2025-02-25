<script lang="ts">
    import roomIcon from "$assets/images/room-icon.svg";
    import selectRoomIcon from "$assets/images/room-icon-select.svg";
    import floorIcon from "$assets/images/floor-icon.svg";
    import selectFloorIcon from "$assets/images/floor-icon-select.svg";
    import wallIcon from "$assets/images/wall-icon.svg";
    import selectWallIcon from "$assets/images/wall-icon-select.svg";
    import { threeStore } from "$stores/workspaceStore";



    // select state
    let selectState = $state<string | null>(null);

    // input state
    let x = $state<number | null>(null);
    let y = $state<number | null>(null);
    let z = $state<number | null>(null);


    // build btn click 이벤트
    const buildBtnClickEvt = (e: Event) => {
        const btnType = (e.currentTarget as HTMLElement).dataset.type as string;

        if (selectState !== btnType) selectState = btnType;
        else selectState = null;

        x = null;
        y = null;
        z = null;
    };


    // input oninput 이벤트
    const oninputEvt = (e: Event, type: string) => {
        const onlyNumbers = /^[0-9]+$/;
        const inputEl = e.target as HTMLInputElement;

        if (!onlyNumbers.test(inputEl.value)) {
            inputEl.value = inputEl.value.replace(/[^0-9]/g, '');
        }

        switch (type) {
            case 'x':
                x = parseInt(inputEl.value, 10);
                break;
        
            case 'y':
                y = parseInt(inputEl.value, 10);
                break;
        
            case 'z':
                z = parseInt(inputEl.value, 10);
                break;
        
            default:
                break;
        }
    }


    // 생성 버튼 click 이벤트
    const create = () => {
        
    }
</script>





<div id="build-container" class="tool-container bg-fff bd-r-10 shadow">
    <p id="build-title" class="font-EB">빌드 &#40;Build&#41;</p>


    <div id="build-btn-wrapper">
        <button data-type="room" onclick={buildBtnClickEvt}
        class="build-btn bg-base font-B bd-r-5 shadow-light" class:select={selectState === "room"}>
            <img src="{selectState === "room" ? selectRoomIcon : roomIcon}" alt="floor-icon">
            방 &#40;Room&#41;
        </button>

        <button data-type="floor" onclick={buildBtnClickEvt}
        class="build-btn bg-base font-B bd-r-5 shadow-light" class:select={selectState === "floor"}>
            <img src="{selectState === "floor" ? selectFloorIcon : floorIcon}" alt="floor-icon">
            바닥 &#40;Floor&#41;
        </button>
    
        <button data-type="wall" onclick={buildBtnClickEvt}
        class="build-btn bg-base font-B bd-r-5 shadow-light" class:select={selectState === "wall"}>
            <img src="{selectState === "wall" ? selectWallIcon : wallIcon}" alt="wall-icon">
            벽 &#40;Wall&#41;
        </button>
    </div>

    
    <div id="building-area" class="bg-base">
        <div class="area-wrapper">
            {#if selectState === "room"}
                <p class="area-title font-EB">방&#40;Room&#41; 생성</p>

                <p class="input-name">가로</p>
                <div class="input-box">
                    <input class="bd" type="text" placeholder="cm" oninput={(e) => oninputEvt(e, 'x')}>
                </div>

                <p class="input-name">세로</p>
                <div class="input-box">
                    <input class="bd" type="number" placeholder="cm">
                </div>

                <p class="input-name">높이</p>
                <div class="input-box">
                    <input class="bd" type="number" placeholder="cm">
                </div>
            {/if}

            {#if selectState === "floor"}
                <p class="area-title font-EB">바닥&#40;Floor&#41; 생성</p>

                <p class="input-name">가로</p>
                <div class="input-box">
                    <input class="bd" type="number"  placeholder="cm">
                </div>

                <p class="input-name">세로</p>
                <div class="input-box">
                    <input class="bd" type="number" placeholder="cm">
                </div>
            {/if}

            {#if selectState === "wall"}
                <p class="area-title font-EB">벽&#40;Wall&#41; 생성</p>

                <p class="input-name">길이</p>
                <div class="input-box">
                    <input class="bd" type="number"  placeholder="cm">
                </div>

                <p class="input-name">높이</p>
                <div class="input-box">
                    <input class="bd" type="number" placeholder="cm">
                </div>

                <p class="input-name">두께</p>
                <div class="input-box">
                    <input class="bd" type="number" placeholder="cm">
                </div>
            {/if}

            {#if selectState !== null}
                <button class="create-btn font-B bg-fff font-blue bd-blue-thick bd-r-10"
                onclick={create}>
                    생성
                </button>
            {/if}
        </div>
    </div>
</div>





<style lang="scss">
    #build-container {
        position: fixed;
        left: 100px;
        top: 75px;
        width: 250px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        overflow: hidden;


        // 타이틀
        #build-title {
            font-size: 1.6rem;
            margin: 30px 0;
            padding: 0 15px;
        }

    
        // 버튼
        #build-btn-wrapper {
            display: flex;
            flex-direction: column;
            padding: 0 15px 15px 15px;
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

                
        // 입력 영역
        #building-area {
            width: 100%;
            padding: 30px 15px;
            border-top: 1px solid rgba($color: #000000, $alpha: 0.15);


            .area-wrapper {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;


                .area-title {
                    font-size: 1.5rem;
                    margin-bottom: 30px;
                }


                .input-name {
                    font-size: 1.3rem;
                    margin-bottom: 5px;
                }


                .input-box {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:not(:last-of-type) { margin-bottom: 15px; }
                    &:last-of-type { margin-bottom: 30px; }


                    input {
                        flex: 1;
                        height: 100%;
                        padding: 5px 10px;
                        font-size: 1.4rem;
                    }
                }


                .create-btn {
                    width: 100%;
                    height: 40px;
                    font-size: 1.4rem;
                    cursor: pointer;
                }
            }
        }
    }
</style>