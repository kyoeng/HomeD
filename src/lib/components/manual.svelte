<script lang="ts">
    // props type
    type PropsDataType = {
        data: {
            hasBG: boolean
        }
    }


    // props
    let { data }: PropsDataType = $props();
</script>



<div class="manual-container" class:bg-fff={data.hasBG}>
    <div class="limit manual-wrapper">
        
    </div>
</div>



<style lang="scss">
    .manual-container {
        width: 100%;
        height: 700px;

        
        .manual-wrapper {
            width: 100%;
            height: 100%;
        }
    }
</style>