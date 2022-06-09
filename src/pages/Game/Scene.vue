<template>
    <teleport to="body">
        <canvas id="scene" ref="sceneRenderer">
        </canvas>
        <popup v-model:value="popupShow">
            <div class="rotatePhone center column">
                <span class="iconfont icon-xuanzhuanshouji"></span>
                <p>请旋转设备后锁定横屏</p>
            </div>
        </popup>
    </teleport>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue"
import { API } from "@/App.vue"
import createGameScene, { render } from "./createElement"
import { isOrientation } from "@/utils/util";
import popup from "@/components/popup.vue"

const popupShow = ref<boolean>(false)

const base = inject<API>("base")
const sceneRenderer = ref<HTMLCanvasElement>()
let scene: createGameScene | null = null;

let lock: ((value?: unknown) => void) | null = null

async function watchScreen() {
    if (!isOrientation()) {
        popupShow.value = false;
        if (lock) lock();
        window.removeEventListener("orientationchange", watchScreen)
    }
}

function CreateLook() {
    return new Promise((resolve, reject) => {
        lock = resolve
    })
}

async function preload() {
    if (sceneRenderer.value) {
        scene = new createGameScene(sceneRenderer.value)
        render(scene);
        const LookContext = CreateLook()
        base?.hideLoading()
        if (isOrientation()) {
            popupShow.value = true
            window.addEventListener("orientationchange", watchScreen)
        } else {
            if (lock) lock();
        }
        await LookContext
        await sceneRenderer.value.requestFullscreen()
    }
}

onMounted(preload)

</script>
<style lang="scss" scoped>
#scene {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    user-select: none;
    .debug {
        position: absolute;
    }
}

.rotatePhone {
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-size: 14px;
    row-gap: 6px;

    span {
        font-size: 46px;
    }
}
</style>