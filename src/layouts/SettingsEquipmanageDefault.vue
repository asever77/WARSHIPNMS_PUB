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
  "title": "설정/장치관리",
  "devicemanage": "장치관리",
  "terminalboxmanage": "연결단자함관리",
  "rackmanage": "랙관리",
  "modelmanage": "모델관리",
  "frequencymanage": "주파수관리",
  "wirelesscommunicatebond": "무선통신기조합"
};

const en = {
  "title": "Settings/Equipmanage",
  "devicemanage": "Devicemanage",
  "terminalboxmanage": "Terminalboxmanage",
  "rackmanage": "Rackmanage",
  "modelmanage": "Modelmanage",
  "frequencymanage": "Frequencymanage",
  "wirelesscommunicatebond": "Wirelesscommunicatebond"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/settings/equipmanage/devicemanage');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.devicemanage, path: '/settings/equipmanage/devicemanage' },
    { label: lang.value.terminalboxmanage, path: '/settings/equipmanage/terminalboxmanage' },
    { label: lang.value.rackmanage, path: '/settings/equipmanage/rackmanage' },
    { label: lang.value.modelmanage, path: '/settings/equipmanage/modelmanage' },
    { label: lang.value.frequencymanage, path: '/settings/equipmanage/frequencymanage' },
    { label: lang.value.wirelesscommunicatebond, path: '/settings/equipmanage/wirelesscommunicatebond' }
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
