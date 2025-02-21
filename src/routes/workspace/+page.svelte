<script lang="ts">
    import Header from '$components/header.svelte';
    import Toolbar from '$components/toolbar.svelte';
    import loadingStore from '$stores/loadingStore.js';
    import { onMount } from 'svelte';





    // props
    let { data } = $props();

    // history state
    let prevState = $state(false);
    let nextState = $state(false);



    // onMount()
    onMount(async () => {
        loadingStore.loadingOff();
    });
</script>






<Header>
    <div id="btn-wrapper">
        <button class="history-btn bg-fff" disabled={!prevState}>
            ⬅
        </button>

        <button class="history-btn bg-fff" disabled={!nextState}>
            ⮕
        </button>
    </div>
</Header>

<Toolbar />





<style lang="scss">
    #btn-wrapper {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;


        .history-btn {
            width: 44px;
            height: 100%;
            font-size: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;

            &:not(:disabled):hover {
                color: #04a9f5;
                cursor: pointer;
            }
        }
    }
</style>