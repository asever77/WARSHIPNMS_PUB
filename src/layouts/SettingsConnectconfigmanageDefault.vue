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
  "title": "설정/연결설정관리",
  "specialprocessunit": "전문처리장치",
  "interlockdevice": "보안장비연동장치",
  "wirelesslink": "무선링크",
  "repeater": "유무선통합중계기",
  "etc": "기타",
  "wirelesschannelbond": "무선채널조합"
};

const en = {
  "title": "Settings/Connectconfigmanage",
  "specialprocessunit": "Specialprocessunit",
  "interlockdevice": "Interlockdevice",
  "wirelesslink": "Wirelesslink",
  "repeater": "Repeater",
  "etc": "Etc",
  "wirelesschannelbond": "Wirelesschannelbond"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/connectconfigmanage/specialprocessunit');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.specialprocessunit, path: '/settings/connectconfigmanage/specialprocessunit' },
    { label: lang.value.interlockdevice, path: '/settings/connectconfigmanage/interlockdevice' },
    { label: lang.value.wirelesslink, path: '/settings/connectconfigmanage/wirelesslink' },
    { label: lang.value.repeater, path: '/settings/connectconfigmanage/repeater' },
    { label: lang.value.etc, path: '/settings/connectconfigmanage/etc' },
    { label: lang.value.wirelesschannelbond, path: '/settings/connectconfigmanage/wirelesschannelbond' }
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
