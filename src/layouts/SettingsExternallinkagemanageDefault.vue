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
  "title": "설정/방송경보",
  "broadcastequipmanage": "방송장비관리",
  "autobroadcastmanage": "자동방송관리",
  "broadcastsourcemanage": "방송음원관리",
  "broadcastschedulemanage": "방송스케줄관리",
  "broadcastholidaymanage": "방송휴일관리",
  "alarmdevicemanage": "경보관리",
  "cctvmanage": "CCTV 관리"
};

const en = {
  "title": "Settings/BroadcastAlarm",
  "broadcastequipmanage": "Broadcast Equip",
  "autobroadcastmanage": "Auto Broadcast",
  "broadcastsourcemanage": "Broadcast Source",
  "broadcastschedulemanage": "Broadcast Schedule",
  "broadcastholidaymanage": "Broadcast Holiday",
  "alarmdevicemanage": "Alarm Manage",
  "cctvmanage": "CCTV Manage"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/externallinkagemanage/broadcastequipmanage');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.broadcastequipmanage, path: '/settings/externallinkagemanage/broadcastequipmanage' },
    { label: lang.value.autobroadcastmanage, path: '/settings/externallinkagemanage/autobroadcastmanage' },
    { label: lang.value.broadcastsourcemanage, path: '/settings/externallinkagemanage/broadcastsourcemanage' },
    { label: lang.value.broadcastschedulemanage, path: '/settings/externallinkagemanage/broadcastschedulemanage' },
    { label: lang.value.broadcastholidaymanage, path: '/settings/externallinkagemanage/broadcastholidaymanage' },
    { label: lang.value.alarmdevicemanage, path: '/settings/externallinkagemanage/alarmdevicemanage' },
    { label: lang.value.cctvmanage, path: '/settings/externallinkagemanage/cctvmanage' },
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
