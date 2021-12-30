<script setup lang="ts">
import groundRole from './components/groundRole.vue';
import arc from "@/assets/audio/story_loop.ogg"
import { useRouter } from "vue-router"
const router = useRouter()
function pushRouter(e: string, params: any = {}) {
  console.log("执行力qweqwe")
  router.push({
    path: e,
    params
  })
}
</script>

<template>
  <groundRole />
  <div class="logo">Arcaea for web</div>
  <div>
    <router-view @to="pushRouter"></router-view>
  </div>
  <audio :src="arc" autoplay loop></audio>
</template>

<style>
@import "@/assets/base.css";
#app {
  justify-content: center;
  align-items: center;
}
.logo {
  position: fixed;
  top: 0px;
  right: 0px;
  font-weight: 700;
  font-size: 24px;
  padding: 6px 16px 8px 0px;
  color: #212121;
  background-color: #ffffff;
}
.logo::after {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  left: -53px;
  top: 0;
  border: 21px solid transparent;
  border-right: 32px solid #ffffff;
}
</style>
