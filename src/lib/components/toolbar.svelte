<script lang="ts">
    import buildIcon from "$assets/images/build-icon.svg";
    import hoverBuildIcon from "$assets/images/build-icon-hover.svg";
</script>





<div id="toolbar-container" class="bg-fff bd-r-10 shadow">
    <button class="tool-btn bg-fff font-EB">
        <img src="{buildIcon}" alt="build-icon">
        빌드
    </button>
</div>





<style lang="scss">
    #toolbar-container {
        position: fixed;
        left: 15px;
        top: 75px;
        width: 70px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;


        .tool-btn {
            width: 100%;
            height: 50px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            font-size: 1.2rem;
            cursor: pointer;


            img {
                width: 30px;
                height: 30px;
            }
        }
    }
</style>