
<template>
    <ul class="songList column" ref="songList" @scroll="moveing">
        <item v-for="item in 100"></item>
    </ul>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import item from "./song.vue"
const songList = ref<HTMLUListElement>()
function moveing(e: Event) {
    console.log(e)
}
</script>
<style lang="scss" scoped>
.songList {
    overflow-x: hidden;
    height: 90vh;
    width: 70vw;
    align-self: flex-end;
    row-gap: 35px;
    overflow-y: auto;
}
</style>