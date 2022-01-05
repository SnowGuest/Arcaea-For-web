import {
    Scene, PerspectiveCamera, WebGLRenderer, TextureLoader, PlaneGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    Raycaster,
    Vector2,
} from "three"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
interface tracksInteface {
    geometry: Mesh<PlaneGeometry, MeshBasicMaterial>,
    index: number,
    color: number
}
export default class CreateGameScene {
    public scene: Scene;
    public renderer: WebGLRenderer
    public camera: PerspectiveCamera
    public controls?: OrbitControls
    public track: Mesh<PlaneGeometry, MeshBasicMaterial>
    public tracks: tracksInteface[]
    /**
     * @param {ele} 承载的元素
     * @param {ground} 背景图片文件名 默认是在 gameMaterial/background 目录下的图片文件
     * @param {debugCamera} 是否是debug状态
     * */
    constructor(ele: HTMLElement, ground: string, debugCamera?: boolean) {
        const { scene, renderer } = this.createScene(ele, ground)
        this.scene = scene
        this.renderer = renderer
        this.camera = this.createCamera()
        this.track = this.createTrack()
        this.tracks = this.createTrackItem()
        this.createTapTrack()
        if (debugCamera) {
            this.controls = this.createControls()
        }
    }
    private createTapTrack(trackBox: tracksInteface[] = this.tracks) {
        const tracks = trackBox.map(item => item.geometry)
        const raycaster = new Raycaster();
        const mouse = new Vector2();
        const camera = this.camera
        console.log(tracks)
        //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        function Tap(event: TouchEvent, flag: number) {
            const clientY = event.changedTouches[event.changedTouches.length - 1].clientY
            const clientX = event.changedTouches[event.changedTouches.length - 1].clientX
            if (decisionInterval(event)) {
                mouse.x = (clientX / window.innerWidth) * 2 - 1;
                mouse.y = - (clientY / window.innerHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                // 获取raycaster直线和所有模型相交的数组集合
                const intersects = raycaster.intersectObjects<Mesh<PlaneGeometry, MeshBasicMaterial>>(tracks);
                console.log(intersects)
                // intersects 是所有被点击模型的一个集合
                intersects.forEach(e => {
                    // 遍历集合 拿到被点击的元素
                    console.log(e.object)
                    if (flag === 0 || flag === -1) {
                        trackBox.map(item => item.geometry.material.color.set(item.color))
                        e.object.material.color.set(0xff0000);

                    } else if (flag === 1) {
                        trackBox.map(item => item.geometry.material.color.set(item.color))
                    }
                });
            } else if (flag === 1) {
                trackBox.map(item => item.geometry.material.color.set(item.color))

            }
        }
        window.addEventListener("touchstart", (e) => Tap(e, -1), false);
        window.addEventListener("touchmove", (e) => Tap(e, 0), false);
        window.addEventListener("touchend", (e) => Tap(e, 1), false);

    }
    private createScene(ele: HTMLElement, ground?: string) {
        const scene = new Scene();
        if (ground) {
            const background = new TextureLoader().load(`/src/assets/gameMaterial/background/${ground}.jpg`)
            scene.background = background
        }
        const renderer = new WebGLRenderer({
            antialias: true // 开启抗锯齿
        });
        // HiDPI设备能在较小尺寸下显示出较高分辨率，也就是每一个屏幕上的物理像素其实是由多个像素显示出来的，所以需要设置一下设备像素比率
        renderer.setPixelRatio(window.devicePixelRatio); // 解决HiDPI设备
        renderer.setSize(window.innerWidth, window.innerHeight);
        ele.appendChild(renderer.domElement);
        return { scene, renderer }
    }
    private createTrackItem(track: Mesh<PlaneGeometry, MeshBasicMaterial> = this.track): tracksInteface[] {
        const color = [0xffff00, 0x00ff00, 0x000000, 0xb1b1b1]
        let i = -1.5
        const trackList: tracksInteface[] = color.map((item, index) => {
            const geometry = new PlaneGeometry(30, 1);
            geometry.name = `${index}`
            const material = new MeshBasicMaterial({ color: item, side: DoubleSide });
            const plane = new Mesh(geometry, material);
            plane.position.set(0, i, 0)
            i++
            track.add(plane)
            const items: tracksInteface = {
                index,
                geometry: plane,
                color: item
            }
            
            return items
        })
        return trackList
    }
    private createControls() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        return controls
    }
    private createCamera() {
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        camera.position.y = -3;

        return camera
    }
    private createTrack() {
        const geometry = new PlaneGeometry(30, 4);
        const material = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide });
        const plane = new Mesh(geometry, material);
        plane.rotateX(Math.PI / 2);
        plane.rotateZ(Math.PI / 2);
        plane.rotateY(-(Math.PI / 5.2));
        plane.position.setY(-1.6)
        this.scene.add(plane);




        return plane
    }
}

export function render(game: CreateGameScene) {
    function renderRun() {
        game.renderer.render(game.scene, game.camera)
        // game.controls?.update();
        requestAnimationFrame(renderRun);
    }
    requestAnimationFrame(renderRun);
}

export function decisionInterval(event: TouchEvent): boolean {
    if (event.changedTouches.length > 0) {
        const clientY = event.changedTouches[event.changedTouches.length - 1].clientY
        return clientY >= window.innerHeight - 60
    }
    return false
}