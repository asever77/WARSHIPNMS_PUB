<template>
  <h2 class="table-title-box">
    {{ lang.title }}
  </h2>
  <table class="table-type-a">
    <colgroup>
      <col style="width:16rem">
      <col style="width:auto">
    </colgroup>
    <tbody>
    <tr>
      <th scope="row">{{ lang.table1 }}</th>
      <td><BFormInput id="input-1" class="ui-input" v-model="password" type="password" placeholder=""></BFormInput></td>
    </tr>
    <tr>
      <th scope="row">{{ lang.table2 }}</th>
      <td><BFormInput id="input-2" class="ui-input" v-model="password" type="password" placeholder=""></BFormInput></td>
    </tr>
    <tr>
      <th scope="row">{{ lang.table3 }}</th>
      <td><BFormInput id="input-3" class="ui-input" v-model="password" type="password" placeholder=""></BFormInput></td>
    </tr>
    </tbody>
  </table>
  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import {BButton} from "bootstrap-vue-next";
import {BFormInput, BFormSelect} from "bootstrap-vue-next/components";

// BFormInput
const password = ref('')

const ko = {
  "title": "비밀번호변경",
  "table1": "기존 비밀번호",
  "table2": "신규 비밀번호",
  "table3": "비밀번호 확인",
  "btn1": "변경",
};

const en = {
  "title": "비밀번호변경",
  "table1": "기존 비밀번호",
  "table2": "신규 비밀번호",
  "table3": "비밀번호 확인",
  "btn1": "변경",
};

const lang = ref({});

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
});
</script>
