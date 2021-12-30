<!--  -->
<template>
    <img :src="HiKari" class="HiKari HiKari_hide BackRole" :class="{ 'HiKari_show': showRole }" />
    <img
        :src="Tairitsu"
        class="Tairitsu Tairitsu_hide BackRole"
        :class="{ 'Tairitsu_show': showRole }"
    />
</template>

<script lang="ts" setup>
import HiKari from "@/assets/img/Hikari.webp"
import Tairitsu from "@/assets/img/Tairitsu.webp"
import { onMounted, ref } from "vue";
const showRole = ref<boolean>(false);

onMounted(() => {
    setTimeout(() => {
        showRole.value = true
    }, 100);
})

</script>
<style lang="scss" scoped>
.BackRole {
    position: fixed;
    height: 60vh;
    object-fit: cover;
    opacity: 0;
    transition: all 2s;
}
.HiKari_hide {
    top: 5vh;
    left: 0px;
    transform: translateX(-100%);
}
.Tairitsu_hide {
    top: 50vh;
    right: 0px;
    transform: translateX(100%);
}
.HiKari_show {
    opacity: 1;
    transform: translateX(-33%) translateY(-20px);
    animation: HiKariRunTime 3.34s 2.51s infinite alternate;
}
.Tairitsu_show {
    opacity: 1;
    transform: translateX(40%) translateY(-20px);
    animation: TairitsuRunTime 3.34s 2.01s infinite alternate;
}
@keyframes HiKariRunTime {
    from {
        transform: translateX(-33%) translateY(-20px);
    }
    to {
        transform: translateX(-33%) translateY(20px);
    }
}
@keyframes TairitsuRunTime {
    from {
        transform: translateX(40%) translateY(-20px);
    }
    to {
        transform: translateX(40%) translateY(20px);
    }
}
</style>