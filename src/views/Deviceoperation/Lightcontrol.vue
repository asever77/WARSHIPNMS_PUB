<template>
  <div class="base-wrap">
    <div class="search-base">
      <div class="search-base--form">
        <!-- <span class="search-total">{{ lang.totalLabel }}:15</span> -->

        <div class="search-base-desc">{{ lang.filter1 }} : 05:30 ~ 18:30</div>
        <BButton class="blue24 min-w-0" @click="openTimeSetting">{{ lang.btn1 }}</BButton>
      </div>
      <div class="search-base--btns">
        <BFormGroup>
          <div class="ui-search-with-btn">
            <BFormInput id="search-word-2" class="ui-input-28" />
            <button
              type="button"
              class="btn-search-icon"
              aria-label="{{ lang.btnSearch }}"
            ></button>
          </div>
        </BFormGroup>
      </div>
    </div>

    <div class="base-table thead-sticky">
      <BTable :items="items" :fields="fields" bordered hover small responsive>
        <template #head(select)>
          <BFormCheckbox
            :indeterminate="isIndeterminate"
            :model-value="isAllSelected"
            @update:modelValue="toggleSelectAll"
            aria-label="{{ lang.searchSelect }}"
          />
        </template>
        <template #cell(select)="data">
          <BFormCheckbox v-model="selectedIds" :value="data.item.id" />
        </template>
      </BTable>
    </div>
  </div>

  <div class="ui-btn-group">
    <BButton class="navy28" @click="modals.modal2.show = true">{{ lang.btn5 }}</BButton>
    <div class="ml-auto ui-flex" data-gap="8">
      <BButton class="gray28" @click="modals.modal3.show = true">{{ lang.btn6 }}</BButton>
      <BButton class="blue28">{{ lang.btn7 }}</BButton>
    </div>
  </div>

  <UiModal
    v-model="modals.modalTimeSetting.show"
    :title="lang.modalTitle1"
    type="modal"
    size="md"
    @close-btn-click="modals.modalTimeSetting.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 18rem" />
          <col style="width: auto" />
        </colgroup>
        <thead>
          <tr>
            <th>{{ lang.modalTh1_1 }}</th>
            <th>{{ lang.modalTh1_2 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh1_3 }}</th>
            <td>
              <BFormInput v-model="timeValue1" class="ui-input-28" type="time" placeholder="" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalTh1_4 }}</th>
            <td>
              <BFormInput v-model="timeValue2" class="ui-input-28" type="time" placeholder="" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <div class="ui-flex ui-w-full" data-justify-align="between">
        <BButton class="gray28" @click="modals.modalTimeSetting.show = false">
          {{ lang.btn2 }}
        </BButton>
        <div class="ui-flex" data-gap="8">
          <BButton class="blue28">{{ lang.btn8 }}</BButton>
          <BButton class="gray28">{{ lang.btn4 }}</BButton>
        </div>
      </div>
    </template>
  </UiModal>

  <!-- Light off -->
  <UiModal
    v-model="modals.modal3.show"
    :title="lang.modalTitle3"
    type="modal"
    size="md"
    scrollable
    @close-btn-click="modals.modal3.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <div class="ui-flex py-4" data-direction="col" data-gap="20" data-item-align="center">
        <p class="fs-4 ta-c fw-bold">선택한 4개의 장치 광원을 끕니다.</p>
        <p class="fs-5 ta-c">
          계속 진행하시려면 로그인 패스워드를 <br />입력하여 작업을 승인해야 합니다.
        </p>
      </div>
      <table class="table-type-a">
        <colgroup>
          <col style="width: 16rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh3_1 }}</th>
            <td>
              <BFormInput type="password" class="ui-input" placeholder=""></BFormInput>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template #footer>
      <BButton class="gray28" @click="modals.modal3.show = false">{{ lang.btn2 }}</BButton>
      <BButton class="blue28">{{ lang.btn3 }}</BButton>
    </template>
  </UiModal>

  <UiModal
    v-model="modals.modal2.show"
    :title="lang.modalTitle2"
    type="modal"
    size="md"
    @close-btn-click="modals.modal2.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 20rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh2_1 }}</th>
            <td>
              <b>BRDG1 CATS 외 3개</b>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalTh2_2 }}</th>
            <td>
              <BFormSelect class="ui-select"></BFormSelect>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalTh2_3 }}</th>
            <td>
              <BFormSelect class="ui-select"></BFormSelect>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template #footer>
      <BButton class="gray28" @click="modals.modal2.show = false">{{ lang.btn2 }}</BButton>
      <BButton class="blue28">{{ lang.btn3 }}</BButton>
    </template>
  </UiModal>
</template>

<style scoped>
.thead-sticky .table-responsive {
  height: calc(100dvh - 26rem);
}
</style>

