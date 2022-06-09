<template>
    <button
        :class="{ default_menuBtn_hide: !btnShow }"
        class="default_menuBtn"
        @click="Tap"
    >
        <!-- @touchstart.passive="playAudio" -->

        <slot></slot>
    </button>
    <audio ref="audio" :src="clickAudio" style="display: none;"></audio>
</template>

<script lang="ts" setup>
import clickAudio from "@/assets/audio/item_click.wav"
import { ref } from "vue"
export interface API {
    hideBtn: () => void
}
defineProps<{
    time: string
}>()
const emit = defineEmits(["tap"])
const btnShow = ref<boolean>(true)

const audio = ref<HTMLAudioElement>()
async function playAudio() {
}
async function Tap(e: Event) {
    audio.value?.play()
    emit("tap", e)
}
function hideBtn() {
    btnShow.value = false
}
defineExpose({
    hideBtn
})

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
    animation: default_menuBtn_show 0.9s v-bind(time) forwards;
    touch-action: none;
}
.default_menuBtn_hide {
    opacity: 1;
    transform: translateY(0%);
    animation: default_menuBtn_hide 0.9s v-bind(time) forwards !important;
}
.default_menuBtn:active {
    background: url("@/assets/img/defalutBtn_active.svg") no-repeat;
    background-size: 100% 100%;
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
@keyframes default_menuBtn_hide {
    from {
        opacity: 1;
        transform: translateY(0%);
    }
    to {
        opacity: 0;
        transform: translateY(-120%);
    }
}
</style>