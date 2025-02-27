<script lang="ts">
    import Header from '$components/header.svelte';
    import BuildCategory from '$components/workspace/buildCategory.svelte';
    import ControlBar from '$components/workspace/controlBar.svelte';
    import OptionBar from '$components/workspace/optionBar.svelte';
    import Three from '$components/workspace/three.svelte';
    import Toolbar from '$components/workspace/toolbar.svelte';
    import loadingStore from '$stores/loadingStore.js';
    import { categoryStateStore, threeStore } from '$stores/workspaceStore.js';
    import { onMount } from 'svelte';





    // props
    let { data } = $props();


    // onMount()
    onMount(() => {
        loadingStore.loadingOff();
    });
</script>






<Header />

<Toolbar />
<OptionBar />
<ControlBar />


{#if $categoryStateStore === "build"}
    <BuildCategory />
{/if}


<Three />