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

  <UiModal v-model="modals.modalPointSetting.show" :title="'BRDG1 CAPTS'" type="modal" size="lg" class="p0-type" @close-btn-click="modals.modalPointSetting.show = false">
    <div class="ui-flex" data-direction="row" data-gap="8" style="padding-top: 0;">
      <UiTabs id="tabs-group-2" type="userDevice">
        <!-- 슬롯을 통해 BTab 컴포넌트들을 전달합니다. -->
        <BTab disabled>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-1.svg" alt="icon" />
            <span>{{ lang.ccTab1 }}</span>
          </template>
        </BTab>
        <BTab disabled>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-2.svg" alt="icon" />
            <span>{{ lang.ccTab2 }}</span>
          </template>
        </BTab>
        <BTab disabled>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-3.svg" alt="icon" />
            <span>{{ lang.ccTab3 }}</span>
          </template>
        </BTab>
        <BTab disabled>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-4.svg" alt="icon" />
            <span>{{ lang.ccTab4 }}</span>
          </template>
        </BTab>
        <BTab disabled>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-5.svg" alt="icon" />
            <span>{{ lang.ccTab5 }}</span>
          </template>
        </BTab>
        <BTab disabled>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-6.svg" alt="icon" />
            <span>{{ lang.ccTab6 }}</span>
          </template>
        </BTab>
        <BTab active>
          <template #title>
            <img src="@/assets/images/icon/icon-aspect-title-7.svg" alt="icon" />
            <span>{{ lang.ccTab7 }}</span>
          </template>
          <div class="box-pp">
            <BButton v-for="(btn, idx) in ppButtons" :key="idx" class="box-pp--item" @click="openModify7(btn, idx)">{{ btn }}</BButton>
            <BButton class="box-pp--item add" @click="openModify7" aria-label="{{ lang.btnAdd }}"></BButton>
          </div>
        </BTab>
      </UiTabs>
    </div>
  </UiModal>

  <UiModal v-model="modals.modalModify7.show" :title="lang.ccModal7" type="modal" size="md" @close-btn-click="modals.modalModify7.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.ccTh7_1 }}</th>
            <td><b>CCTV구역명</b></td>
          </tr>
          <tr>
            <th scope="row">{{ lang.ccTh7_2 }}</th>
            <td>
              <BFormInput class="ui-input"  />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify7.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>
</template>

<script setup>
  // =========================
// [IMPORTS]
// =========================
// NOTE: 컴포넌트 이름은 multi-word로 권장됨. 실제 이름 변경 시 파일명, 라우터 등 전체 영향 주의
import { ref, onMounted, computed, reactive } from 'vue'
import G from "@/config/global.js";
import { BFormInput, BFormSelect, BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'
import { BTab } from 'bootstrap-vue-next'
import UiTabs from '@/components/UiTabs.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  modalTitle: '점대점 통화 연결 수정',

  btnCancel: '취소',
  btnSave: '저장',
  btnDelete: '삭제',

  ccTab1: '점대점 통화',
  ccTab2: '회의통화',
  ccTab3: '그룹통화',
  ccTab4: '무선통신기',
  ccTab5: '방송장비',
  ccTab6: '경보',
  ccTab7: 'CCTV',

  ccModal1: '점대점 통화 연결 수정',
  ccModal2: '회의통화 연결 등록',
  ccModal3: '그룹통화 연결 등록',
  ccModal4: '무선통신기 연결 등록',
  ccModal5: '방송장비 연결 등록',
  ccModal6: '경보 연결 등록',
  ccModal7: 'CCTV 연결 등록',
  // 점대점
  ccTh1_1: '피호출 사용자단말',
  ccTh1_2: '통화기능키 레이블',
  ccTh1_3: '통화모드',
  ccTh1_4: '응답모드',
  ccTh1_5: '녹음제어',
  ccTh1_6: '스피커 출력방향',
  ccTh1_7: '호출알림',
  // 회의통화
  ccTh2_1: '회의통화명',
  ccTh2_2: '통화기능키 레이블',
  ccTh2_3: '통화모드',
  ccTh2_4: '호출권한',
  ccTh2_5: '발언권한',
  ccTh2_6: '응답모드',
  ccTh2_7: '녹음제어',
  ccTh2_8: '스피커 출력방향',
  ccTh2_9: '호출알림',
  // 그룹통화
  ccTh3_1: '그룹통화명',
  ccTh3_2: '통화기능키 레이블',
  ccTh3_3: '통화모드',
  ccTh3_4: '호출권한',
  ccTh3_5: '발언권한',
  ccTh3_6: '응답모드',
  ccTh3_7: '녹음설정',
  ccTh3_8: '스피커 출력방향',
  ccTh3_9: '호출알림',
  // 무선통신
  ccTh4_1: '무선통신기명',
  ccTh4_2: '통화기능키 레이블',
  ccTh4_3: '통화모드',
  ccTh4_4: '녹음설정',
  ccTh4_5: '스피커 출력방향',
  // 방송장비
  ccTh5_1: '항목명',
  ccTh5_2: '통화기능키 레이블',
  ccTh5_3: '통화모드',
  // 경보
  ccTh6_1: '경보명',
  ccTh6_2: '통화기능키 레이블',
  // CCTV
  ccTh7_1: 'CCTV구역명',
  ccTh7_2: '통화기능키 레이블',

  checkbox1: '왼쪽',
  checkbox2: '오른쪽',
  checkbox3: '벨소리',
  checkbox4: '알림등',
  checkbox5: '발신',
  checkbox6: '착신',
  checkbox7: '일방통화',
};

