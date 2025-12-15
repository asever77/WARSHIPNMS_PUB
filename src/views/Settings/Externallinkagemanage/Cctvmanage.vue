<template>
  <div class="base-wrap">
    <div class="base-wrap-top-box">
      <h3 class="text-14-700">{{ lang.title1 }}</h3>
    </div>
    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">{{ lang.totalLabel }}:15</span>
      </div>
      <div class="search-base--btns">
        <BFormSelect
          id="per-page"
          class="ui-select-28 w-60"
          v-model="perPage"
          :options="perPageOptions"
        ></BFormSelect>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive >
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

        <template #cell(th5)="{ item }">
          <div class="form-switch--wrap">
            <BFormCheckbox
              v-model="item.th5"
              switch
              :inline="true"
              :value="true"
              :unchecked-value="false"
              class="switch-checkbox"
            />
            <span>{{ item.th5 ? 'on' : 'off' }}</span>
          </div>
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

</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
// NOTE: 컴포넌트 이름은 multi-word로 권장됨. 실제 이름 변경 시 파일명, 라우터 등 전체 영향 주의
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormSelect, BButton, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next/components'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  title1:'CCTV 연동정보 관리',
  totalLabel: '전체',

  btn1: '등록',
  btn2: '삭제',

  colSelect: '',
  colTh1: 'No',
  colTh2: '구역명',
  colTh3: 'CCTV URI',
  colTh4: '설명/비고',
  colTh5: '활성여부',

}
const en = {}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================


// =========================
// [상태/폼/리스트 관리]
// =========================
const currentPage = ref(1) // 현재 페이지

const perPageOptions = [
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' }
]
const perPage = ref(perPageOptions[0].value)



// 샘플 데이터 (JSON 배열)
const items = ref([
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 2, th1: '2', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: true },
  { id: 3, th1: '3', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 4, th1: '4', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 2, th1: '2', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: true },
  { id: 3, th1: '3', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 4, th1: '4', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 2, th1: '2', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: true },
  { id: 3, th1: '3', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 4, th1: '4', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 2, th1: '2', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: true },
  { id: 3, th1: '3', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 4, th1: '4', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 2, th1: '2', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: true },
  { id: 3, th1: '3', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
  { id: 4, th1: '4', th2: 'th2 내용', th3: 'th3 내용', th4: 'th3 내용', th5: false },
])
const fields = computed(() => [
  { key: 'select', label: lang.value.colSelect, thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '6rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: '14rem' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: 'auto' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: 'auto' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '12rem' } },
])

// pagination-safe computed
const filteredItems = computed(() => items.value)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

const selectedIds = ref([])

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


// 필터링/페이지네이션 (중복 선언 제거)


// =========================
// [UI 이벤트 핸들러]
// =========================

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
