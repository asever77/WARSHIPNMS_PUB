<template>
    <div>
        <div style="margin-left: 150px;width: 1200px;">
            <div style="border: 1px solid #000000;">
                {{ lang.title }}
                <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/settings/externallinkagemanage/broadcastequipmanage')">{{ lang.broadcastequipmanage }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/externallinkagemanage/alarmdevicemanage')">{{ lang.alarmdevicemanage }}</span>
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
  "title": "설정/외부연계관리",
  "broadcastequipmanage": "방송장비관리",
  "alarmdevicemanage": "경보장치관리"
};

const en = {
  "title": "설정/외부연계관리",
  "broadcastequipmanage": "방송장비관리",
  "alarmdevicemanage": "경보장치관리"
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