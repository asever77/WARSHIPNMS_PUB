<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 10rem" />
      <col style="width: 16.5rem" />
      <col style="width: 10rem" />
      <col style="width: 16.5rem" />
      <col style="width: 10rem" />
      <col style="width: auto" />
      <col style="width: 10rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          알림코드
          <BButton class="btn-sort" aria-sort="none" :aria-label="`${lang.filterDeviceType} ${lang.sortAll}`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            v-model="deviceType"
            :options="deviceTypeOptions"
          ></BFormSelect>
        </td>

        <th scope="row">
          알림명
          <BButton class="btn-sort" aria-sort="descending" :aria-label="`${lang.filterSearchTarget} ${lang.sortAll}`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="searchTargetOptions"
          ></BFormSelect>
        </td>

        <th scope="row">
          발생위치
          <BButton class="btn-sort" aria-sort="descending" :aria-label="`${lang.filterSearchTarget} ${lang.sortAll}`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="searchTargetOptions"
          ></BFormSelect>
        </td>

        <th scope="row">
          심각도
          <BButton class="btn-sort" aria-sort="descending" :aria-label="`${lang.filterSearchTarget} ${lang.sortAll}`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="searchTargetOptions"
          ></BFormSelect>
        </td>
      </tr>
      <tr>
        <th scope="row">
          발생일시
          <BButton class="btn-sort" aria-sort="ascending" :aria-label="`${lang.filterRegDate} ${lang.sortAll}`"></BButton>
        </th>
        <td colspan="7">
          <div class="ui-flex" data-item-align="center" data-gap="4" style="width: 40rem;">
            <BFormInput
              id="reg-date-start"
              class="ui-input"
              v-model="regDateStart"
              placeholder=""
              type="datetime-local"
            ></BFormInput>
            ~
            <BFormInput
              id="reg-date-end"
              class="ui-input"
              v-model="regDateEnd"
              placeholder=""
              type="datetime-local"
            ></BFormInput>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="ui-btn-group">
    <BButton class="blue28">조회</BButton>
  </div>

  <div class="base-wrap mt-20">
    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">전체:15</span>
      </div>
      <div class="search-base--btns">
        <!-- 검색어 입력 -->
        <BFormSelect
          id="search-target"
          class="ui-select"
          v-model="searchTarget"
          :options="searchTargetOptions"
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
    <BButton class="blue28">인지처리</BButton>
    <BButton class="gray28">삭제</BButton>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'

const lang = ref({})

// 폼 상태
const regDateStart = ref('')
const regDateEnd = ref('')

// 셀렉트 상태
const deviceType = ref(null)
const searchTarget = ref(null)

// 장치 유형 옵션
const deviceTypeOptions = computed(() => [
  { value: null, text: lang.value.optionSelect ?? '' },
  { value: '라우터', text: '라우터' },
  { value: '스위치', text: '스위치' },
  { value: '무전기', text: '무전기' },
  { value: '중계기', text: '중계기' },
])

// 검색 대상 옵션
const searchTargetOptions = computed(() => [
  { value: null, text: lang.value.optionSelect ?? '' },
  { value: '위치', text: '위치' },
  { value: '장치명', text: '장치명' },
  { value: '시리얼번호', text: '시리얼번호' },
])

// 페이지당 개수 옵션
const perPageOptions = [
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' },
]

// 장치 목록 샘플 데이터 40개 생성 (테스트용)
const items = ref(generateItems(40))

function generateItems(n) {
  const severitys = ['CRITICAL', 'MINOR', 'MAJOR'] //심각도
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = (i - 1)
    const day = String((idx % 28) + 1).padStart(2, '0')
    const hour = String((idx % 24)).padStart(2, '0')
    const minute = String((idx % 60)).padStart(2, '0')
    arr.push({
      id: i,
      alarmCode: String(n - i + 1),
      alarmName: `알람명 텍스트`,
      location: `발생위치 텍스트`,
      severity: severitys[idx % severitys.length],
      category: `구분 텍스트`,
      detail: `상세 정보 텍스트`,
      eventTime: `2025-11-${day} ${hour}:${minute}`,
      recognition: `2025-11-${day} ${hour}:${minute} / 김담당`,
    })
  }
  return arr
}

