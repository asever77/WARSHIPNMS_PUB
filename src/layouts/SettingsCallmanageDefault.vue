<template>
    <div>
        <div style="margin-left: 150px;width: 1200px;">
            <div style="border: 1px solid #000000;">
                {{ lang.title }}
                <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/settings/callmanage/membermanage')">{{ lang.membermanage }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/callmanage/meetingcallmanage')">{{ lang.meetingcallmanage }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/callmanage/groupcallmanage')">{{ lang.groupcallmanage }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/callmanage/dscpmanage')">{{ lang.dscpmanage }}</span>
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
  "title": "설정/통화관리",
  "membermanage": "가입자관리",
  "meetingcallmanage": "회의통화관리",
  "groupcallmanage": "그룹통화관리",
  "dscpmanage": "DSCP관리"
};

const en = {
  "title": "설정/통화관리",
  "membermanage": "가입자관리",
  "meetingcallmanage": "회의통화관리",
  "groupcallmanage": "그룹통화관리",
  "dscpmanage": "DSCP관리"
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