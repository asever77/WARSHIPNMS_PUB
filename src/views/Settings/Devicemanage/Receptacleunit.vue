<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 16rem" />
      <col style="width: auto" />
      <col style="width: 16rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter1 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="none" aria-label="{{ lang.filter1 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormInput id="search-word" class="ui-input" placeholder=""></BFormInput>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter2 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter2 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            :options="[
              {value: '1', text: '선택',}
            ]"
          ></BFormSelect>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter3 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter3 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormInput id="search-word" class="ui-input" placeholder=""></BFormInput>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter4 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter4 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="selectOptions"
          ></BFormSelect>
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
        <span class="search-total">{{ lang.totalLabel }}:15</span>
        <span class="search-total">Online:36</span>
        <span class="search-total">Offline:177</span>
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
            <button type="button" class="btn-search-icon" aria-label="{{ lang.btnSearch }}" @click="onFilter" ></button>
          </div>
        </BFormGroup>
        <BFormSelect
          id="search-target"
          class="ui-select-28"
          v-model="searchType"
          :options="searchTypeOptions"
        ></BFormSelect>
        <BFormSelect
          id="per-page"
          class="ui-select-28 w-60"
          v-model="perPage"
          :options="perPageOptions"
        ></BFormSelect>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive>
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
    <BButton class="blue28" @click="modals.modalRegister.show = true">{{ lang.btnRegister }}</BButton>
    <BButton class="blue28">{{ lang.btnBulkRegister }}</BButton>
    <BButton class="gray28">{{ lang.btnDelete }}</BButton>
  </div>

  <UiModal
    v-model="modals.modalRegister.show"
    :title="lang.modalRegisterTitle || '리셉터클유닛 등록'"
    type="modal"
    size="lg"
    @close-btn-click="modals.modalRegister.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalth1 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
            <th scope="row">{{ lang.modalth2 }}</th>
            <td>
              <BFormInput type="number" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth3 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row">{{ lang.modalth4 }}</th>
            <td>
              <BFormInput type="tel" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth5 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth6 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth7 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row" rowspan="2">{{ lang.modalth8 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
            <th scope="row"></th>
            <td></td>
          </tr>

          <tr>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth9 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ { value: '1', text: '선택' }, ]" />
            </td>
            <th scope="row"></th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalRegister.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>
</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
// NOTE: 컴포넌트 이름은 multi-word로 권장됨. 실제 이름 변경 시 파일명, 라우터 등 전체 영향 주의
import { ref, onMounted, computed, watch, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'
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

  filter1: '장치명',
  filter2: '모델명',
  filter3: '위치(구역)',
  filter4: '상태',

  btnRegister: '등록',
  btnBulkRegister: '일괄등록',
  btnDelete: '삭제',
  btnCancel: '취소',
  btnSave: '저장',
  btnAdd: '추가',

  colSelect: '선택',
  colTh1: 'No',
  colTh2: '위치(구역)',
  colTh3: '장치명',
  colTh4: '무선침묵',
  colTh5: '경보권한',
  colTh6: '방송권한',
  colTh7: 'Mute권한',
  colTh8: '내선번호',
  colTh9: '상태',
  colTh10: 'IP Address',
  colTh11: 'L2 스위치',
  colTh12: 'Serial No',

  modalTitle1: '리셉터클유닛 등록',

  modalth1: '모델명',
  modalth2: '헤드셋 볼륨',
  modalth3: '장치명',
  modalth4: '자동연결 대기시간(초)',
  modalth5: '설명/비고',
  modalth6: '시리얼 번호',
  modalth7: '가입자정보 (내선번호)',
  modalth8: '위치',
  modalth9: 'L2 스위치',

}
const en = {}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modalRegister: { show: false },
})

// =========================
// [상태/폼/리스트 관리]
// =========================
const filterText = ref('') // 검색어
const selectedIds = ref([]) // 선택된 행 id
const currentPage = ref(1) // 현재 페이지
const perPage = ref(10) // 페이지당 개수
const perPageOptions = [ { value: 10, text: '10' }, { value: 15, text: '15' }, { value: 20, text: '20' } ]

// 실제 데이터 연동 시 아래 부분을 교체하세요
// 임시 샘플 데이터 생성 함수
function generateItems(n) {
  const statuses = ['정상', '정상(통화중)', '비정상']
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = (i - 1)
    arr.push({
      id: i,
      th1: String(i),
      th2: '위치내용',
      th3: '장치명내용',
      th4: 'O',
      th5: 'O',
      th6: 'O',
      th7: 'O',
      th8: '3000',
      th9: statuses[idx % statuses.length],
      th10: '192.168.1.4',
    })
  }
  return arr
}
const items = ref(generateItems(40)) // 임시 데이터 40개
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: 'auto' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: 'auto' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: 'auto' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '12rem' } },
  { key: 'th8', label: lang.value.colTh8, thStyle: { width: '6rem' } },
  {
    key: 'th9',
    label: lang.value.colTh9,
    thStyle: { width: '9rem' },
    tdClass: (value, key, item) => item.status === '비정상' ? 'red' : '',
  },
  { key: 'th10', label: lang.value.colTh10, thStyle: { width: '12rem' } },
]);

// 필터링/페이지네이션
const filteredItems = computed(() => items.value)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

// 체크박스 전체선택/부분선택
const isAllSelected = computed(() => {
  const pageIds = paginatedItems.value.map(i => i.id)
  if (pageIds.length === 0) return false
  return pageIds.every(id => selectedIds.value.includes(id))
})
const isIndeterminate = computed(() => {
  const pageIds = paginatedItems.value.map(i => i.id)
  if (pageIds.length === 0) return false
  const selectedOnPage = pageIds.filter(id => selectedIds.value.includes(id)).length
  return selectedOnPage > 0 && selectedOnPage < pageIds.length
})
function toggleSelectAll(checked) {
  const pageIds = paginatedItems.value.map(i => i.id)
  if (checked) {
    const set = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(set)
  } else {
    selectedIds.value = selectedIds.value.filter(id => !pageIds.includes(id))
  }
}

// =========================
// [UI 이벤트 핸들러]
// =========================
function onRowClicked() { modals.modalTerminalModify.show = true }
function onFilter() { currentPage.value = 1 }

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
