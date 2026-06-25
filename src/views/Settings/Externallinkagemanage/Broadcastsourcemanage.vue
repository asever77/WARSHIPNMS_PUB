<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 8rem" />
      <col style="width: 14rem" />
      <col style="width: 8rem" />
      <col style="width: auto" />
       <col style="width: 8rem" />
      <col style="width: auto" />
       <col style="width: 8rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
    <tr>
      <th scope="row">{{ lang.filter1 }}</th>
      <td>
        <BFormInput class="ui-input" placeholder=""></BFormInput>
      </td>
      <th scope="row">{{ lang.filter2 }}</th>
      <td>
        <BFormInput class="ui-input" placeholder=""></BFormInput>
      </td>

      <th scope="row">{{ lang.filter3 }}</th>
      <td>
        <BFormInput class="ui-input" placeholder=""></BFormInput>
      </td>
      <th scope="row">{{ lang.filter4 }}</th>
      <td>
        <BFormInput class="ui-input" placeholder=""></BFormInput>
      </td>
    </tr>

    </tbody>
  </table>

  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btnSearch }}</BButton>
  </div>

  <div class="base-wrap mt-20">

    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">{{ lang.totalLabel }}: {{ filteredItems.length }}</span>
      </div>
      <div class="search-base--btns">
        <!-- 검색어 입력 -->
        <BFormGroup>
          <div class="ui-search-with-btn">
            <BFormInput
              id="search-word-2"
              v-model="filterText"
              :placeholder="lang.searchPlaceholder"
              class="ui-input-28"
            />
            <button
              type="button"
              class="btn-search-icon"
              aria-label="검색"
              @click="onFilter"
            ></button>
          </div>
        </BFormGroup>
        <BFormSelect
          id="per-page"
          class="ui-select-28 w-60"
          v-model="perPage"
          :options="perPageOptions"
        ></BFormSelect>
      </div>
    </div>
    <div class="base-table">
      <BTable
        :items="paginatedItems"
        :fields="fields"
        bordered
        hover
        small
        responsive
        @row-clicked="onRowClicked"
        data-type="clickable"
      >
        <template #head(select)>
          <BFormCheckbox
            :indeterminate="isIndeterminate"
            :model-value="isAllSelected"
            @update:modelValue="toggleSelectAll"
            aria-label="전체 선택/해제"
          />
        </template>
        <template #cell(select)="data">
          <BFormCheckbox v-model="selectedIds" :value="data.item.id" />
        </template>
      </BTable>

      <div class="d-flex justify-content-center mt-4">
        <BPagination
          v-model="currentPage"
          :total-rows="filteredItems.length"
          :per-page="perPage"
          aria-controls="manual-table"
        />
      </div>
    </div>
  </div>
  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
    <BButton class="gray28">{{ lang.btn2 }}</BButton>
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
  title1: '방송 음원 관리',
  totalLabel: '전체',

  filter1: '이름',
  filter2: '유형',
  filter3: '방송내용',
  filter4: '스케쥴',

  btnSearch: '조회',
  btn1: '등록',
  btn2: '삭제',

  colTh1: 'No',
  colTh2: '이름',
  colTh3: '유형',
  colTh4: '방송내용',
  colTh5: '적용기간',
  colTh6: '스케쥴',

  modalTitle1: '방송 음원 설정 수정',
  modalTh1_1: '음원명',
  modalTh1_2: '내선번호',
  modalTh1_3: '설명/비고',
  modalTh1_4: '사용여부',

  searchPlaceholder: '검색어 입력',
  searchSelect: '전체 선택/해제',
}

const en = {
  title1: 'Broadcast Source Manage',
  totalLabel: 'Total',

  filter1: 'Name',
  filter2: 'Type',
  filter3: 'Broadcast Content',
  filter4: 'Schedule',

  btnSearch: 'Search',
  btn1: 'Register',
  btn2: 'Delete',

  colTh1: 'No',
  colTh2: 'Name',
  colTh3: 'Type',
  colTh4: 'Broadcast Content',
  colTh5: 'Period',
  colTh6: 'Schedule',

  modalTitle1: 'Edit Broadcast Source Settings',
  modalTh1_1: 'Source Name',
  modalTh1_2: 'Extension Number',
  modalTh1_3: 'Description/Remarks',
  modalTh1_4: 'Use Status',

  searchPlaceholder: 'Enter search term',
  searchSelect: 'Select/Deselect All',
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
const selectedIds = ref([]) // 선택된 행 id
const filterText = ref('') // 검색어
const perPageOptions = [
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' },
]
// 샘플 데이터 (JSON 배열)
const items = ref(Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  th1: String(i + 1),
  th2: `총기상15분전`,
  th3: '정박중',
  th4: `설명${i + 1}`,
  th5: '2026-01-01~2026-01-01',
  th6: '평일 총기상 오전6시30분 ',
})))
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: '10rem' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: '8rem' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: 'auto' }, tdClass: 'text-ellipsis' },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '18rem' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '18rem' }, tdClass: 'text-ellipsis' },
])

// 필터링/페이지네이션
const filteredItems = computed(() => {
  if (!filterText.value) return items.value
  const query = filterText.value.toLowerCase().trim()
  return items.value.filter((item) => {
    return (
      (item.th2 && item.th2.toLowerCase().includes(query)) ||
      (item.th3 && item.th3.toLowerCase().includes(query)) ||
      (item.th4 && item.th4.toLowerCase().includes(query)) ||
      (item.th5 && item.th5.toLowerCase().includes(query)) ||
      (item.th6 && item.th6.toLowerCase().includes(query))
    )
  })
})
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

// 체크박스 전체선택/부분선택
const isAllSelected = computed(() => {
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (pageIds.length === 0) return false
  return pageIds.every((id) => selectedIds.value.includes(id))
})
const isIndeterminate = computed(() => {
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (pageIds.length === 0) return false
  const selectedOnPage = pageIds.filter((id) => selectedIds.value.includes(id)).length
  return selectedOnPage > 0 && selectedOnPage < pageIds.length
})
function toggleSelectAll(checked) {
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (checked) {
    const set = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(set)
  } else {
    selectedIds.value = selectedIds.value.filter((id) => !pageIds.includes(id))
  }
}

// =========================
// [UI 이벤트 핸들러]
// =========================
function onRowClicked() { modals.modal1.show = true }
function onFilter() {
  currentPage.value = 1
}

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
