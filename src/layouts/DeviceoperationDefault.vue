<template>
  <div class="base-content">
    <div class="base-content--header">
      <div class="base-content--header-title">
         {{ lang.title }}
      </div>
      <TabBase :tabs="tabList" :selected="selectedTab" @select="onClickView" />
    </div>
    <div class="base-content--body">
        <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import { useRouter } from "vue-router";
import TabBase from '@/components/TabBase.vue';

const ko = {
  "title": "장치운영",
  "firmwaremanage": "펌웨어관리",
  "firmwareupgrade": "펌웨어업그레이드",
  "devicecontrol": "장치제어",
  "resultinquiry": "결과조회"
};

const en = {
  "title": "Deviceoperation",
  "firmwaremanage": "Firmwaremanage",
  "firmwareupgrade": "Firmwareupgrade",
  "devicecontrol": "Devicecontrol",
  "resultinquiry": "Resultinquiry"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/deviceoperation/firmwaremanage');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.firmwaremanage, path: '/deviceoperation/firmwaremanage' },
    { label: lang.value.firmwareupgrade, path: '/deviceoperation/firmwareupgrade' },
    { label: lang.value.devicecontrol, path: '/deviceoperation/devicecontrol' },
    { label: lang.value.resultinquiry, path: '/deviceoperation/resultinquiry' }
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
