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
  "title": "설정/연결설정관리",
  // "specialprocessunit": "전문처리장치",
  "interlockdevice": "보안장비연동장치",
  "wirelesslink": "무선링크연동장치",
  "repeater": "유무선통합중계기",
  "etc": "기타",
  // "wirelesschannelbond": "무선채널조합"
};

const en = {
  "title": "Settings/Connectconfigmanage",
  // "specialprocessunit": "Specialprocessunit",
  "interlockdevice": "Interlockdevice",
  "wirelesslink": "Wirelesslink",
  "repeater": "Repeater",
  "etc": "Etc",
  // "wirelesschannelbond": "Wirelesschannelbond"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/connectconfigmanage/interlockdevice');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    // { label: lang.value.specialprocessunit, path: '/settings/connectconfigmanage/specialprocessunit' },
    { label: lang.value.interlockdevice, path: '/settings/connectconfigmanage/interlockdevice/service' },
    { label: lang.value.wirelesslink, path: '/settings/connectconfigmanage/wirelesslink/service' },
    { label: lang.value.repeater, path: '/settings/connectconfigmanage/repeater/service' },
    { label: lang.value.etc, path: '/settings/connectconfigmanage/etc/port' },
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
