<template>
  <div class="base-content">
    <div class="base-content--header">
      <div class="base-content--header-title">
         {{ lang.title }}
      </div>
      <div>
        <button type="button" @click="onClickView('/callconnectconfig/pointtopoint')">{{ lang.pointtopoint }}</button>
        <button type="button" @click="onClickView('/callconnectconfig/meetingcall')">{{ lang.meetingcall }}</button>
        <button type="button" @click="onClickView('/callconnectconfig/groupcall')">{{ lang.groupcall }}</button>
        <button type="button" @click="onClickView('/callconnectconfig/wirelessequip')">{{ lang.wirelessequip }}</button>
        <button type="button" @click="onClickView('/callconnectconfig/broadcastequip')">{{ lang.broadcastequip }}</button>
        <button type="button" @click="onClickView('/callconnectconfig/alarm')">{{ lang.alarm }}</button>
        <button type="button" @click="onClickView('/callconnectconfig/wireless')">{{ lang.wireless }}</button>
      </div>
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

const ko = {
  "title": "통화연결설정",
  "pointtopoint": "점대점",
  "meetingcall": "회의통화",
  "groupcall": "그룹통화",
  "wirelessequip": "무선장비",
  "broadcastequip": "방송장비",
  "alarm": "경보",
  "wireless": "무선"
};

const en = {
  "title": "통화연결설정",
  "pointtopoint": "점대점",
  "meetingcall": "회의통화",
  "groupcall": "그룹통화",
  "wirelessequip": "무선장비",
  "broadcastequip": "방송장비",
  "alarm": "경보",
  "wireless": "무선"
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
