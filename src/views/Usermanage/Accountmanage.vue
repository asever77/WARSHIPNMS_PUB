<template>
  <h2 class="table-title-box">
    {{ lang.title }}
  </h2>
  <table class="table-type-a">
    <colgroup>
      <col style="width:16rem">
      <col style="width:calc(50% - 16rem)">
      <col style="width:16rem">
      <col style="width:calc(50% - 16rem)">
    </colgroup>
    <tbody>
    <tr>
      <th scope="row">{{ lang.table1 }}</th>
      <td><BFormInput id="input-1" class="ui-input" v-model="text" placeholder=""></BFormInput></td>
      <th scope="row">{{ lang.table2 }}</th>
      <td><BButton class="blue24">{{ lang.btn1 }}</BButton></td>
    </tr>
    <tr>
      <th scope="row">{{ lang.table3 }}</th>
      <td><BFormInput id="input-2" class="ui-input" v-model="text" placeholder=""></BFormInput></td>
      <th scope="row">{{ lang.table4 }}</th>
      <td><BFormSelect id="select-1" class="ui-select" v-model="selected" :options="options1"></BFormSelect></td>
    </tr>
    <tr>
      <th scope="row">{{ lang.table5 }}</th>
      <td><BFormInput id="input-3" class="ui-input" v-model="text" placeholder=""></BFormInput></td>
      <th scope="row">{{ lang.table6 }}</th>
      <td><BFormSelect id="select-2" class="ui-select" v-model="selected" :options="options2"></BFormSelect></td>
    </tr>
    <tr>
      <th scope="row">{{ lang.table7 }}</th>
      <td><BFormInput id="input-4" class="ui-input" v-model="text" placeholder=""></BFormInput></td>
      <th scope="row">{{ lang.table8 }}</th>
      <td><BFormSelect id="select-3" class="ui-select" v-model="selected" :options="options3"></BFormSelect></td>
    </tr>
    </tbody>
  </table>

  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
    <BButton class="gray28">{{ lang.btn3 }}</BButton>
    <BButton class="gray28">{{ lang.btn4 }}</BButton>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import G from "@/config/global.js";
import {BFormInput, BFormSelect} from "bootstrap-vue-next/components";
import {BButton} from "bootstrap-vue-next";

// BFormInput
const text = ref('')

const selected = ref(null)
const options1 = computed(() => [
  { value: null, text: lang.value.optionSelect ?? "" },
  { value: 'a', text: lang.value.option1 ?? "" },
  { value: 'b', text: lang.value.option2 ?? "" },
])
const options2 = computed(() => [
  { value: null, text: lang.value.optionSelect ?? "" },
  { value: 'a', text: lang.value.option3 ?? "" },
  { value: 'b', text: lang.value.option4 ?? "" },
])
const options3 = computed(() => [
  { value: null, text: lang.value.optionSelect ?? "" },
  { value: 'a', text: lang.value.option5 ?? "" },
  { value: 'b', text: lang.value.option6 ?? "" },
])

const ko = {
  "title": "사용자 계정 정보",
  "table1": "사용자 ID",
  "table2": "비밀번호",
  "table3": "사용자 명",
  "table4": "사용자 등급",
  "table5": "핸드폰 번호",
  "table6": "근무지",
  "table7": "재 로그인 가능시간",
  "table8": "계정 사용여부",
  "btn1": "초기화",
  "btn2": "즉시사용",
  "btn3": "저장",
  "btn4": "삭제",
  "btn5": "조회",
  "optionSelect": "선택하세요",
  "option1": "Admin",
  "option2": "Manager",
  "option3": "후부장교실1",
  "option4": "후부장교실2",
  "option5": "사용",
  "option6": "사용안함",
};

const en = {
  "title": "사용자 계정 정보",
  "table1": "사용자 ID",
  "table2": "비밀번호",
  "table3": "사용자 명",
  "table4": "사용자 등급",
  "table5": "핸드폰 번호",
  "table6": "근무지",
  "table7": "재 로그인 가능시간",
  "table8": "계정 사용여부",
  "btn1": "초기화",
  "btn2": "즉시사용",
  "btn3": "저장",
  "btn4": "삭제",
  "btn5": "조회",
  "optionSelect": "선택하세요",
  "option1": "Admin",
  "option2": "Manager",
  "option3": "후부장교실1",
  "option4": "후부장교실2",
  "option5": "사용",
  "option6": "사용안함",
};

const lang = ref({});

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
});
</script>
