import { Scene, PerspectiveCamera, WebGLRenderer } from "three"
export function createScene(ele: HTMLElement) {
    const scene = new Scene();
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    ele.appendChild(renderer.domElement);
    return scene
}
export function createCamera() {
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    return camera
}