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
  "title": "설정/운영정보관리",
  "operationconfigbackup": "운영정보백업",
  "operationconfigrestore": "백업복원"
};

const en = {
  "title": "Settings/Operationconfigmanage",
  "operationconfigbackup": "Operationconfigbackup",
  "operationconfigrestore": "Operationconfigrestore"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/operationconfigmanage/operationconfigbackup');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.operationconfigbackup, path: '/settings/operationconfigmanage/operationconfigbackup' },
    { label: lang.value.operationconfigrestore, path: '/settings/operationconfigmanage/operationconfigrestore' }
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
