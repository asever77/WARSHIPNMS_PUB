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
import { ref, onMounted, watch } from "vue";
import G from "@/config/global.js";
import { useRouter, useRoute } from "vue-router";
import TabBase from '@/components/TabBase.vue';

const ko = {
  "title": "이력",
  "callrecord": "Call이력",
  "alarmrecord": "Alarm이력",
  "changerecord": "변경이력"
};

const en = {
  "title": "Record",
  "callrecord": "Callrecord",
  "alarmrecord": "Alarmrecord",
  "changerecord": "Changerecord"
};

const lang = ref({});
const router = useRouter();
const route = useRoute();
const selectedTab = ref(route.path);
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.callrecord, path: '/record/callrecord' },
    { label: lang.value.alarmrecord, path: '/record/alarmrecord' },
    { label: lang.value.changerecord, path: '/record/changerecord' }
  ];
  selectedTab.value = route.path;
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
