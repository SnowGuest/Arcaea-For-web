<script setup lang="ts">
import { useRouter } from "vue-router"
import { provide, reactive, ref } from 'vue';
import groundRole from './components/groundRole.vue';
import groundmusic from './components/groundmusic.vue';
import Loading, { LoadingAPI } from './components/Loading.vue';
const router = useRouter()
const LoadingRef = ref<LoadingAPI>()
export interface API {
  showLoading: () => Promise<boolean>
  hideLoading: () => Promise<boolean>
}
const base = reactive<API>({
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
  }
})
provide<API>("base", base)

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
  <Loading ref="LoadingRef" />
  <router-view @to="pushRouter"></router-view>
</template>

<style>
@import "@/assets/base.css";
#app {
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
