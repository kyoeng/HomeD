<script lang="ts">
    import { gridStateStore } from "$stores/workspaceStore";
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    




    // three container
    let container: HTMLDivElement;


    // about three js
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let light: THREE.Light;
    let grid: THREE.Group;
    

    // onMount()
    onMount(async () => {
        // Scene 설정
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xedf8fe)

        // Camera 설정
        camera = new THREE.PerspectiveCamera(
            75, 
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 50, 0);
        camera.lookAt(0, 0, 0);

        // Renderer 설정
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // 마우스 컨트롤러 설정
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.minDistance = 5;
        controls.maxDistance = 50;
        controls.maxPolarAngle = Math.PI / 2;

        // 조명 설정
        light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10).normalize();
        scene.add(light);

        function create3DGrid(size = 10, divisions = 10) {
			const gridGroup = new THREE.Group();
			const gridColor = 0xcccccc;

			// XY 평면 (앞쪽 격자)
			const gridXY = new THREE.GridHelper(size, divisions, gridColor, gridColor);
			gridGroup.add(gridXY);

			return gridGroup;
		}
        grid = create3DGrid(50, 50);
        scene.add(grid);

        // sample cube
        // const geometry = new THREE.BoxGeometry();
		// const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
		// const cube = new THREE.Mesh(geometry, material);
		// scene.add(cube);

        // animation
        function animate() { renderer.render(scene, camera); }
        renderer.setAnimationLoop(animate);

        // resize event
        window.addEventListener("resize", () => {
            if (
                container.clientWidth >= 1240 &&
                container.clientHeight >= 1024 - 60
            ) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        });
    });



    $effect(() => {
        if ($gridStateStore) grid!.visible = true;
        else grid!.visible = false;
    });
</script>




<div id="three-container" bind:this={container}></div>




<style lang="scss">
    #three-container {
        position: fixed;
        width: 100%;
        height: calc(100% - 60px);
        left: 0;
        top: 60px;
    }
</style>