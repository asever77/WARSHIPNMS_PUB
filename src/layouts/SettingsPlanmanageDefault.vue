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
  "title": "설정/계획관리",
  "planmanage": "계획관리",
  "areamanage": "영역관리"
};

const en = {
  "title": "Settings/Planmanage",
  "planmanage": "Planmanage",
  "areamanage": "Areamanage"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/planmanage/drawingmanage');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.planmanage, path: '/settings/planmanage/drawingmanage' },
    { label: lang.value.areamanage, path: '/settings/planmanage/areamanage' }
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
