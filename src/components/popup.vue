<template>
    <teleport to="body">
        <div class="popup" @click="closepopup" :class="{ popupShow: value }">
            <slot></slot>
        </div>
    </teleport>
</template>

<script lang="ts" setup>
const prop = defineProps<{
    value: boolean
}>()
const emit = defineEmits(["update:value"])

function closepopup() {
    emit("update:value", false)
}

</script>
<style lang="scss" scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.35);
    opacity: 0;
    transition: all 0.3s;
    pointer-events: none;
}
.popupShow {
    opacity: 1;
    pointer-events: auto !important;
}
</style>