<template>
  <div>
    <aside style="float: left;border: 1px solid rgb(0, 0, 0);width: 150px;height: 768px;">
        <ul>
            <li>{{ lang.image }}</li>
            <li>admin(관리자)</li>
            <li style="cursor: pointer;" @click="onClickView('/')">{{ lang.logout }}</li>
            <li>
                즐겨찾기영역
            </li>
            <li style="cursor: pointer;" @click="onClickView('/dashboard/network')">{{ lang.dashboard }}</li>
            <li>{{ lang.settings }}</li>
            <li style="cursor: pointer;" @click="onClickView('/settings/devicemanage/userterminal')">&nbsp;-&nbsp;{{ lang.devicemanage }}</li>
            <li style="cursor: pointer;" @click="onClickView('/settings/connectconfigmanage/specialprocessunit')">&nbsp;-&nbsp;{{ lang.connectconfigmanage }}</li>
            <li style="cursor: pointer;" @click="onClickView('/settings/callmanage/membermanage')">&nbsp;-&nbsp;{{ lang.callmanage }}</li>
            <li style="cursor: pointer;" @click="onClickView('/settings/externallinkagemanage/broadcastequipmanage')">&nbsp;-&nbsp;{{ lang.externallinkagemanage }}</li>
            <li style="cursor: pointer;" @click="onClickView('/settings/operationconfigmanage/operationconfigbackup')">&nbsp;-&nbsp;{{ lang.operationconfigmanage }}</li>
            <li style="cursor: pointer;" @click="onClickView('/settings/equipmanage/devicemanage')">&nbsp;-&nbsp;{{ lang.equipmanage }}</li>
            <li style="cursor: pointer;" @click="onClickView('/settings/planmanage/drawingmanage')">&nbsp;-&nbsp;{{ lang.planmanage }}</li>
            <li style="cursor: pointer;" @click="onClickView('/callconnectconfig/pointtopoint')">{{ lang.callconnectconfig }}</li>
            <li style="cursor: pointer;" @click="openPopup('https://www.naver.com')">{{ lang.recordingmanagement }}</li>
            <li style="cursor: pointer;" @click="onClickView('/deviceoperation/firmwaremanage')">{{ lang.deviceoperation }}</li>
            <li style="cursor: pointer;" @click="onClickView('/documentmanage/manual')">{{ lang.documentmanage }}</li>
            <li style="cursor: pointer;" @click="onClickView('/usermanage/accountmanage')">{{ lang.usermanage }}</li>
            <li style="cursor: pointer;" @click="onClickView('/record/callrecord')">{{ lang.record }}</li>
        </ul>
    </aside>
    <main>
        <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import { useRouter } from "vue-router";

const ko = {
  "image": "이미지",
  "logout": "로그아웃",
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

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
});

const onClickView = (item) => {
  router.push("/default").catch(() => {});
  router.push(item);
};

const openPopup = (item) => {
  const name = 'popup';
  const features = 'width=800,height=600,left=300,top=200,resizable=yes,scrollbars=yes';
  window.open(item, name, features);
};
</script>
