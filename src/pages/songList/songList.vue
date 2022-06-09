
<template>
    <ul class="songList column" ref="songList" @scroll="moveing">
        <item v-for="item in 100" @tap="playSong(item)"></item>
    </ul>

</template>

<script lang="ts" setup>
import { ref, inject } from "vue";
import item from "./song.vue"
import { API } from "@/App.vue"

const base = inject<API>("base")
const songList = ref<HTMLUListElement>()
function moveing(e: Event) {
    console.log(e)
}
/**
 * @return {boolean}  判断横屏还是竖屏 true竖屏
*/

async function playSong(e: number) {
    await base?.showLoading()
    base?.pushRouter("/Game", {}, "replace")

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


</style>