<template>
    <teleport to="body">
        <main id="scene" ref="sceneRenderer">
        </main>
    </teleport>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue"
import { API } from "@/App.vue"
import createGameScene, { render } from "./createElement"
const base = inject<API>("base")
const sceneRenderer = ref<HTMLElement>()
let scene: createGameScene | null = null
onMounted(async () => {
    if (sceneRenderer.value) {
        scene = new createGameScene(sceneRenderer.value, "1", false)
        render(scene)
        await base?.hideLoading()
    }
})

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