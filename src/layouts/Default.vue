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
            <span>{{ lang.adminName }}</span>
            <BButton variant="primary" @click="onClickView('/')">{{ lang.logout }}</BButton>
          </div>
        </div>

        <!-- <button type="button" style="cursor: pointer;" @click="onClickView('/')">{{ lang.logout }}</button> -->

      </header>
      <nav class="base-nav">
        <ul>
          <li>
            <BButton variant="link" :class="{ active: selectedMenu === '/dashboard/network' }" @click="onClickView('/dashboard/network')">{{ lang.dashboard }}</BButton>
          </li>
          <li>
            <BButton variant="link" :class="{ active: selectedMenu.startsWith('/settings') }">{{ lang.settings }}</BButton>
            <ul>
              <li>
                <BButton variant="link" :class="{ active: selectedMenu === '/settings/devicemanage/userterminal' }" @click="onClickView('/settings/devicemanage/userterminal')">{{ lang.devicemanage }}</BButton>
              </li>
              <li>
                <BButton variant="link" :class="{ active: selectedMenu === '/settings/connectconfigmanage/specialprocessunit' }" @click="onClickView('/settings/connectconfigmanage/specialprocessunit')">{{ lang.connectconfigmanage }}</BButton>
              </li>
              <li>
                <BButton variant="link" :class="{ active: selectedMenu === '/settings/callmanage/membermanage' }" @click="onClickView('/settings/callmanage/membermanage')">{{ lang.callmanage }}</BButton>
              </li>
              <li>
                <BButton variant="link" :class="{ active: selectedMenu === '/settings/externallinkagemanage/broadcastequipmanage' }" @click="onClickView('/settings/externallinkagemanage/broadcastequipmanage')">{{ lang.externallinkagemanage }}</BButton>
              </li>
              <li>
                <BButton variant="link" :class="{ active: selectedMenu === '/settings/operationconfigmanage/operationconfigbackup' }" @click="onClickView('/settings/operationconfigmanage/operationconfigbackup')">{{ lang.operationconfigmanage }}</BButton>
              </li>
              <li>
                <BButton variant="link" :class="{ active: selectedMenu === '/settings/equipmanage/devicemanage' }" @click="onClickView('/settings/equipmanage/devicemanage')">{{ lang.equipmanage }}</BButton>
              </li>
              <li>
                <BButton variant="link" :class="{ active: selectedMenu === '/settings/planmanage/drawingmanage' }" @click="onClickView('/settings/planmanage/drawingmanage')">{{ lang.planmanage }}</BButton>
              </li>
            </ul>
          </li>

          <li>
            <BButton variant="link" :class="{ active: selectedMenu === '/callconnectconfig/pointtopoint' }" @click="onClickView('/callconnectconfig/pointtopoint')">
              {{ lang.callconnectconfig }}
            </BButton>
          </li>
          <li>
            <BButton variant="link" :class="{ active: selectedMenu === 'recordingmanagement' }" @click="openPopup('https://www.naver.com')">{{ lang.recordingmanagement }}</BButton>
          </li>
          <li>
            <BButton variant="link" :class="{ active: selectedMenu === '/deviceoperation/firmwaremanage' }" @click="onClickView('/deviceoperation/firmwaremanage')">{{ lang.deviceoperation }}</BButton>
          </li>
          <li>
            <BButton variant="link" :class="{ active: selectedMenu === '/documentmanage/manual' }" @click="onClickView('/documentmanage/manual')">{{ lang.documentmanage }}</BButton>
          </li>
          <li>
            <BButton variant="link" :class="{ active: selectedMenu === '/usermanage/accountmanage' }" @click="onClickView('/usermanage/accountmanage')">{{ lang.usermanage }}</BButton>
          </li>
          <li>
            <BButton variant="link" :class="{ active: selectedMenu === '/record/callrecord' }" @click="onClickView('/record/callrecord')">{{ lang.record }}</BButton>
          </li>
        </ul>
      </nav>
    </div>
    <main class="base-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/*
  :deep() 선택자를 사용하여 자식 컴포넌트인 BTabs의 내부 요소(nav-link)에 스타일을 적용합니다.
  .tabs-line 클래스가 있을 때만 이 스타일이 적용됩니다.
*/
.base-wrapper {
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 100vh;
}
.base-side {
  width:25rem;
  background-color: #001B30;
  display: flex;
  flex-direction: column;
}
.base-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-secondary-blue);
  padding:1.8rem 0 1.8rem;
  gap:1.7rem;
}
.base-header .logo {
  height: 7.2rem;
  width: auto;
  display: block;
}
.admin-area {
  display: flex;
  width: 100%;
  padding:0 2.5rem;
  gap:1rem;
  align-items: center;
  font-size: 1.2rem;
  color:#FFFFFF;
}
.admin-area:deep(button) {
  background-color: var(--color-primary);
  border-radius: .9rem;
  height: 1.8rem;
  line-height: 1;
  color:#65BBF3;
  font-size:1rem;
  max-width: 7.6rem;
  display:inline-flex;
  align-items: center;
  justify-content: center;
}
.admin-area--avata {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #1E5379;
  display: flex;
  align-items: center;
  justify-content: center;
}
.admin-area--avata img {
  width:3rem;
  height:3rem;
}

.base-nav {
  display: flex;
  padding: 1.5rem;
  color: #fff;
}
.base-nav ul {
  padding-left:0;
  width:100%;
  display: flex;
  flex-direction: column;
  gap:1rem;
}
.base-nav ul ul {
  display:none;
}
.base-nav li {
  width: 100%;
}
.base-nav button svg {
  position: absolute;
  left: 2.4rem;
  top: 50%;
  transform: translateY(-50%);
}
.base-nav button {
  position: relative;
  padding-left:6.4rem;
  width: 100%;
  color: #fff;
  text-align: left;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  height: 3.4rem;
}

.base-nav .active {
  color: var(--color-primary);
  background-color: var(--color-secondary-blue);
}
</style>

<script setup>
import { ref, onMounted, watch } from "vue";
import G from "@/config/global.js";
import { useRouter } from "vue-router";
import { BButton } from 'bootstrap-vue-next'

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
const selectedMenu = ref(router.currentRoute.value.path);

watch(() => router.currentRoute.value.path, (newPath) => {
  selectedMenu.value = newPath;
});

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
