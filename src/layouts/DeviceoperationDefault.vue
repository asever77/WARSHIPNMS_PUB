<template>
  <div class="base-content">
    <div class="base-content--header">
      <div class="base-content--header-title">
         {{ lang.title }}
      </div>
      <TabBase :tabs="tabList" :selected="selectedTab" @select="onClickView" />
    </div>
    <div class="base-content--body">
      <div class="ui-content-page">
        <div class="ui-content-area">
          <router-view />
        </div>
        <p class="copyright">Copyright(c)NAVY.MIL.KR. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import { useRouter } from "vue-router";
import TabBase from '@/components/TabBase.vue';

const ko = {
  title: "장치운영",
  firmwareManage: "펌웨어 관리",
  firmwareUpgrade: "펌웨어 업그레이드",
  deviceControl: "장치제어",
  lightControl: "광원제어",
  resultInquiry: "장치제어 수행이력"
};

const en = {
  title: "장치운영",
  firmwareManage: "펌웨어 관리",
  firmwareUpgrade: "펌웨어 업그레이드",
  deviceControl: "장치제어",
  lightControl: "광원제어",
  resultInquiry: "장치제어 수행이력"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/deviceoperation/firmwaremanage');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.firmwareManage, path: '/deviceoperation/firmwaremanage' },
    { label: lang.value.firmwareUpgrade, path: '/deviceoperation/firmwareupgrade' },
    { label: lang.value.deviceControl, path: '/deviceoperation/devicecontrol' },
    { label: lang.value.lightControl, path: '/deviceoperation/lightcontrol' },
    { label: lang.value.resultInquiry, path: '/deviceoperation/resultinquiry' }
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
