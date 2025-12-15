<template>
  <div class="base-wrap">
    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">{{ lang.totalLabel }}:15</span>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive>
        <template #cell(th4)="{ item }">
          <div v-if="item.th4 !== null && item.th4 !== undefined" class="form-switch--wrap">
            <BFormCheckbox
              v-model="item.th4"
              switch
              :inline="true"
              :value="true"
              :unchecked-value="false"
              class="switch-checkbox"
            />
            <span class="form-switch--label">{{ item.th4 ? 'on' : 'off' }}</span>
          </div>
          <div v-else>-</div>
        </template>
        <template #cell(th6)="{ item }">
          <div class="form-switch--wrap">
            <BFormCheckbox
              v-model="item.th6"
              switch
              :inline="true"
              :value="true"
              :unchecked-value="false"
              class="switch-checkbox"
            />
            <span>{{ item.th6 ? 'on' : 'off' }}</span>
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
  </div>

</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
// NOTE: 컴포넌트 이름은 multi-word로 권장됨. 실제 이름 변경 시 파일명, 라우터 등 전체 영향 주의
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect, BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'
import { BTab } from 'bootstrap-vue-next'
import UiTabs from '@/components/UiTabs.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  totalLabel: '전체',

  filter1: '검색대상',
  filter2: '검색어',
  filter3: '무선침묵권한',
  filter4: '상태',

  btn1: '자동녹음설정 변경 적용',

  colTh1: 'No',
  colTh2: '유형',
  colTh3: '녹음대상',
  colTh4: '녹음제어 (자동녹음설정)',
  colTh5: '통화상태',
  colTh6: '녹음 개시/중지',

  modalTitle1: '사용자단말 정보 수정',

}
const en = {
  totalLabel: '전체',

  filter1: '검색대상',
  filter2: '검색어',
  filter3: '무선침묵권한',
  filter4: '상태',

  btn1: '자동녹음설정 변경 적용',

  colTh1: 'No',
  colTh2: '유형',
  colTh3: '녹음대상',
  colTh4: '녹음제어 (자동녹음설정)',
  colTh5: '통화상태',
  colTh6: '녹음 개시/중지',

  modalTitle1: '사용자단말 정보 수정',
}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================

// =========================
// [상태/폼/리스트 관리]
// =========================
const currentPage = ref(1) // 현재 페이지
const perPage = ref(10) // 페이지당 개수

// 샘플 데이터 (JSON 배열)
const items = ref([
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: null, th5: '-', th6: false },
  { id: 2, th1: '2', th2: 'th2 내용', th3: 'th3 내용', th4: false, th5: '-', th6: false },
  { id: 3, th1: '3', th2: 'th2 내용', th3: 'th3 내용', th4: true, th5: '-', th6: true },
  { id: 4, th1: '4', th2: 'th2 내용', th3: 'th3 내용', th4: false, th5: 'BUSY', th6: false },
  { id: 5, th1: '5', th2: 'th2 내용', th3: 'th3 내용', th4: null, th5: 'IDLE', th6: true },
  { id: 6, th1: '6', th2: 'th2 내용', th3: 'th3 내용', th4: true, th5: 'BUSY', th6: false },
  { id: 7, th1: '7', th2: 'th2 내용', th3: 'th3 내용', th4: false, th5: 'IDLE', th6: false },
  { id: 8, th1: '8', th2: 'th2 내용', th3: 'th3 내용', th4: null, th5: 'BUSY', th6: true },
  { id: 9, th1: '9', th2: 'th2 내용', th3: 'th3 내용', th4: true, th5: 'BUSY', th6: false },
  { id: 10, th1: '10', th2: 'th2 내용', th3: 'th3 내용', th4: false, th5: 'BUSY', th6: true },
])
const fields = computed(() => [
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '6rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: '14rem' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: 'auto' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: '12rem' } },
  {
    key: 'th5',
    label: lang.value.colTh5,
    thStyle: { width: '9rem' },
    tdClass: (value, key, item) => item.th5 === 'BUSY' ? 'green' : '',
  },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '12rem' } },
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

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
