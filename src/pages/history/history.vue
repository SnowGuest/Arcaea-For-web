<template>
    <div class="historyList">
        <div class="historyHeader align-center">
            <span @click="backPage" class="iconfont icon-fanhui"></span>
            <h2>游玩记录</h2>
        </div>
        <div class="historyBody"></div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
const router = useRouter()
function backPage() {
    router.back()
}
</script>
<style lang="scss" scoped>
.historyList {
    position: relative;
    width: calc(100vw - 64px);
    height: 90vh;
    overflow-y: auto;
    background: hsla(0, 0%, 100%, 0.961);
    border-radius: 10px;
    padding: 14px 16px 16px;
    transform: scale(0.76);
    opacity: 0;
    animation: historyList_show 0.54s forwards;
    .historyHeader {
        column-gap: 14px;
        span {
            font-weight: 700 !important;
            position: relative;
            &::after {
                position: absolute;
                content: "";
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                transform: scale(3);
            }
        }
    }
    .historyBody {
        padding: 0 8px;
    }
}
@keyframes historyList_show {
    from {
        transform: scale(0.76);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>