<script setup>
// [IMPORTS]
// =========================
// NOTE: 컴포넌트 이름은 multi-word로 권장됨. 실제 이름 변경 시 파일명, 라우터 등 전체 영향 주의
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import {
  BFormInput,
  BFormSelect,
  BButton,
  BFormGroup,
  BPagination,
  BTable,
  BFormCheckbox,
} from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
  searchSelect: '전체 선택/해제',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',

  filter1: '장치광원스케줄링 (주간시간)',

  btn1: '설정',
  btn2: '취소',
  btn3: '적용',
  btn4: '설정안함',
  btn5: '설정변경',
  btn6: 'Light Off',
  btn7: 'Light On',
  btn8: '저장',

  colTh1: 'No',
  colTh2: '장치명',
  colTh3: '장치 유형',
  colTh4: '장치 모델명',
  colTh5: '주간 밝기',
  colTh6: '야간 밝기',
  colTh7: '밝기 레벨 상태',

  modalTitle1: '장치광원 스케줄링 시간 설정',
  modalTitle2: '장치 주간/야간 밝기 설정 일괄변경',
  modalTitle3: 'Light Off',

  modalTh1_1: '(주간시간)',
  modalTh1_2: '시간/분',
  modalTh1_3: '시작시간',
  modalTh1_4: '종료시간',

  modalTh2_1: '장치명',
  modalTh2_2: '주간 밝기 수준',
  modalTh2_3: '야간 밝기 수준',

  modalTh3_1: '로그인 패스워드',
}
const en = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
  searchSelect: '전체 선택/해제',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',

  filter1: '장치광원스케줄링 (주간시간)',

  btn1: '설정',
  btn2: '취소',
  btn3: '적용',
  btn4: '설정안함',
  btn5: '설정변경',
  btn6: 'Light Off',
  btn7: 'Light On',
  btn8: '저장',

  colTh1: 'No',
  colTh2: '장치명',
  colTh3: '장치 유형',
  colTh4: '장치 모델명',
  colTh5: '주간 밝기',
  colTh6: '야간 밝기',
  colTh7: '밝기 레벨 상태',

  modalTitle1: '장치광원 스케줄링 시간 설정',
  modalTitle2: '장치 주간/야간 밝기 설정 일괄변경',
  modalTitle3: 'Light Off',

  modalTh1_1: '(주간시간)',
  modalTh1_2: '시간/분',
  modalTh1_3: '시작시간',
  modalTh1_4: '종료시간',

  modalTh2_1: '장치명',
  modalTh2_2: '주간 밝기 수준',
  modalTh2_3: '야간 밝기 수준',

  modalTh3_1: '로그인 패스워드',
}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modalTimeSetting: { show: false },
  modal1: { show: false },
  modal2: { show: false },
  modal3: { show: false },
})

// =========================
// [상태/폼/리스트 관리]
// =========================
const selectedIds = ref([]) // 선택된 행 id
const currentPage = ref(1) // 현재 페이지
const perPage = ref(10) // 페이지당 개수

// 실제 데이터 연동 시 아래 부분을 교체하세요
// 임시 샘플 데이터 생성 함수
function generateItems(n) {
  const arr = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      id: i,
      th1: String(i),
      th2: 'th2 내용',
      th3: 'th3 내용',
      th4: 'th4 내용',
      th5: '100',
      th6: '30',
      th7: '20',
    })
  }
  return arr
}
const items = ref(generateItems(40)) // 임시 데이터 40개
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, sortable: true, thStyle: { width: 'auto' } },
  { key: 'th3', label: lang.value.colTh3, sortable: true, thStyle: { width: 'auto' } },
  { key: 'th4', label: lang.value.colTh4, sortable: true, thStyle: { width: '14rem' } },
  { key: 'th5', label: lang.value.colTh5, sortable: true, thStyle: { width: '14rem' } },
  { key: 'th6', label: lang.value.colTh6, sortable: true, thStyle: { width: '14rem' } },
  { key: 'th7', label: lang.value.colTh7, sortable: true, thStyle: { width: '14rem' } },
])

// 필터링/페이지네이션
const filteredItems = computed(() => items.value)

// 체크박스 전체선택/부분선택 (전체 필터 결과 기준)
const isAllSelected = computed(() => {
  const allIds = filteredItems.value.map(i => i.id)
  if (allIds.length === 0) return false
  return allIds.every(id => selectedIds.value.includes(id))
})
const isIndeterminate = computed(() => {
  const allIds = filteredItems.value.map(i => i.id)
  if (allIds.length === 0) return false
  const selectedCount = allIds.filter(id => selectedIds.value.includes(id)).length
  return selectedCount > 0 && selectedCount < allIds.length
})
function toggleSelectAll(checked) {
  const allIds = filteredItems.value.map(i => i.id)
  if (checked) {
    const set = new Set([...selectedIds.value, ...allIds])
    selectedIds.value = Array.from(set)
  } else {
    selectedIds.value = selectedIds.value.filter(id => !allIds.includes(id))
  }
}

// =========================
// [UI 이벤트 핸들러]
// =========================

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = G.lang === 'ko' ? ko : en
})
function openTimeSetting() {
  modals.modalTimeSetting.show = true
}
</script>
