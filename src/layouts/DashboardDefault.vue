<template>
    <div>
        <div style="margin-left: 150px;width: 1200px;">
            <div style="border: 1px solid #000000;">
                {{ lang.title }}
                <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/dashboard/network')">{{ lang.network }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/dashboard/userterminal')">{{ lang.userterminal }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/dashboard/receptacleunit')">{{ lang.receptacleunit }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/dashboard/rack')">{{ lang.rack }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/dashboard/activealarm')">{{ lang.activealarm }}</span>
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
  "title": "대시보드",
  "network": "네트워크",
  "userterminal": "사용자단말",
  "receptacleunit": "리셉터클유닛",
  "rack": "랙",
  "activealarm": "활성경보"
};

const en = {
  "title": "대시보드",
  "network": "네트워크",
  "userterminal": "사용자단말",
  "receptacleunit": "리셉터클유닛",
  "rack": "랙",
  "activealarm": "활성경보"
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