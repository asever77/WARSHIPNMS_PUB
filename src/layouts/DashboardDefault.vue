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
  "title": "대시보드",
  "network": "네트워크",
  "userterminal": "사용자단말",
  "receptacleunit": "리셉터클유닛",
  "rack": "랙",
  "activealarm": "활성경보"
};

const en = {
  "title": "Dashboard",
  "network": "Network",
  "userterminal": "Userterminal",
  "receptacleunit": "Receptacleunit",
  "rack": "Rack",
  "activealarm": "Activealarm"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/dashboard/network');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.network, path: '/dashboard/network' },
    { label: lang.value.userterminal, path: '/dashboard/userterminal' },
    { label: lang.value.receptacleunit, path: '/dashboard/receptacleunit' },
    { label: lang.value.rack, path: '/dashboard/rack' },
    { label: lang.value.activealarm, path: '/dashboard/activealarm' }
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
