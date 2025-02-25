<script lang="ts">
    import Header from '$components/header.svelte';
    import BuildCategory from '$components/workspace/buildCategory.svelte';
    import OptionBar from '$components/workspace/optionBar.svelte';
    import Three from '$components/workspace/three.svelte';
    import Toolbar from '$components/workspace/toolbar.svelte';
    import loadingStore from '$stores/loadingStore.js';
    import { categoryStateStore, threeStore } from '$stores/workspaceStore.js';
    import { onMount } from 'svelte';





    // props
    let { data } = $props();

    // history state
    let prevState = $state(false);
    let nextState = $state(false);



    // onMount()
    onMount(() => {
        loadingStore.loadingOff();
    });
</script>






<Header />

<Toolbar />
<OptionBar />


{#if $categoryStateStore === "build"}
    <BuildCategory />
{/if}


<Three />