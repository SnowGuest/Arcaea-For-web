<script setup lang="ts">
import groundRole from './components/groundRole.vue';
import { useRouter } from "vue-router"
import { onMounted, ref } from 'vue';
import groundmusic from './components/groundmusic.vue';
const router = useRouter()

function pushRouter(e: string, params: any = {}) {
  router.push({
    path: e,
    params
  })
}

</script>

<template>
  <groundRole />
  <groundmusic />

  <!-- <div> -->
  <router-view @to="pushRouter"></router-view>
  <!-- </div> -->
</template>

<style>
@import "@/assets/base.css";
#app {
  justify-content: center;
  align-items: center;
}
</style>
