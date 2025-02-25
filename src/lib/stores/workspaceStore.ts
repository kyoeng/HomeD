import * as THREE from "three";
import { get, writable } from "svelte/store";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";






/**
 * category select state store
 * (툴바 카테고리 on off용)
 */
export const categoryStateStore = writable<string | null>(null);



/**
 * grid state store
 * (그리드 on off 용)
 */
export const gridStateStore = writable<boolean>(false);






// ThreeStore type
interface ThreeStoreType {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    light: THREE.Light;
    grid: THREE.GridHelper;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    focusObject: any,
    offset: THREE.Vector3;
};

/**
 * THREE JS STORE
 */
function createThreeStore() {
    const { subscribe, update, set } = writable<ThreeStoreType | null>(null);

    return {
        subscribe,
        /**
         * Store 초기화 및 Three js 시작
         * @param container Three js 적용할 container 태그
         */
        init: (container: HTMLElement) => {
            return new Promise((resolve) => {
                try {
                    // Scene 설정
                    const scene = new THREE.Scene();
                    scene.background = new THREE.Color(0xedf8fe);

                    // Camera 설정
                    const camera = new THREE.PerspectiveCamera(
                        75, 
                        container.clientWidth / container.clientHeight,
                        0.1,
                        1000
                    );
                    camera.position.set(0, 25, 0);
                    camera.lookAt(0, 0, 0);

                    // Renderer 설정
                    const renderer = new THREE.WebGLRenderer({antialias: true});
                    renderer.setSize(container.clientWidth, container.clientHeight);
                    container.appendChild(renderer.domElement);

                    // 마우스 컨트롤러 설정
                    const controls = new OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.1;
                    controls.minDistance = 5;
                    controls.maxDistance = 100;
                    controls.maxPolarAngle = Math.PI / 2;

                    // 조명 설정
                    const light = new THREE.DirectionalLight(0xffffff, 1);
                    light.position.set(10, 10, 10).normalize();
                    scene.add(light);

                    // 눈금자 설정
                    const grid = new THREE.GridHelper(100, 100, 0xcccccc, 0xcccccc);
                    scene.add(grid);

                    // animation 시작
                    function animate() { renderer.render(scene, camera); }
                    renderer.setAnimationLoop(animate);

                    // store 등록
                    set({
                        scene,
                        camera,
                        renderer,
                        controls,
                        light,
                        grid,
                        raycaster: new THREE.Raycaster(),
                        mouse: new THREE.Vector2,
                        focusObject: null,
                        offset: new THREE.Vector3()
                    });
                    resolve(true);

                } catch (error) {
                    set(null);
                    resolve(false);
                }
            });
        },
        /**
         * resize 이벤트 함수
         * @param container Three js 적용할 container 태그
         */
        resizeEvt: (container: HTMLElement) => {
            update((store) => {
                const clone = store as ThreeStoreType;

                if (container.clientWidth >= 1240 && container.clientHeight >= (1024 - 50)) {
                    clone.camera.aspect = container.clientWidth / container.clientHeight;
                    clone.camera.updateProjectionMatrix();
                    clone.renderer.setSize(container.clientWidth, container.clientHeight);
                }

                return clone;
            });
        },
        /**
         * grid on off 함수
         */
        gridOnOff: () => {
            update((store) => {
                const clone = store as ThreeStoreType;

                clone.grid.visible = !clone.grid.visible;
                return clone;
            });
        },
        /**
         * camera 정렬 함수
         */
        cameraCenterView: () => {
            update((store) => {
                const clone = store as ThreeStoreType;

                clone.camera.position.set(0, 25, 0);
                clone.camera.lookAt(0, 0, 0);
                return clone;
            });
        },
        /**
         * 바닥 생성 함수
         * @param x number
         * @param z number
         */
        createFloor: (x: number, z: number) => {
            update((store) => {
                const clone = store as ThreeStoreType;

                const boxGeometry = new THREE.BoxGeometry(x, 0.1, z);
                const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const box = new THREE.Mesh(boxGeometry, boxMaterial);
                box.position.y = 0.1;
                clone.scene.add(box);

                return clone;
            });
        }
    }
}
export const threeStore = createThreeStore();