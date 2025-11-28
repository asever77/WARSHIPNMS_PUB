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
  "title": "설정/단말관리",
  "userterminal": "사용자단말",
  "receptacleunit": "리셉터클유닛"
};

const en = {
  "title": "Settings/Devicemanage",
  "userterminal": "Userterminal",
  "receptacleunit": "Receptacleunit"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/devicemanage/userterminal');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.userterminal, path: '/settings/devicemanage/userterminal' },
    { label: lang.value.receptacleunit, path: '/settings/devicemanage/receptacleunit' }
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
