<template>
  <div class="ui-excel-table">
    <table class="table-type-b">
      <colgroup>
        <col style="width: 20rem;" />
        <col v-for="n in (tableData.thead.length - 1)" :key="n" style="width: 3rem;" />
      </colgroup>
      <thead>
        <tr>
          <th :class="{thhover: hoveredCol === -1}"><!-- 좌상단 빈칸 --></th>
          <th v-for="(th, colIdx) in tableData.thead" :key="colIdx" :class="{thhover: hoveredCol === colIdx}">
            <span>{{ th }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIdx) in tableData.rows" :key="rowIdx">
          <th :class="{thhover: hoveredRow === rowIdx}">{{ tableData.tbody[rowIdx] }}</th>
          <td v-for="(selected, colIdx) in row.cols" :key="colIdx"
              @mouseover="handleTdMouseOver(rowIdx, colIdx)"
              @mouseleave="handleTdMouseLeave"
              @click="selected !== 'not' && handleTdClick(rowIdx, colIdx)"
              :class="[ {tdhover: hoveredCol === colIdx && hoveredRow === rowIdx}, selected === true ? 'selected' : selected === 'not' ? 'not' :'' ]"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>

  <UiModal v-model="modals.modalPointSetting.show" :title="tableData.tbody[modals.modalPointSetting.rowIdx]" type="modal" size="md" @close-btn-click="modals.modalPointSetting.show = false">
    <div class="ui-flex" data-direction="col" data-gap="8" style="padding-top: 0;">
      <h2 class="layer-title-box">
        <img src="@/assets/images/icon/icon-aspect-title-4.svg" alt="icon" />
        무선통신기
      </h2>
      <div class="box-pp">
        <BButton v-for="(btn, idx) in ppButtons" :key="idx" class="box-pp--item" @click="openModify(btn, idx)">{{ btn }}</BButton>
      </div>
    </div>
  </UiModal>

  <UiModal v-model="modals.modalModify.show" :title="lang.modalTitle" type="modal" size="md" @close-btn-click="modals.modalModify.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.deviceName }}</th>
            <td>
              {{ tableData.thead[selectedButton.colIdx] }}
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.deviceLabel }}</th>
            <td>
              <BFormInput
                class="ui-input"
                placeholder=""
                :model-value="tableData.thead[selectedButton.colIdx]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.callMode }}</th>
            <td>
                <BFormSelect
                  v-model="selectCallMode"
                  class="ui-select mb-1"
                  :disabled="true"
                  :options="[
                    { value: '1', text: 'PTT' },
                  ]"
                />
            </td>
          </tr>
          <tr>
            <th scope="row">녹음설정</th>
            <td>
                <BFormSelect
                  v-model="selectRecordSetting"
                  class="ui-select"
                  :options="[
                    { value: '1', text: '자동녹음' },
                  ]"
                />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.speakerDirection }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">왼쪽</BFormCheckbox>
                <BFormCheckbox value="2">오른쪽</BFormCheckbox>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <div class="ui-flex ui-w-full px-26" data-gap="8" data-justify-align="center">
        <BButton class="gray28" @click="modals.modalModify.show = false">{{ lang.cancel }}</BButton>
        <BButton class="blue28">{{ lang.save }}</BButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import G from "@/config/global.js";
import UiModal from "@/components/UiModal.vue";
import { BFormSelect, BButton, BFormCheckbox, BFormInput } from "bootstrap-vue-next";

// Select default values for all selects
const selectCallMode = ref('1');
const selectRecordSetting = ref('1');

// 점대점 통화 버튼 데이터
const ppButtons = [
  'HLCPTR CONTRC', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
];

const ko = {
  modalTitle: '무선통신기 연결 수정',
  deviceName: '무선통신기명',
  deviceLabel: '통화기능키 레이블',
  callMode: '통화모드',
  speakerDirection: '스피커 출력방향',
  cancel: '취소',
  save: '저장',
  delete: '삭제',
};

const en = {
  modalTitle: '무선통신기 연결 수정',
  deviceName: '무선통신기명',
  deviceLabel: '통화기능키 레이블',
  callMode: '통화모드',
  speakerDirection: '스피커 출력방향',
  cancel: '취소',
  save: '저장',
  delete: '삭제',
};

const lang = computed(() => (G.lang === "ko" ? ko : en));

const modals = reactive({
  modalModify: { show: false },
  modalPointSetting: { show: false, rowIdx: null },
});

const selectedButton = reactive({
  label: '',
  rowIdx: null,
  colIdx: null,
});

// JSON 기반 테이블 데이터
const tableData = ref({
  thead: Array.from({ length: 40 }, (_, i) => `BRIDGE 8/INF-CONNING ${i + 1}`),
  tbody: Array.from({ length: 40 }, (_, i) => `BRIDGE 8/INF-CONNING ${i + 1}`),
  rows: Array.from({ length: 40 }, (_, rowIdx) => ({
    cols: Array.from({ length: 40 }, (__, colIdx) => {
      if (rowIdx === colIdx) return 'not'; // 대각선은 'not'
      if ((rowIdx + colIdx) % 13 === 0) return true; // 임의로 true 배치
      return false;
    })
  }))
});

const hoveredCol = ref(null);
const hoveredRow = ref(null);

function handleTdMouseOver(rowIdx, colIdx) {
  hoveredCol.value = colIdx;
  hoveredRow.value = rowIdx;
}
function handleTdMouseLeave() {
  hoveredCol.value = null;
  hoveredRow.value = null;
}
function handleTdClick(rowIdx, colIdx) {
  modals.modalPointSetting.rowIdx = rowIdx;
  selectedButton.rowIdx = rowIdx;
  selectedButton.colIdx = colIdx;
  modals.modalPointSetting.show = true;
}
function openModify(buttonLabel, colIdx) {
  selectedButton.label = buttonLabel;
  modals.modalModify.show = true;
}
</script>

<style scoped>
.ui-excel-table .table-type-b {
  min-width: auto;
}
</style>
