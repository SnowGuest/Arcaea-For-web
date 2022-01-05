
<template>
    <ul class="songList column" ref="songList" @scroll="moveing">
        <item v-for="item in 100" @tap="playSong(item)"></item>
    </ul>
    <popup v-model:value="popupShow">
        <div class="rotatePhone center column">
            <span class="iconfont icon-xuanzhuanshouji"></span>
            <p>请旋转设备后锁定横屏</p>
        </div>
    </popup>
</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import item from "./song.vue"
import popup from "@/components/popup.vue"
import { API } from "@/App.vue"
const base = inject<API>("base")
const popupShow = ref<boolean>(false)
const songList = ref<HTMLUListElement>()
// const emit = defineEmits(["to"]);

function moveing(e: Event) {
    console.log(e)
}
/**
 * @return {boolean}  判断横屏还是竖屏 true竖屏
*/
function isOrientation(): boolean {
    return window.orientation === 180 || window.orientation === 0
}
async function playSong(e: number) {
    async function watchScreen() {
        if (!isOrientation()) {
            await base?.showLoading()
            popupShow.value = false
            window.removeEventListener("orientationchange", watchScreen)

            setTimeout(() => {
                base?.pushRouter("/Game")
                // emit()
            }, 100);

        }
    }
    if (isOrientation()) {
        popupShow.value = true
        window.addEventListener("orientationchange", watchScreen)
    } else {
        await base?.showLoading()
        base?.pushRouter("/Game")

    }
}
</script>
<style lang="scss" scoped>
.songList {
    overflow-x: hidden;
    max-height: 90vh;
    height: 90vh;
    width: 70vw;
    align-self: flex-end;
    row-gap: 35px;
    overflow-y: scroll;
    transform: translateX(70vw);
    animation: showSongList 1.4s forwards;
}
@media screen and (orientation: landscape) {
    .songList {
        width: 50vw;
    }
}
@keyframes showSongList {
    from {
        transform: translateX(70vw);
        opacity: 0;
    }
    to {
        transform: translateX(0vw);
        opacity: 1;
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