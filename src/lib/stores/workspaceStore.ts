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
    plate: THREE.Mesh;
    isDragMode: boolean;
    focusEffect: THREE.BoxHelper | null;
    focusObject: any;
    objectList: {build: Array<any>, furniture: Array<any>};
    mousePosition: null | {x: number, z: number};
};

/**
 * THREE JS STORE
 * Three js 조작용 store
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
                    camera.position.set(5, 5, 5);
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

                    // 기준 plate 생성
                    const plateGeometry = new THREE.PlaneGeometry(100, 100);
                    const plateMaterial = new THREE.MeshBasicMaterial({ visible: false });
                    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
                    plate.rotation.x = -Math.PI / 2; // 평면을 수평으로 회전
                    scene.add(plate);

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
                        plate,
                        isDragMode: false,
                        focusEffect: null,
                        focusObject: null,
                        objectList: {build: [], furniture: []},
                        mousePosition: null
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
         * keydown 이벤트 함수
         * @param e KeyboardEvent
         */
        keydownEvt: (e: KeyboardEvent) => {
            if (e.key === "Control" || e.key === "Shift") {
                update((store) => {
                    const clone = store as ThreeStoreType;
                    clone.controls.enabled = false;

                    switch (e.key) {
                        case "Control":
                            clone.isDragMode = true;
                            clone.camera.position.set(0, 5, 0);
                            clone.camera.lookAt(0, 0, 0);
                            break;
                    
                        case "Shift":
                            if (clone.focusObject) {
                                clone.focusObject.rotation.y += Math.PI / 2;
                                clone.focusEffect?.update()
                            }
                            break;
                    
                        default:
                            break;
                    }

                    return clone;
                });
            }
        },
        /**
         * keyup 이벤트 함수
         * @param e KeyboardEvent
         */
        keyupEvt: (e: KeyboardEvent) => {
            if (e.key === "Control" || e.key === "Shift") {
                update((store) => {
                    const clone = store as ThreeStoreType;
                    clone.controls.enabled = true;
                    clone.isDragMode = false;
                    return clone;
                });
            }
        },
        /**
         * 포커스 오브젝트 변경 함수
         * @param obj any
         */
        changeFocusObj: (obj: any) => {
            update((store) => {
                const clone = store as ThreeStoreType;
                
                // 이전에 있던 포커스 이펙트 지우기
                if (clone.focusEffect) {
                    clone.scene.remove(clone.focusEffect);
                    clone.focusEffect.geometry.dispose();
                    clone.focusEffect.material.dispose();
                    clone.focusEffect = null;
                }

                // null이거나 같은 오브젝트가 들어온 경우
                if (obj === null || obj === clone.focusObject) {
                    clone.focusObject = null;
                    return clone;
                }

                // 포커스 오브젝트 교체
                clone.focusEffect = new THREE.BoxHelper(obj, 0xffff00);
                clone.scene.add(clone.focusEffect);
                clone.focusObject = obj;

                return clone;
            });
        },
        /**
         * mousedown 이벤트 함수
         * @param e MouseEvent
         */
        mousedownEvt: (e: MouseEvent) => {
            update((store) => {
                const clone = store as ThreeStoreType;
                
                if (!clone.focusObject || !clone.isDragMode) return clone;

                console.log("down on");

                // 마우스 위치 값 저장
                clone.mousePosition = {
                    x: Math.floor(e.clientX),
                    z: Math.floor(e.clientY)
                };

                return clone;
            });
        },
        /**
         * mousemove 이벤트 함수
         * @param e MouseEvent
         */
        mousemoveEvt: (e: MouseEvent) => {
            update((store) => {
                const clone = store as ThreeStoreType;
                if (!clone.focusObject || !clone.mousePosition || !clone.isDragMode) return clone;

                clone.focusObject.position.x += (Math.floor(e.clientX) - clone.mousePosition.x) * 0.1;
                clone.focusObject.position.z += (Math.floor(e.clientY) - clone.mousePosition.z) * 0.1;
                clone.focusEffect?.update();

                // 마우스 위치 값 저장
                clone.mousePosition = {
                    x: Math.floor(e.clientX),
                    z: Math.floor(e.clientY)
                };

                return clone;
            });
        },
        /**
         * mouseup 이벤트 함수
         * @param e MouseEvent
         */
        mouseupEvt: (e: MouseEvent) => {
            update((store) => {
                const clone = store as ThreeStoreType;
                clone.mousePosition = null;
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
                clone.camera.position.set(5, 5, 5);
                clone.camera.lookAt(0, 0, 0);
                return clone;
            });
        },
        /**
         * 바닥 생성 함수
         * @param x number
         * @param z number
         * @param name string
         */
        createFloor: (x: number, z: number, name: string) => {
            update((store) => {
                const clone = store as ThreeStoreType;
                const boxGeometry = new THREE.BoxGeometry(x, 0.1, z);
                const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xfffaf0 });
                const box = new THREE.Mesh(boxGeometry, boxMaterial);

                box.position.y = 0.05;
                box.name = name;

                clone.scene.add(box);
                clone.objectList.build.push(box);

                return clone;
            });
        },
        /**
         * 벽 생성 함수
         * @param x number
         * @param y number
         * @param z number
         * @param name string
         */
        createWall: (x: number, y:number, z: number, name: string) => {
            update((store) => {
                const clone = store as ThreeStoreType;

                const boxGeometry = new THREE.BoxGeometry(x, y, z);
                const boxMaterial = [
                    new THREE.MeshBasicMaterial({ color: 0x414141 }),
                    new THREE.MeshBasicMaterial({ color: 0x414141 }),
                    new THREE.MeshBasicMaterial({ color: 0x414141 }),
                    new THREE.MeshBasicMaterial({ color: 0x414141 }),
                    new THREE.MeshBasicMaterial({ color: 0xfffaf0 }),
                    new THREE.MeshBasicMaterial({ color: 0x414141 }),
                ]
                const box = new THREE.Mesh(boxGeometry, boxMaterial);

                box.position.y = y / 2;
                box.name = name;

                clone.scene.add(box);
                clone.objectList.build.push(box);
                
                return clone;
            });
        }
    }
}
export const threeStore = createThreeStore();