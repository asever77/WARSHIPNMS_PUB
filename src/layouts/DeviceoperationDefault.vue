<template>
    <div>
        <div style="margin-left: 150px;width: 1200px;">
            <div style="border: 1px solid #000000;">
                {{ lang.title }}
                <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/deviceoperation/firmwaremanage')">{{ lang.firmwaremanage }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/deviceoperation/firmwareupgrade')">{{ lang.firmwareupgrade }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/deviceoperation/devicecontrol')">{{ lang.devicecontrol }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/deviceoperation/resultinquiry')">{{ lang.resultinquiry }}</span>
            </div>
            <div>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import { useRouter } from "vue-router";

const ko = {
  "title": "장치운영",
  "firmwaremanage": "펌웨어관리",
  "firmwareupgrade": "펌웨어업그레이드",
  "devicecontrol": "장치제어",
  "resultinquiry": "결과조회"
};

const en = {
  "title": "장치운영",
  "firmwaremanage": "펌웨어관리",
  "firmwareupgrade": "펌웨어업그레이드",
  "devicecontrol": "장치제어",
  "resultinquiry": "결과조회"
};

const lang = ref({});
const router = useRouter();

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
});

const onClickView = (item) => {
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>