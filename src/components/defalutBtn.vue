<template>
    <button class="default_menuBtn" @touchstart.passive="playAudio" @click="Tap">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import clickAudio from "@/assets/audio/item_click.wav"
const emit = defineEmits(["tap"])
const prop = defineProps<{
    index: string
}>()
async function playAudio() {
    const audioContext = new AudioContext()
    const res = await fetch(clickAudio);
    const arraybuffer = await res.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arraybuffer);
    const source = audioContext.createBufferSource();
    source.connect(audioContext.destination); //连接上实例
    source.buffer = audioBuffer;
    source.start()
}
async function Tap(e: Event) {
    emit("tap", e)
}
</script>
<style lang="scss" scoped>
.default_menuBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 10px;
    width: 160px;
    min-height: 68px;
    outline: none;
    border: none;
    background: url("@/assets/img/defalutBtn.svg") no-repeat;
    background-size: 100% 100%;
    font-weight: 700;
    font-size: 22px;
    position: relative;
    cursor: pointer;
    user-select: none;
    opacity: 0;
    transform: translateY(-120%);
    animation: default_menuBtn_show 1.6s v-bind(index) forwards;
}
@keyframes default_menuBtn_show {
    from {
        opacity: 0;
        transform: translateY(-120%);
    }
    to {
        opacity: 1;
        transform: translateY(0%);
    }
}
</style>