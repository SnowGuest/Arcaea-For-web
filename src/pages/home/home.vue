<!--  -->
<template>
    <div class="column" style="row-gap: 3vh;">
        <defalutBtn
            v-for="item in BtnList"
            :key="item.key"
            :time="item.time"
            :ref="(el: any) => item.instanceVariable.call(BtnList[item.key], el)"
            @tap="MenuTabClick(item.key, item.tap)"
        >{{ item.text }}</defalutBtn>
        <!--  -->
    </div>
</template>

<script lang="ts" setup>
import defalutBtn, { API as BtnAPI } from '@/components/defalutBtn.vue';
import { reactive, Ref } from 'vue';

const emit = defineEmits(["to"]);

interface HomeBtnInterfaceList {
    key: number,
    value: null | BtnAPI
    instanceVariable: (el: any) => Ref<BtnAPI | undefined> | void,
    time: string,
    text: string,
    tap: () => void
}
const BtnList = reactive<Array<HomeBtnInterfaceList>>([{
    key: 0,
    value: null,
    instanceVariable(el: any) {
        if (this) {
            this.value = el
        }
    },
    time: "0s",
    text: "选择谱面",
    tap() {
        setTimeout(() => {
            emit("to", "/song")
        }, 1500);
    }
}, {
    key: 1,
    value: null,
    instanceVariable(el: any) {
        if (this) {
            this.value = el
        }
    },
    time: "0.3s",
    text: "设置",
    tap() {
    }
}, {
    key: 2,
    value: null,

    instanceVariable(el: any) {
        if (this) {
            this.value = el
        }
    },
    time: "0.6s",
    text: "游玩记录",
    tap() {
        setTimeout(() => {
            emit("to", "/history")
        }, 1500);
    }
}])

function MenuTabClick(index: number, callBackTap: Function) {
    if (BtnList[index].time !== "0s") {
        const zeroIndex = BtnList.findIndex(e => e.time === "0s")
        BtnList[zeroIndex].time = BtnList[index].time
        BtnList[index].time = "0s";
    }
    BtnList[index].value?.hideBtn()
    BtnList.forEach((item, i) => index !== i && item.value?.hideBtn())
    callBackTap()
}
</script>
<style lang="scss" scoped>
</style>