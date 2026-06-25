<template>
  <div class="base-wrap">
    <div class="base-wrap-top-box">
      <h3 class="text-14-700">{{ lang.title1 }}</h3>
    </div>
    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">{{ lang.totalLabel }}:15</span>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive @row-clicked="onRowClicked" data-type="clickable">
      </BTable>
    </div>
  </div>

  <UiModal
    v-model="modals.modal1.show"
    :title="lang.modalTitle1"
    type="modal"
    size="md"
    @close-btn-click="modals.modal1.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh1_1 }}</th>
            <td>
               <BFormInput type="text" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_2 }}</th>
            <td>
               <BFormSelect class="ui-select-28 w-60"></BFormSelect>
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_3 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_4 }}</th>
            <td>
               <BFormSelect class="ui-select-28 w-60"></BFormSelect>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modal1.show = false">{{ lang.btn1 }}</BButton>
      <BButton class="blue28">{{ lang.btn2 }}</BButton>
    </template>
  </UiModal>

</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BButton, BFormSelect, BTable, BFormCheckbox } from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  title1: '방송 휴일 관리',
  totalLabel: '전체',

  filter1: '교환기이름',
  filter2: '교환기주소',
  filter3: '기압자정보',

  btn1: '취소',
  btn2: '저장',

  colTh1: 'No',
  colTh2: '휴일명',
  colTh3: '내선번호',
  colTh4: '설명/비고',
  colTh5: '사용여부',

  modalTitle1: '방송 휴일 설정 수정',

  modalTh1_1: '휴일명',
  modalTh1_2: '내선번호',
  modalTh1_3: '설명/비고',
  modalTh1_4: '사용여부',
}

const en = {
  title1: 'Broadcast Holiday Manage',
  totalLabel: 'Total',

  filter1: 'Switch Name',
  filter2: 'Switch Address',
  filter3: 'Operator Info',

  btn1: 'Cancel',
  btn2: 'Save',

  colTh1: 'No',
  colTh2: 'Holiday Name',
  colTh3: 'Extension Number',
  colTh4: 'Description/Remarks',
  colTh5: 'Use Status',

  modalTitle1: 'Edit Broadcast Holiday Settings',

  modalTh1_1: 'Holiday Name',
  modalTh1_2: 'Extension Number',
  modalTh1_3: 'Description/Remarks',
  modalTh1_4: 'Use Status',
}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modal1: { show: false },
  modal2: { show: false },
})

// =========================
// [상태/폼/리스트 관리]
// =========================
const currentPage = ref(1) // 현재 페이지
const perPage = ref(10) // 페이지당 개수

// 샘플 데이터 (JSON 배열)
const items = ref(Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  th1: String(i + 1),
  th2: `휴일${i + 1}`,
  th3: String(2990 + i),
  th4: `설명${i + 1}`,
  th5: i % 2 === 0 ? '사용' : '미사용',
})))
const fields = computed(() => [
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '6rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: 'auto' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: '10rem' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: 'auto' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '12rem' } },
])

// 필터링/페이지네이션
const filteredItems = computed(() => items.value)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

// =========================
// [UI 이벤트 핸들러]
// =========================
function onRowClicked() { modals.modal1.show = true }

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
