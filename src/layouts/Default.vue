<template>
  <div class="base-wrapper">
    <div class="base-side">
      <header class="base-header">
        <h1 class="base-header--logo">
          <span class="a11y-hidden">대한민국해군 REPUBLIC OF KOREA NAVY</span>
        </h1>

        <div class="admin-area">
          <div class="admin-area--avata">
            <img src="/images/icon/icon-aspect-user.svg" alt="">
          </div>
          <div class="admin-area--info">
            <span>{{ lang.adminName }}</span>
            <BButton variant="primary" @click="onClickView('/')">{{ lang.logout }}</BButton>
          </div>
        </div>
      </header>

      <UiTree :menu="menuTree" data-style="base" />

    </div>
    <main class="base-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import { useRouter } from "vue-router";
import { BButton } from 'bootstrap-vue-next';

import UiTree from '@/components/UiTree.vue';

const ko = {
  "adminName" : "관리자 : 김운영",
  "image": "이미지",
  "logout": "Logout",
  "dashboard": "대시보드",
  "settings": "설정",
  "devicemanage": "단말관리",
  "connectconfigmanage": "연결설정관리",
  "callmanage": "통화관리",
  "externallinkagemanage": "외부연계관리",
  "operationconfigmanage": "운영정보관리",
  "equipmanage": "장치관리",
  "planmanage": "도면관리",
  "callconnectconfig": "통화연결설정",
  "recordingmanagement": "녹음관리",
  "deviceoperation": "장치운영",
  "documentmanage": "문서관리",
  "usermanage": "사용자관리",
  "record": "이력"
};

const en = {
  "adminName" : "관리자 : 김운영",
  "image": "이미지",
  "logout": "Logout",
  "dashboard": "Dashboard",
  "settings": "Settings",
  "devicemanage": "Devicemanage",
  "connectconfigmanage": "Connectconfigmanage",
  "callmanage": "Callmanage",
  "externallinkagemanage": "Externallinkagemanage",
  "operationconfigmanage": "Operationconfigmanage",
  "equipmanage": "Equipmanage",
  "planmanage": "Planmanage",
  "callconnectconfig": "Callconnectconfig",
  "recordingmanagement": "Recordingmanagement",
  "deviceoperation": "Deviceoperation",
  "documentmanage": "Documentmanage",
  "usermanage": "Usermanage",
  "record": "Record"
};

const lang = ref({});
const router = useRouter();

const menuTree = ref([]);

function makeMenuTree(lang) {
  let id = 1;
  const nextId = () => id++;
  return [
    {
      id: nextId(),
      label: lang.dashboard,
      path: '/dashboard/network',
      icon: 'nav1',
      dep1:'dashboard'
    },
    {
      id: nextId(),
      label: lang.settings,
      icon: 'nav2',
      dep1:'settings',
      children: [
        { id: nextId(), label: lang.devicemanage, path: '/settings/devicemanage/userterminal', dep1:'settings' },
        { id: nextId(), label: lang.connectconfigmanage, path: '/settings/connectconfigmanage/specialprocessunit', dep1:'settings' },
        { id: nextId(), label: lang.callmanage, path: '/settings/callmanage/membermanage', dep1:'settings' },
        { id: nextId(), label: lang.externallinkagemanage, path: '/settings/externallinkagemanage/broadcastequipmanage', dep1:'settings' },
        { id: nextId(), label: lang.operationconfigmanage, path: '/settings/operationconfigmanage/operationconfigbackup', dep1:'settings' },
        { id: nextId(), label: lang.equipmanage, path: '/settings/equipmanage/devicemanage', dep1:'settings' },
        { id: nextId(), label: lang.planmanage, path: '/settings/planmanage/drawingmanage', dep1:'settings' },
      ]
    },
    { id: nextId(), label: lang.callconnectconfig, path: '/callconnectconfig/pointtopoint', icon: 'nav3', dep1:'callconnectconfig' },
    { id: nextId(), label: lang.recordingmanagement, popup: 'https://www.naver.com', icon: 'nav5'},
    { id: nextId(), label: lang.deviceoperation, path: '/deviceoperation/firmwaremanage', icon: 'nav6', dep1:'deviceoperation' },
    { id: nextId(), label: lang.documentmanage, path: '/documentmanage/manual', icon: 'nav7', dep1:'documentmanage' },
    { id: nextId(), label: lang.usermanage, path: '/usermanage/accountmanage', icon: 'nav8', dep1:'usermanage' },
    { id: nextId(), label: lang.record, path: '/record/callrecord', icon: 'nav10', dep1:'record' },
  ];
}

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  menuTree.value = makeMenuTree(lang.value);
});

</script>
