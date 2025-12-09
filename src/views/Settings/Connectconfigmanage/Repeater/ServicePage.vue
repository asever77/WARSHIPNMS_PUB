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
  "title": "무선장치 설정"
};

const en = {
  "title": "무선장치 설정"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/connectconfigmanage/repeater/service');
const tabList = ref([]);
onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: '무선장치 설정', path: '/settings/connectconfigmanage/repeater/service' },
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
