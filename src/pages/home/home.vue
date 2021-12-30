<!--  -->
<template>
    <div class="column" style="row-gap: 3vh;">
        <defalutBtn index="0s">开始游戏</defalutBtn>
        <defalutBtn index="0.3s">设置</defalutBtn>
        <defalutBtn index="0.6s" @tap="goToHistory">历史记录</defalutBtn>
    </div>
</template>

<script lang="ts" setup>
import defalutBtn from '@/components/defalutBtn.vue';
const emit = defineEmits(["to"]);
function goToHistory(e: Event) {
    emit("to", "/history")
}
</script>
<style lang="scss" scoped>
</style>