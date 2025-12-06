<template>
    <div class="ui-excel-table">
      <table class="table-type-b">
        <thead>
        <tr>
          <th></th>
          <th scope="col"><span>{{ lang.thead1 }}</span></th>
          <th scope="col"><span>{{ lang.thead2 }}</span></th>
          <th scope="col" v-for="n in 40" :key="n"><span>{{ lang.thead1 }}</span></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="n in 20" :key="n">
          <th scope="col">{{ lang.tbody1 }}</th>
          <td v-for="n in 42" :key="n"></td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";

const ko = {
  thead1: "BRIDGE 1/CAPTAIN(S)",
  thead2: "BRDG 2 /CONNING",
  tbody1: "BRIDGE 1/CAPTAIN(S)"
};

const en = {
  thead1: "BRIDGE 1/CAPTAIN(S)",
  tbody1: "BRIDGE 1/CAPTAIN(S)"
};

const lang = ref({});

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
});
</script>
