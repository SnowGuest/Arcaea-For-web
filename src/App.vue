<script setup lang="ts">
import { useRouter } from "vue-router"
import { provide, reactive, ref } from 'vue';
import groundRole from './components/groundRole.vue';
import groundMusic, { groundMusicAPI } from './components/groundMusic.vue';
import Loading, { LoadingAPI } from './components/Loading.vue';
const router = useRouter()
const LoadingRef = ref<LoadingAPI>()
const groundMusicRef = ref<groundMusicAPI>()
export interface API {
  playGame: () => void
  showLoading: () => Promise<boolean>
  hideLoading: () => Promise<boolean>
  pushRouter: (e: string, params?: any) => void
}
const base = reactive<API>({
  playGame() {
    groundMusicRef.value?.stopMusic()
  },
  async showLoading() {
    if (LoadingRef.value) {
      await LoadingRef.value.show()
      return Promise.resolve(true)
    } else {
      return Promise.reject(false)
    }
  },
  async hideLoading() {
    if (LoadingRef.value) {
      await LoadingRef.value.hide()
      return Promise.resolve(true)
    } else {
      return Promise.reject(false)
    }
  },
  pushRouter(e: string, params: any = {}) {
    router.push({
      path: e,
      params
    })
  }
})
provide<API>("base", base)



</script>

<template>
  <groundRole />
  <groundMusic ref="groundMusicRef" />
  <Loading ref="LoadingRef" />
  <router-view></router-view>
</template>

<style>
@import "@/assets/base.css";
#app {
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
