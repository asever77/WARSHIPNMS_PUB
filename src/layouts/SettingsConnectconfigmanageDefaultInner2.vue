<template>
  <div>
    <div class="tab-inner">
      <TabBase :tabs="tabList" :selected="selectedTab" @select="onClickView" />
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import { useRouter } from "vue-router";
import TabBase from '@/components/TabBase.vue';

const ko = {
  menu1 : "서비스 설정",
  menu2 : "포트 연결정보 설정"
};

const en = {

};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/connectconfigmanage/wirelesslink');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.menu1, path: '/settings/connectconfigmanage/wirelesslink/service' },
    { label: lang.value.menu2, path: '/settings/connectconfigmanage/wirelesslink/port' },
    // { label: lang.value.wirelesschannelbond, path: '/settings/connectconfigmanage/wirelesschannelbond' }
  ];
  // 현재 경로에서 마지막 segment를 제외한 path만 할당
  // const pathArr = router.currentRoute.value.path.split('/');
  // if (pathArr.length > 1) {
  //   selectedTab.value = '/' + pathArr.slice(1, -1).join('/');
  // } else {
  //   selectedTab.value = router.currentRoute.value.path;
  // }
  switch (router.currentRoute.value.path) {
    case '/settings/connectconfigmanage/interlockdevice/service':
    case '/settings/connectconfigmanage/interlockdevice/port':
      selectedTab.value = '/settings/connectconfigmanage/interlockdevice/service';
      break;
    case '/settings/connectconfigmanage/wirelesslink/service':
    case '/settings/connectconfigmanage/wirelesslink/port':
      selectedTab.value = '/settings/connectconfigmanage/wirelesslink/service';
      break;
    case '/settings/connectconfigmanage/repeater/service':
       selectedTab.value = '/settings/connectconfigmanage/repeater/service';
      break;
    case '/settings/connectconfigmanage/etc/port':
      selectedTab.value = '/settings/connectconfigmanage/etc/port';
      break;
    default:
      selectedTab.value = router.currentRoute.value.path;
  }
  console.log('', selectedTab.value);
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
