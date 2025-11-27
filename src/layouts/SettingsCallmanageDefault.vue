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
  "title": "설정/통화관리",
  "membermanage": "가입자관리",
  "meetingcallmanage": "회의통화관리",
  "groupcallmanage": "그룹통화관리",
  "dscpmanage": "DSCP관리"
};

const en = {
  "title": "Settings/Callmanage",
  "membermanage": "Membermanage",
  "meetingcallmanage": "Meetingcallmanage",
  "groupcallmanage": "Groupcallmanage",
  "dscpmanage": "DSCPmanage"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/callmanage/membermanage');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.membermanage, path: '/settings/callmanage/membermanage' },
    { label: lang.value.meetingcallmanage, path: '/settings/callmanage/meetingcallmanage' },
    { label: lang.value.groupcallmanage, path: '/settings/callmanage/groupcallmanage' },
    { label: lang.value.dscpmanage, path: '/settings/callmanage/dscpmanage' }
  ];
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
