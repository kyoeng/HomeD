<script lang="ts">
    import { threeStore } from "$stores/workspaceStore";

    // select state
    let selectState = $state("build");

    // list select state
    let listSelectState = $state<null | number>(null);


    // category btn click 이벤트
    const categoryBtnClickEvt = (e: Event) => {
        const btnType = (e.currentTarget as HTMLElement).dataset.type as string;
        if (selectState !== btnType) selectState = btnType;
    };


    // list btn click 이벤트
    const listBtnClickEvt = (e: Event, obj: any, idx: number) => {
        if ($threeStore?.focusObject === obj) threeStore.changeFocusObj(null);
        else threeStore.changeFocusObj(obj);

        if (listSelectState !== idx) listSelectState = idx;
        else listSelectState = null;
    };
</script>




<!-- list snippet -->
{#snippet list(obj: any, idx: number)}
    <button class="list-btn bg-base bd-r-10 font-EB" class:select={listSelectState === idx}
    onclick={(e) => listBtnClickEvt(e, obj, idx)}>
        {obj.name}
    </button>
{/snippet}

<!-- empty snippet -->
{#snippet empty()}
    <p class="empty-info">추가된 요소가 없습니다.</p>
{/snippet}

<div id="control-bar-container" class="bg-fff bd-r-10 shadow">
    <p id="control-title" class="font-EB">내 작업 목록</p>

    <div id="category-wrapper" class="bg-base">
        <button data-type="build" onclick={categoryBtnClickEvt}
        class="category-btn font-B shadow-light bd-r-5" class:select={selectState === "build"}>
            빌드
        </button>

        <button data-type="furniture" onclick={categoryBtnClickEvt}
        class="category-btn font-B shadow-light bd-r-5" class:select={selectState === "furniture"}>
            가구
        </button>
    </div>

    {#if $threeStore?.objectList}
        <div id="list-wrapper">
            <!-- 빌드 리스트 -->
            {#if selectState === "build"}
                {#if $threeStore?.objectList.build.length > 0}
                    {#each $threeStore?.objectList.build as obj, i}
                        {@render list(obj, i)}
                    {/each}
                {:else}
                    {@render empty()}
                {/if}
            {/if}

            <!-- 가구 리스트 -->
            {#if selectState === "furniture"}
                {#if $threeStore?.objectList.furniture.length > 0}
                    {#each $threeStore?.objectList.furniture as obj, i}
                        {@render list(obj, i)}
                    {/each}
                {:else}
                    {@render empty()}
                {/if}
            {/if}
        </div>
    {/if}
</div>






<style lang="scss">
    #control-bar-container {
        width: 300px;
        position: absolute;
        right: 15px;
        top: 140px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 1000;


        #control-title {
            width: 100%;
            font-size: 1.3rem;
            padding: 20px 15px;
            text-align: center;
        }


        #category-wrapper {
            width: 100%;
            height: 60px;
            padding: 10px;
            display: flex;
            gap: 10px;


            .category-btn {
                flex: 1;
                height: 100%;
                font-size: 1.3rem;
                cursor: pointer;
            }
            .category-btn.select {
                background-color: #04a9f5;
                color: #ffffff;
            }
        }


        #list-wrapper {
            width: 100%;
            padding: 10px;
            display: flex;
            gap: 3px;
            flex-direction: column;


            .list-btn {
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: flex-start;
                padding-left: 15px;
                align-items: center;
                font-size: 1.2rem;
                cursor: pointer;
                border: 1px solid #00000028;
            }
            .list-btn.select {
                color: #04a9f5;
                border: 1px solid #04a9f5;
            }


            .empty-info {
                font-size: 1.3rem;
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>