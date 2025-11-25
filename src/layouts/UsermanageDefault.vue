<template>
    <div>
        <div style="margin-left: 150px;width: 1200px;">
            <div style="border: 1px solid #000000;">
                {{ lang.title }}
                <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/usermanage/accountmanage')">{{ lang.accountmanage }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/usermanage/permissionmanage')">{{ lang.permissionmanage }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/usermanage/changepassword')">{{ lang.changepassword }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/usermanage/shortcutconfig')">{{ lang.shortcutconfig }}</span>
            </div>
            <div>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import { useRouter } from "vue-router";

const ko = {
  "title": "사용자관리",
  "accountmanage": "계정관리",
  "permissionmanage": "권한관리",
  "changepassword": "비밀번호변경",
  "shortcutconfig": "바로가기설정"
};

const en = {
  "title": "사용자관리",
  "accountmanage": "계정관리",
  "permissionmanage": "권한관리",
  "changepassword": "비밀번호변경",
  "shortcutconfig": "바로가기설정"
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
</script>