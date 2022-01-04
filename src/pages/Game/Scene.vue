<template>
    <teleport to="body">
        <main id="scene" ref="sceneRenderer"></main>
    </teleport>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue"
import { API } from "@/App.vue"
import { createCamera, createScene } from "./createElement"
const base = inject<API>("base")
const sceneRenderer = ref<HTMLElement>()
onMounted(async () => {
    if (sceneRenderer.value) {
        const scene = createScene(sceneRenderer.value)
        const camera = createCamera()
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
}
</style>