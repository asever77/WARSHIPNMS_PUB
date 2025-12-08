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
import { ref, onMounted, watch } from "vue";
import G from "@/config/global.js";
import { useRouter, useRoute } from "vue-router";
import TabBase from '@/components/TabBase.vue';

const ko = {
  "title": "통화연결설정",
  "pointtopoint": "점대점",
  "meetingcall": "회의통화",
  "groupcall": "그룹통화",
  "wirelessequip": "무선장비",
  "broadcastequip": "방송장비",
  "alarm": "경보",
  "cctv": "CCTV",
  "wireless": "무선"
};

const en = {
  "title": "통화연결설정",
  "pointtopoint": "점대점",
  "meetingcall": "회의통화",
  "groupcall": "그룹통화",
  "wirelessequip": "무선장비",
  "broadcastequip": "방송장비",
  "alarm": "경보",
  "cctv": "CCTV",
  "wireless": "무선"
};

const lang = ref({});
const router = useRouter();
const route = useRoute();
const selectedTab = ref(route.path);
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.pointtopoint, path: '/callconnectconfig/pointtopoint' },
    { label: lang.value.meetingcall, path: '/callconnectconfig/meetingcall' },
    { label: lang.value.groupcall, path: '/callconnectconfig/groupcall' },
    { label: lang.value.wirelessequip, path: '/callconnectconfig/wirelessequip' },
    { label: lang.value.broadcastequip, path: '/callconnectconfig/broadcastequip' },
    { label: lang.value.alarm, path: '/callconnectconfig/alarm' },
    { label: lang.value.cctv, path: '/callconnectconfig/cctv' },
    { label: lang.value.wireless, path: '/callconnectconfig/wireless' }
  ];
  selectedTab.value = route.path;
});

watch(() => route.path, (newPath) => {
  selectedTab.value = newPath;
});

watch(() => route.path, (newPath) => {
  selectedTab.value = newPath;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
