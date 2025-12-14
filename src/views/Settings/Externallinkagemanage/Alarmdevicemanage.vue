<template>
  <h2 class="mb-4 fw-bold h3">경보장치 연동 정보</h2>
   <table class="table-type-a">
    <colgroup>
      <col style="width: 16rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">{{ lang.filter1 }}</th>
        <td>
          <BFormSelect class="ui-select"></BFormSelect>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.filter2 }}</th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.filter3 }}</th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.filter4 }}</th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>

    </tbody>
  </table>

  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
  </div>

  <div class="base-wrap mt-20">
    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">{{ lang.totalLabel }}:15</span>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive >
        <template #cell(th4)="{ item }">
          <div class="form-switch--wrap">
            <BFormCheckbox
              v-model="item.th4"
              switch
              :inline="true"
              :value="true"
              :unchecked-value="false"
              class="switch-checkbox"
            />
            <span>{{ item.th4 ? 'on' : 'off' }}</span>
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
    <BButton class="blue28">{{ lang.btn2 }}</BButton>
  </div>

</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
// NOTE: 컴포넌트 이름은 multi-word로 권장됨. 실제 이름 변경 시 파일명, 라우터 등 전체 영향 주의
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BButton, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next/components'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  totalLabel: '전체',

  filter1: '연동유형',
  filter2: 'IP Address',
  filter3: 'Port',
  filter4: '연동 Parameter',

  btn1: '연동정보 적용',
  btn2: '사용여부 변경 적용',
  btn3: '삭제',

  colSelect: '',
  colTh1: 'No',
  colTh2: '항목명',
  colTh3: '경보코드',
  colTh4: '사용여부',
  colTh5: '등급',
  colTh6: '설명',
  colTh7: '비고',
  colTh8: '등록일',
  colTh9: '스위치',
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
const perPage = ref(10) // 페이지당 개수


// 샘플 데이터 (JSON 배열)
const items = ref([
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: false, th5: '1',  th6: 'th6 내용'},
  { id: 2, th1: '2', th2: 'th2 내용', th3: 'th3 내용', th4: true, th5: '1',  th6: 'th6 내용'},
  { id: 3, th1: '3', th2: 'th2 내용', th3: 'th3 내용', th4: false, th5: '1',  th6: 'th6 내용'},
  { id: 4, th1: '4', th2: 'th2 내용', th3: 'th3 내용', th4: false, th5: '1',  th6: 'th6 내용'},
])
const fields = computed(() => [
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '6rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: 'auto' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: '12rem' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: '12rem' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '8rem' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: 'auto' } },
])

// pagination-safe computed
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
