<template>
  <div class="base-wrap">
    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">{{ lang.totalLabel }}:15</span>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive @row-clicked="onRowClicked" data-type="clickable">
        <template #cell(th4)="{ item }">
          <BFormCheckbox
            v-model="item.th4"
            switch
            :inline="true"
            :value="true"
            :unchecked-value="false"
            class="switch-checkbox"
          >
            <template #label>
              <span>{{ item.th4 ? 'on' : 'off' }}</span>
            </template>
          </BFormCheckbox>
        </template>
        <template #cell(th6)="{ item }">
          <BFormCheckbox
            v-model="item.th6"
            switch
            :inline="true"
            :value="true"
            :unchecked-value="false"
            class="switch-checkbox"
          >
            <template #label>
              <span>{{ item.th6 ? 'on' : 'off' }}</span>
            </template>
          </BFormCheckbox>
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
const en = {}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================

// =========================
// [상태/폼/리스트 관리]
// =========================
const filterText = ref('') // 검색어
const selectedIds = ref([]) // 선택된 행 id
const currentPage = ref(1) // 현재 페이지
const perPage = ref(10) // 페이지당 개수
const perPageOptions = [ { value: 10, text: '10' }, { value: 15, text: '15' }, { value: 20, text: '20' } ]

// 실제 데이터 연동 시 아래 부분을 교체하세요
// 임시 샘플 데이터 생성 함수 (th4, th6은 체크박스용 boolean)
function generateItems(n) {
  const statuses = ['IDLE', 'BUSY']
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = (i - 1)
    arr.push({
      id: i,
      th1: String(i),
      th2: 'th2 내용',
      th3: 'th3 내용',
      th4: false,
      th5: statuses[idx % statuses.length],
      th6: false,
    })
  }
  return arr
}
const items = ref(generateItems(40)) // 임시 데이터 40개
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
