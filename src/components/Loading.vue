<template>
    <div class="Loading">
        <div class="left" :class="Loading ? 'left_show' : 'left_hide'"></div>
        <div class="right" :class="Loading ? 'right_show' : 'right_hide'"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const Loading = ref<boolean>()
export interface LoadingAPI {
    show: () => Promise<boolean>
    hide: () => Promise<boolean>
}
const Expose: LoadingAPI = {
    show() {
        return new Promise((resolve, reject) => {
            Loading.value = true
            setTimeout(() => {
                resolve(true)
            }, 750);
        })
    },
    hide() {
        return new Promise((resolve, reject) => {
            Loading.value = false
            setTimeout(() => {
                resolve(true)
            }, 750);
        })
    }
}

defineExpose<LoadingAPI>(Expose)
</script>
<style lang="scss" scoped>
.Loading {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    pointer-events: none;
    .left {
        position: absolute;
        width: 70vw;
        height: 100%;
        left: 0;
        top: 0;
        background: hsl(264, 8%, 88%);
        transition: transform 0.74s;
    }
    .right {
        position: absolute;
        width: 30vw;
        height: 100%;
        right: 0;
        top: 0;
        background: hsl(262, 29%, 23%);
        transition: transform 0.74s;
    }
    .left_hide {
        transform: translateX(-100%);
    }
    .right_hide {
        transform: translateX(100%);
    }
    .left_show {
        transform: translateX(0);
    }
    .right_show {
        transform: translateX(0);
    }
}
</style>