const selectedIds = ref([]);

// 테이블 필드: 선택,순번,장치유형,모델,장치명,등급,위치,등록일
// 정렬 추가: 장치유형,모델,장치명,등급,위치,등록일

const fields = computed(() => [
  { key: 'select', label: lang.value.colSelect, thStyle: { width: '4rem' } },
  { key: 'alarmCode', label: '알람코드', thStyle: { width: '8rem' } },
  { key: 'alarmName', label: '알람명', thStyle: { width: '12rem' } },
  { key: 'location', label: '발생위치', thStyle: { width: '12rem' } },
  { key: 'severity', label: '심각도', thStyle: { width: '10rem' }, tdClass: (value) => {
    if (value === 'CRITICAL') return 'critical';
    if (value === 'MINOR') return 'minor';
    if (value === 'MAJOR') return 'major';
    return '';
  }},
  { key: 'category', label: '구분', thStyle: { width: '10rem' } },
  { key: 'detail', label: '상세정보', thStyle: { width: 'auto' } },
  { key: 'eventTime', label: '발생일시', thStyle: { width: '13rem' } },
  { key: 'recognition', label: '인지 정보', thStyle: { width: '18rem' } },
]);

const filteredItems = computed(() => {
  // 현재는 전체 items 반환 (필터 기능 미사용)
  return items.value
})

const currentPage = ref(1)
const perPage = ref(10)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

// 페이지당 개수 변경 시 첫 페이지로 이동
watch(perPage, () => {
  currentPage.value = 1
})

// 헤더 체크박스 상태 (현재 페이지 기준)
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
    // 현재 페이지의 모든 행 선택(중복 제거)
    const set = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(set)
  } else {
    // 현재 페이지의 모든 행 선택 해제
    selectedIds.value = selectedIds.value.filter(id => !pageIds.includes(id))
  }
}
</script>

<style scoped>
.table-type-a {
  width: 100%;
  border-collapse: collapse;
}

.table-type-a th,
.table-type-a td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #dee2e6;
}

.table-type-a th {
  background-color: #f8f9fa;
  font-weight: 500;
}

.table-type-a .btn-sort {
  background: none;
  border: none;
  padding: 0;
  margin-left: 0.25rem;
  cursor: pointer;
}

.table-type-a .btn-sort[aria-sort='ascending']::after {
  content: '▲';
  font-size: 0.75rem;
  margin-left: 0.25rem;
}

.table-type-a .btn-sort[aria-sort='descending']::after {
  content: '▼';
  font-size: 0.75rem;
  margin-left: 0.25rem;
}

.ui-btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.base-wrap {
  margin-top: 1.25rem;
}

.search-base {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.search-base--form {
  flex-grow: 1;
}

.search-base--btns {
  display: flex;
  gap: 0.5rem;
}

.ui-flex {
  display: flex;
  align-items: center;
}

.ui-flex[data-item-align='center'] {
  justify-content: center;
}

.ui-select {
  width: 100%;
}

.ui-select-28 {
  width: 28%;
}

.ui-input {
  width: 100%;
}

.mt-20 {
  margin-top: 5rem;
}

.mb-20 {
  margin-bottom: 5rem;
}

.w-60 {
  width: 60%;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.gap-4 {
  gap: 1rem;
}

.blue28 {
  background-color: #007bff;
  color: #fff;
}

.gray28 {
  background-color: #6c757d;
  color: #fff;
}

.btn-labeling {
  background-color: #28a745;
  color: #fff;
}

.btn-labeling:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
  color: #fff;
}

.btn-delete:hover {
  background-color: #c82333;
}

.base-table:deep(td.critical) {
  background-color: #f22d2d !important;
  color: #fff !important;
}
.base-table:deep(td.minor) {
  background-color: #efb43c !important;
  color: #222 !important;
}
.base-table:deep(td.major) {
  background-color: #4BC43D !important;
  color: #fff !important;
}
</style>
