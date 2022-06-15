
<template>
    <ul class="songList column" ref="songList" @scroll="moveing">
        <item v-for="item in 100" @tap="playSong(item)"></item>
    </ul>

</template>

<script lang="ts" setup>
import { ref, inject, onMounted } from "vue";
import item from "./song.vue"
import { API } from "@/App.vue"

const base = inject<API>("base")
const songList = ref<HTMLUListElement>()
let ulHeight = 0
onMounted(() => {
    if (songList.value) {
        ulHeight = songList.value.getBoundingClientRect().height
    }
})
function moveing(e: Event) {

    // <HTMLLIElement>
    const child = (e.target as HTMLUListElement).children
    console.log((child[11] as HTMLLIElement).getBoundingClientRect().top)
    for (let i = 0; i < child.length; i++) {
        const element = child[i] as HTMLLIElement;
        if (element.getBoundingClientRect().top < ulHeight * 0.8) {
            const sum = element.getBoundingClientRect().top < element.getBoundingClientRect().height
            element.style.transform = `translateX(${sum}px)`
        }

    }

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