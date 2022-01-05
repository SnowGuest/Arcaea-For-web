<template>
    <teleport to="body">
        <main id="scene" ref="sceneRenderer">
            <div class="debug" v-if="debug">
                <div>
                    相机控制
                    <div>
                        X
                        <input type="number" v-model="cameraX" />
                    </div>
                    <div>
                        Y
                        <input type="number" v-model="cameraY" />
                    </div>
                    <div>
                        X
                        <input type="number" v-model="cameraZ" />
                    </div>
                    <button @click="setCamera">应用</button>
                </div>
                <div>
                    地面控制
                    <div>
                        X
                        <input type="number" v-model="trackX" />
                    </div>
                    <div>
                        Y
                        <input type="number" v-model="trackY" />
                    </div>
                    <div>
                        Z
                        <input type="number" v-model="trackZ" />
                    </div>
                    <button @click="setTrack">应用</button>
                    <button @click="getparams">获取参数</button>
                </div>
            </div>
        </main>
    </teleport>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue"
import { API } from "@/App.vue"
import createGameScene, { render } from "./createElement"
const base = inject<API>("base")
const sceneRenderer = ref<HTMLElement>()
const debug = false
const cameraX = ref<number>(0);
const cameraY = ref<number>(0);
const cameraZ = ref<number>(0);

const trackX = ref<number>(0);
const trackY = ref<number>(0);
const trackZ = ref<number>(0);
let scene: createGameScene | null = null
onMounted(async () => {
    if (sceneRenderer.value) {
        scene = new createGameScene(sceneRenderer.value, "1", debug)
        // cameraX.value = scene.camera.position.x
        // cameraY.value = scene.camera.position.y
        // cameraZ.value = scene.camera.position.z
        // trackX.value = scene.track.position.x
        // trackY.value = scene.track.position.y
        // trackZ.value = scene.track.position.z
        render(scene)
        await base?.hideLoading()
    }
})
function setCamera() {
    if (scene) {
        console.log(cameraX.value)
        scene.camera.position.x = cameraX.value
        scene.camera.position.y = cameraY.value
        scene.camera.position.z = cameraZ.value
        cameraX.value = scene.camera.position.x
        cameraY.value = scene.camera.position.y
        cameraZ.value = scene.camera.position.z
    }
}
function setTrack() {
    if (scene) {
        scene.track.position.x = trackX.value
        scene.track.position.y = trackY.value
        scene.track.position.z = trackZ.value
        trackX.value = scene.track.position.x
        trackY.value = scene.track.position.y
        trackZ.value = scene.track.position.z
    }
}
function getparams() {

}
</script>
<style lang="scss" scoped>
#scene {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .debug {
        position: absolute;
    }
}
</style>