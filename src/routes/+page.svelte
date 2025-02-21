<script lang="ts">
    import Header from "$components/header.svelte";
    import Manual from "$components/manual.svelte";
    import loadingStore from "$stores/loadingStore";
    import { onMount } from "svelte";




    // onMount()
    onMount(() => {
        loadingStore.loadingOff();
    });
</script>




<Header />

<div id="banner-wrapper" class="bg-fff">
    <div id="banner" class="limit">
        <div id="img-banner-box" class="banner-inner">
            <div id="img-banner">
                <img class="banner-img shadow bg-fff" src="" alt="banner-img">
                <img class="banner-img shadow bg-fff" src="" alt="banner-img">
            </div>
        </div>

        <div id="text-banner-box" class="banner-inner">
            <span id="point-text" class="font-blue font-EB">집 구조 계획 세우기.</span>
            <span id="banner-title" class="font-EB">자유롭게 집 구조 계획을 세워보세요!</span>
            <span id="banner-text" class="font-B">
                주거공간은 가구를 어떻게 배치하고 공간을 어떻게 사용하느냐에 따라 천차만별입니다.<br><br>
                집 구조를 변경하고자 했지만 전문가가 아닌 이상 눈에 보이는 계획을 구성하기에 어려운 부분이 많다고 느껴졌습니다.<br><br>
                그래서 "웹으로 편하게 누구나 자신의 주거공간을 꾸미고 계획할 수 있도록 하면 좋겠다."라는 생각에 이 서비스를 만들게 되었습니다.<br><br>
            </span>

            <a id="start-link" class="bg-blue font-fff font-EB bd-r-10 shadow-10" href="/workspace">시작하기</a>
        </div>
    </div>
</div>

<div id="info-bar" class="bg-blue shadow">
    <p class="info-text font-fff font-B">본 웹사이트는 정적 웹 사이트&#40;Static WebSite&#41;로 제공됩니다.</p>
    <p class="info-text font-fff font-B">따라서 진행한 데이터가 저장되지 않으며, 페이지를 새로고침하거나 종료 시 모든 내용이 초기화됩니다.</p>
</div>

{#each [false, true, false] as data}
    <Manual data={{hasBG: data}} />
{/each}





<style lang="scss">
    #banner-wrapper {
        width: 100%;

        
        #banner {
            height: 700px;
            display: flex;


            .banner-inner {
                flex: 1;
                height: 100%;
                padding: 120px 50px;
            }


            #img-banner {
                position: relative;
                width: 100%;
                height: 100%;


                .banner-img {
                    padding: 10px;
                    position: absolute;
                    width: 70%;
                    height: 60%;
                }
                .banner-img:first-of-type {
                    left: 0;
                    top: 0;
                }
                .banner-img:last-of-type {
                    right: 0;
                    bottom: 0;
                }
            }


            #text-banner-box {
                display: flex;
                flex-direction: column;


                #point-text { font-size: 2rem; }


                #banner-title {
                    font-size: 2.8rem;
                    margin-top: 7px;
                }


                #banner-text {
                    margin-top: 30px;
                    line-height: 25px;
                    font-size: 2rem;
                }


                #start-link {
                    margin-top: auto;
                    width: 180px;
                    padding: 20px;
                    text-align: center;
                    font-size: 2rem;
                    text-decoration: none;
                }
            }
        }
    }


    #info-bar {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;


        .info-text {
            font-size: 1.9rem;
        }
    }
</style>