<!--  -->
<template>
    <div class="backMusic center" @click="playGoundMusic">
        <span :class="{ backMusicIconWhirl: GoundMusicFlag }" class="iconfont icon-yinle"></span>
        <!-- ref="backMusicIcon" -->
        <audio volume="0.3" preload="auto" ref="goundMusic" :src="arc" style="display: none;" autoplay loop></audio>
        <div :class="{ pauseAudio: !GoundMusicFlag }"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import arc from "@/assets/audio/story_loop.ogg"
export interface groundMusicAPI {
    stopMusic: () => void
}
const goundMusic = ref<HTMLAudioElement>()
// const backMusicIcon = ref<HTMLSpanElement>()
const GoundMusicFlag = ref<boolean>(false)
function playGoundMusic() {
    if (goundMusic.value) {
        const fnName = goundMusic.value.paused ? "play" : "pause"
        goundMusic.value[fnName]()
        GoundMusicFlag.value = !GoundMusicFlag.value
    }
}
onMounted(playGoundMusic)

defineExpose({
    stopMusic() {
        goundMusic.value?.pause()
    }
})
</script>
<style lang="scss" scoped>
.pauseAudio {
    position: absolute;
    left: 0;
    top: 50%;
    transform: rotate(45deg);
    background-color: #ffffff;
    height: 1px;
    width: 100%;
}

.backMusic {
    position: fixed;
    width: 25px;
    height: 25px;
    top: 8px;
    right: 8px;
    border-radius: 50%;
    border: 1px solid #ffffff;
    color: #ffffff;
}

.backMusicIconWhirl {
    animation: backMusicIconWhirl 3s 0s linear infinite forwards;
}

@keyframes backMusicIconWhirl {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>