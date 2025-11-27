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
  "title": "설정/외부연계관리",
  "broadcastequipmanage": "방송장비관리",
  "alarmdevicemanage": "경보장치관리"
};

const en = {
  "title": "Settings/Externallinkagemanage",
  "broadcastequipmanage": "Broadcastequipmanage",
  "alarmdevicemanage": "Alarmdevicemanage"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/externallinkagemanage/broadcastequipmanage');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.broadcastequipmanage, path: '/settings/externallinkagemanage/broadcastequipmanage' },
    { label: lang.value.alarmdevicemanage, path: '/settings/externallinkagemanage/alarmdevicemanage' }
  ];
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
