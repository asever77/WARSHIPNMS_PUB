<template>
    <div>
      <div class="tab-inner">
        <TabBase :tabs="tabList" :selected="selectedTab" @select="onClickView" />
      </div>
        {{ lang.title }}
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import { useRouter } from "vue-router";
import TabBase from '@/components/TabBase.vue';

const ko = {
  "title": "보안장비연동장치 내용"
};

const en = {
  "title": "보안장비연동장치 내용"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/connectconfigmanage/interlockdevice/service');
const tabList = ref([]);
onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: '서비스 설정', path: '/settings/connectconfigmanage/interlockdevice/service' },
    { label: '포트 연결정보 설정', path: '/settings/connectconfigmanage/interlockdevice/port' },
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
