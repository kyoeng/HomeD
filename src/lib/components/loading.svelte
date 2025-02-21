<div id="loading-container">
    <div id="loading-cube">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>




<style lang="scss">
    @-webkit-keyframes cube {
        0% {
            -webkit-transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
            transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
        }
        50% {
            -webkit-transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
            transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
        }
        100% {
            -webkit-transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
            transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
        }
    }

    @keyframes cube {
        0% {
            -webkit-transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
            transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
        }
        50% {
            -webkit-transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
            transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
        }
        100% {
            -webkit-transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
            transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
        }
    }



    #loading-container {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10000;
        width: 100%;
        height: 100%;
        background-color: #ffffff;



        #loading-cube {
            width: 60px;
            height: 60px;
            position: absolute;
            top: calc((100% - 60px) / 2);
            left: calc((100% - 60px) / 2);
            -webkit-animation: cube 2s infinite ease;
            animation: cube 2s infinite ease;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;


            div {
                width: 100%;
                height: 100%;
                border: 5px solid rgba($color: #555555, $alpha: 0.5);
                position: absolute;
            }


            div:nth-of-type(1) {
                -webkit-transform: translateZ(-30px) rotateY(180deg);
                transform: translateZ(-30px) rotateY(180deg);
            }
            div:nth-of-type(2) {
                -webkit-transform: rotateY(-270deg) translateX(50%);
                transform: rotateY(-270deg) translateX(50%);
                -webkit-transform-origin: top right;
                transform-origin: top right;
            }
            div:nth-of-type(3) {
                -webkit-transform: rotateY(270deg) translateX(-50%);
                transform: rotateY(270deg) translateX(-50%);
                -webkit-transform-origin: center left;
                transform-origin: center left;
            }
            div:nth-of-type(4) {
                -webkit-transform: rotateX(90deg) translateY(-50%);
                transform: rotateX(90deg) translateY(-50%);
                -webkit-transform-origin: top center;
                transform-origin: top center;
            }
            div:nth-of-type(5) {
                -webkit-transform: rotateX(-90deg) translateY(50%);
                transform: rotateX(-90deg) translateY(50%);
                -webkit-transform-origin: bottom center;
                transform-origin: bottom center;
            }
            div:nth-of-type(6) {
                -webkit-transform: translateZ(30px);
                transform: translateZ(30px);
            }
        }
    }
</style>