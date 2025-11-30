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
  "title": "사용자관리",
  "accountmanage": "계정관리",
  "changepassword": "비밀번호변경",
  "permissionmanage": "권한관리",
  "shortcutconfig": "바로가기 설정"
};

const en = {
  "title": "Usermanage",
  "accountmanage": "Accountmanage",
  "changepassword": "Changepassword",
  "permissionmanage": "Permissionmanage",
  "shortcutconfig": "Shortcutconfig"
};

const lang = ref({});
const router = useRouter();
const selectedTab = ref('/usermanage/accountmanage');
const tabList = ref([]);

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  tabList.value = [
    { label: lang.value.accountmanage, path: '/usermanage/accountmanage' },
    { label: lang.value.permissionmanage, path: '/usermanage/permissionmanage' },
    { label: lang.value.changepassword, path: '/usermanage/changepassword' },
    { label: lang.value.shortcutconfig, path: '/usermanage/shortcutconfig' }
  ];
  selectedTab.value = router.currentRoute.value.path;
});

const onClickView = (item) => {
  selectedTab.value = item;
  router.push("/default").catch(() => {});
  router.push(item);
};
</script>
