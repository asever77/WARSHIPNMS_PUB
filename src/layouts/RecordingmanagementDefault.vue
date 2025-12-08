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
  "title": "녹음관리/타체계녹음",
  "setting": "녹음설정",
  "targetmanagement": "녹음대상관리",
};

const en = {
  "title": "녹음관리/타체계녹음",
  "setting": "녹음설정",
  "targetmanagement": "녹음대상관리",
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/recording/othersystemrecording/setting');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.setting, path: '/recording/othersystemrecording/setting' },
    { label: lang.value.targetmanagement, path: '/recording/othersystemrecording/targetmanagement' }
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
