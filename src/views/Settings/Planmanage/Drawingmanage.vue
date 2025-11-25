<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";

const ko = {
  "title": "도면관리 내용"
};

const en = {
  "title": "도면관리 내용"
};

const lang = ref({});

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
});
</script>