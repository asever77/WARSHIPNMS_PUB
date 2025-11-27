<template>
  <div class="base-wrapper">
    <div class="base-side">
      <header class="base-header">
        <h1>
          <img src="/images/common/lnb-logo-big.svg" alt="대한민국해군 REPUBLIC OF KOREA NAVY" class="logo" />
        </h1>

        <div class="admin-area">
          <div class="admin-area--avata">
            <img src="/images/icon/icon-aspect-user.svg" alt="">
          </div>
          <div class="d-flex flex-column gap-1">
            <span>관리자 : 김운영</span>
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
    { id: nextId(), label: lang.dashboard, path: '/dashboard/network', icon: 'dashboard' },
    {
      id: nextId(),
      label: lang.settings,
      icon: 'settings',
      children: [
        { id: nextId(), label: lang.devicemanage, path: '/settings/devicemanage/userterminal', icon: 'device' },
        { id: nextId(), label: lang.connectconfigmanage, path: '/settings/connectconfigmanage/specialprocessunit', icon: 'connect' },
        { id: nextId(), label: lang.callmanage, path: '/settings/callmanage/membermanage', icon: 'call' },
        { id: nextId(), label: lang.externallinkagemanage, path: '/settings/externallinkagemanage/broadcastequipmanage', icon: 'external' },
        { id: nextId(), label: lang.operationconfigmanage, path: '/settings/operationconfigmanage/operationconfigbackup', icon: 'operation' },
        { id: nextId(), label: lang.equipmanage, path: '/settings/equipmanage/devicemanage', icon: 'equip' },
        { id: nextId(), label: lang.planmanage, path: '/settings/planmanage/drawingmanage', icon: 'plan' },
      ]
    },
    { id: nextId(), label: lang.callconnectconfig, path: '/callconnectconfig/pointtopoint', icon: 'connect' },
    { id: nextId(), label: lang.recordingmanagement, popup: 'https://www.naver.com', icon: 'recording' },
    { id: nextId(), label: lang.deviceoperation, path: '/deviceoperation/firmwaremanage', icon: 'device' },
    { id: nextId(), label: lang.documentmanage, path: '/documentmanage/manual', icon: 'document' },
    { id: nextId(), label: lang.usermanage, path: '/usermanage/accountmanage', icon: 'user' },
    { id: nextId(), label: lang.record, path: '/record/callrecord', icon: 'record' },
  ];
}

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  menuTree.value = makeMenuTree(lang.value);
});

</script>
