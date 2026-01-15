<template>
  <div class="base-wrap">
    <div class="search-base">

      <div class="search-base--btns">
        <BButton class="blue28">
          {{ lang.text1 }}
        </BButton>
      </div>

    </div>
    <div class="base-table">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 16rem" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: 14rem" />
       </colgroup>
        <thead>
          <tr>
            <th scope="col">{{ lang.table1 }}</th>
            <th scope="col">{{ lang.table2 }}</th>
            <th scope="col">{{ lang.table3 }}</th>
            <th scope="col">{{ lang.table4 }}</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <BFormInput class="ui-input" placeholder=""></BFormInput>
            </td>
            <td>
              <BFormSelect class="ui-select-28" />
            </td>
            <td>
              <BFormSelect class="ui-select-28" />
              <BFormSelect class="ui-select-28" />
            </td>
            <td>
              <BFormSelect class="ui-select-28" />
              <BFormSelect class="ui-select-28" />
            </td>
            <td>
              <BButton class="gray24 min-w-0" >{{ lang.text3 }}</BButton>
              <BButton class="gray24 min-w-0" >{{ lang.text2 }}</BButton>
            </td>
          </tr>

          <tr>
            <td>
              <BFormInput class="ui-input" placeholder=""></BFormInput>
            </td>
            <td>
              <BFormSelect class="ui-select-28" />
            </td>
            <td>
              <BFormSelect class="ui-select-28" />
              <BFormSelect class="ui-select-28" />
            </td>
            <td>
              <BFormSelect class="ui-select-28" />
              <BFormSelect class="ui-select-28" />
            </td>
            <td>
              <BButton class="gray24 min-w-0" >{{ lang.text3 }}</BButton>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>

</template>

<style scoped>
  .search-base--btns {
    width: 100%;
    justify-content: flex-end;
  }
  .table-type-a tbody tr td .ui-select-28 {
    margin-bottom: 0.4rem;
  }
  .table-type-a tbody tr td .gray24 {
    margin-right: 0.4rem;
  }
</style>

<script setup>

import { ref, onMounted, computed, reactive} from 'vue';
import { BButton, BFormInput,BFormSelect } from 'bootstrap-vue-next';
import G from "@/config/global.js";

const ko = {
  text1: "논리무선장치 추가+",
  text2: "삭제",
  text3: "저장",
  table1: "무선장치 이름",
  table2: "주파수 대역",
  table3: "RX",
  table4: "TX",
};

const en = {
  text1: "논리무선장치 추가+",
  text2: "삭제",
  text3: "저장",
  table1: "무선장치 이름",
  table2: "주파수 대역",
  table3: "RX",
  table4: "TX",
};

const lang = ref({});

onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
