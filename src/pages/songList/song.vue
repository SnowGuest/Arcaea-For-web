
<template>
    <li class="song" >
        <div class="song_Top"></div>
        <div class="song_Bottom"></div>
    </li>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
</script>
<style lang="scss" scoped>
.song {
    max-height: 50px;
    .song_Top {
        width: 100vw;
        height: 50px;
        background-color: transparent;
        border-top: 50px solid #ffffff;
        border-bottom: 50px solid transparent;
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        transform: rotate(180deg);
    }
    .song_Bottom {
        height: 50px;
        width: 100vw;
        border-top: 50px solid transparent;
        border-bottom: 24px solid #ffffff;
        border-left: 50px solid transparent;
        border-right: 28px solid transparent;
        transform: rotate(180deg);
    }
}
</style>