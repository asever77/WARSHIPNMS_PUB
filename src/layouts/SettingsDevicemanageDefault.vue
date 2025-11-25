<template>
    <div>
        <div style="margin-left: 150px;width: 1200px;">
            <div style="border: 1px solid #000000;">
                {{ lang.title }}
                <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/settings/devicemanage/userterminal')">{{ lang.userterminal }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/devicemanage/receptacleunit')">{{ lang.receptacleunit }}</span>
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
  "title": "설정/단말관리",
  "userterminal": "사용자단말",
  "receptacleunit": "리셉터클유닛"
};

const en = {
  "title": "설정/단말관리",
  "userterminal": "사용자단말",
  "receptacleunit": "리셉터클유닛"
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