const en = {
  modalTitle: '점대점 통화 연결 수정',

  btnCancel: '취소',
  btnSave: '저장',
  btnDelete: '삭제',

  ccTab1: '점대점 통화',
  ccTab2: '회의통화',
  ccTab3: '그룹통화',
  ccTab4: '무선통신기',
  ccTab5: '방송장비',
  ccTab6: '경보',
  ccTab7: 'CCTV',

  ccModal1: '점대점 통화 연결 수정',
  ccModal2: '회의통화 연결 등록',
  ccModal3: '그룹통화 연결 등록',
  ccModal4: '무선통신기 연결 등록',
  ccModal5: '방송장비 연결 등록',
  ccModal6: '경보 연결 등록',
  ccModal7: 'CCTV 연결 등록',
  // 점대점
  ccTh1_1: '피호출 사용자단말',
  ccTh1_2: '통화기능키 레이블',
  ccTh1_3: '통화모드',
  ccTh1_4: '응답모드',
  ccTh1_5: '녹음제어',
  ccTh1_6: '스피커 출력방향',
  ccTh1_7: '호출알림',
  // 회의통화
  ccTh2_1: '회의통화명',
  ccTh2_2: '통화기능키 레이블',
  ccTh2_3: '통화모드',
  ccTh2_4: '호출권한',
  ccTh2_5: '발언권한',
  ccTh2_6: '응답모드',
  ccTh2_7: '녹음제어',
  ccTh2_8: '스피커 출력방향',
  ccTh2_9: '호출알림',
  // 그룹통화
  ccTh3_1: '그룹통화명',
  ccTh3_2: '통화기능키 레이블',
  ccTh3_3: '통화모드',
  ccTh3_4: '호출권한',
  ccTh3_5: '발언권한',
  ccTh3_6: '응답모드',
  ccTh3_7: '녹음설정',
  ccTh3_8: '스피커 출력방향',
  ccTh3_9: '호출알림',
  // 무선통신
  ccTh4_1: '무선통신기명',
  ccTh4_2: '통화기능키 레이블',
  ccTh4_3: '통화모드',
  ccTh4_4: '녹음설정',
  ccTh4_5: '스피커 출력방향',
  // 방송장비
  ccTh5_1: '항목명',
  ccTh5_2: '통화기능키 레이블',
  ccTh5_3: '통화모드',
  // 경보
  ccTh6_1: '경보명',
  ccTh6_2: '통화기능키 레이블',
  // CCTV
  ccTh7_1: 'CCTV구역명',
  ccTh7_2: '통화기능키 레이블',

  checkbox1: '왼쪽',
  checkbox2: '오른쪽',
  checkbox3: '벨소리',
  checkbox4: '알림등',
  checkbox5: '발신',
  checkbox6: '착신',
  checkbox7: '일방통화',
};
const lang = ref({})
const ppButtons = [
  'HLCPTR CONTRC', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM'
];

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modalPointSetting: { show: false, rowIdx: null },
  modalModify1: { show: false },
  modalModify2: { show: false },
  modalModify3: { show: false },
  modalModify4: { show: false },
  modalModify5: { show: false },
  modalModify6: { show: false },
  modalModify7: { show: false },
});
function openModify1() { modals.modalModify1.show = true } // 점대점
function openModify2() { modals.modalModify2.show = true } // 회의통화
function openModify3() { modals.modalModify3.show = true } // 그룹통화
function openModify4() { modals.modalModify4.show = true } // 무선통신기
function openModify5() { modals.modalModify5.show = true } // 방송장비
function openModify6() { modals.modalModify6.show = true } // 경보
function openModify7() { modals.modalModify7.show = true } // CCTV

// =========================
// [상태/폼/리스트 관리]
// =========================
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

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>

<style scoped>
.ui-excel-table .table-type-b {
  min-width: auto;
}
</style>
