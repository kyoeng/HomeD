import { writable } from "svelte/store";




function createLoadingStore() {
    const { subscribe, set } = writable(true);

    return {
        subscribe,
        loadingOn: () => set(true),
        loadingOff: () => set(false)
    };
}

const loadingStore = createLoadingStore();
export default loadingStore;