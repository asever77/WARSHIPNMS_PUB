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
          <BFormSelect class="ui-select" :options="[ {value: '1', text: '선택',} ]" ></BFormSelect>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter2 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter2 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormInput id="search-word" class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter3 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter3 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td colspan="3">
          <div
            class="ui-flex ui-data-box"
            data-item-align="center"
            data-gap="4"
          >
            <BFormInput
              id="reg-date-start"
              class="ui-input"
              placeholder=""
              type="datetime-local"
            ></BFormInput>
            ~
            <BFormInput
              id="reg-date-end"
              class="ui-input"
              placeholder=""
              type="datetime-local"
            ></BFormInput>
          </div>
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
      </div>
      <div class="search-base--btns">
        <BFormGroup>
          <div class="ui-search-with-btn">
            <BFormInput class="ui-input-28" />
            <button type="button" class="btn-search-icon" aria-label="검색" @click="onFilter" />
          </div>
        </BFormGroup>
        <BFormSelect class="ui-select-28"></BFormSelect>
        <BFormSelect
          id="per-page"
          class="ui-select-28 w-60"
          v-model="perPage"
          :options="perPageOptions"
        ></BFormSelect>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive @row-clicked="onRowClicked" data-type="clickable">
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

  <UiModal
    v-model="modals.modal1.show"
    :title="lang.modalTitle1"
    type="modal"
    size="xlg"
    scrollable
    @close-btn-click="modals.modal1.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
          <col style="width: 14rem" />
          <col style="width: auto" />
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh3_1 }}</th>
            <td>재시작</td>
            <th scope="row">{{ lang.modalTh3_2 }}</th>
            <td>1015-12-12 11:22:00</td>
            <th scope="row">{{ lang.modalTh3_3 }}</th>
            <td>1015-12-12 11:22:00</td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh3_4 }}</th>
            <td>김담당(trudsfj1)</td>
            <th scope="row">{{ lang.modalTh3_5 }}</th>
            <td>10</td>
            <th scope="row">{{ lang.modalTh3_6 }}</th>
            <td>실패</td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh3_7 }}</th>
            <td color="5">성공(8), 실패(1), 타임아웃(1)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 추가 테이블 -->
    <div class="base-table mt-4">
      <BTable :items="extraItems" :fields="extraFields" bordered hover small responsive>
      </BTable>
    </div>

    <template #footer>
      <BButton class="gray28" @click="modals.modal1.show = false">{{ lang.btn2 }}</BButton>
    </template>
  </UiModal>

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

  filter1: '작업유형',
  filter2: '요청자',
  filter3: '요청일시',

  btn1: '등록',
  btn2: '닫기',
  btn3: '삭제',
  btn4: '취소',
  btn5: '저장',
  btn6: '추가',
  btn7: '통화기능키 설정 ',

  colTh1: 'No',
  colTh2: '작업유형',
  colTh3: '요청자(아이디)',
  colTh4: '요청일시',
  colTh5: '종료일시',
  colTh6: '제어장치 개수',
  colTh7: '결과',
  colTh8: '부가정보',

  modalTitle1: '수행이력 상세 조회',

  modalTh1_1: '장치유형',
  modalTh1_2: '장치 모델명',
  modalTh1_3: '펌웨어 버전',
  modalTh1_4: '펌웨어 파일',
  modalTh1_5: '설명/비고',

  modalTh3_1: '작업유형',
  modalTh3_2: '요청일시',
  modalTh3_3: '종료일시',
  modalTh3_4: '요청자(아이디)',
  modalTh3_5: '제어장치 개수',
  modalTh3_6: '결과',
  modalTh3_7: '부가정보',

  modalTh4_1: 'No',
  modalTh4_2: '장치명',
  modalTh4_3: '장치유형',
  modalTh4_4: '장치 모델명',
  modalTh4_5: '응답결과',
  modalTh4_6: '응답일시',
  modalTh4_7: '부가정보',


}
const en = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
  searchSelect: '전체 선택/해제',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',

  filter1: '작업유형',
  filter2: '요청자',
  filter3: '요청일시',

  btn1: '등록',
  btn2: '닫기',
  btn3: '삭제',
  btn4: '취소',
  btn5: '저장',
  btn6: '추가',
  btn7: '통화기능키 설정 ',

  colTh1: 'No',
  colTh2: '작업유형',
  colTh3: '요청자(아이디)',
  colTh4: '요청일시',
  colTh5: '종료일시',
  colTh6: '제어장치 개수',
  colTh7: '결과',
  colTh8: '부가정보',

  modalTitle1: '수행이력 상세 조회',

  modalTh1_1: '장치유형',
  modalTh1_2: '장치 모델명',
  modalTh1_3: '펌웨어 버전',
  modalTh1_4: '펌웨어 파일',
  modalTh1_5: '설명/비고',

  modalTh3_1: '작업유형',
  modalTh3_2: '요청일시',
  modalTh3_3: '종료일시',
  modalTh3_4: '요청자(아이디)',
  modalTh3_5: '제어장치 개수',
  modalTh3_6: '결과',
  modalTh3_7: '부가정보',

  modalTh4_1: 'No',
  modalTh4_2: '장치명',
  modalTh4_3: '장치유형',
  modalTh4_4: '장치 모델명',
  modalTh4_5: '응답결과',
  modalTh4_6: '응답일시',
  modalTh4_7: '부가정보',
}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modal1: { show: false },
})

// =========================
// [상태/폼/리스트 관리]
// =========================
const currentPage = ref(1) // 현재 페이지
const perPage = ref(10) // 페이지당 개수
const perPageOptions = [ { value: 10, text: '10' }, { value: 15, text: '15' }, { value: 20, text: '20' } ]

// 실제 데이터 연동 시 아래 부분을 교체하세요
// 임시 샘플 데이터 생성 함수
function generateItems(n) {
  const arr = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      id: i,
      th1: String(i),
      th2: `th2 내용`, // 다운로드 URL
      th3: 'th3 내용',
      th4: '2025.12.12 11:22:00',
      th5: '2025.12.12 11:22:00',
      th6: '12',
      th7: '성공',
      th8: 'th8 내용',
    })
  }
  return arr
}
const items = ref(generateItems(40)) // 임시 데이터 40개
const fields = computed(() => [
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, sortable: true, thStyle: { width: '17rem' } },
  { key: 'th3', label: lang.value.colTh3, sortable: true, thStyle: { width: '17rem' } },
  { key: 'th4', label: lang.value.colTh4, sortable: true, thStyle: { width: '14rem' } },
  { key: 'th5', label: lang.value.colTh5, sortable: true, thStyle: { width: '14rem' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '8rem' } },
  { key: 'th7', label: lang.value.colTh7, sortable: true, thStyle: { width: '7rem' } },
  { key: 'th8', label: lang.value.colTh8, thStyle: { width: 'auto' } },
])

// =========================
// [추가 테이블 상태 관리]
// =========================
function generateExtraItems(n) {
  const arr = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      id: i,
      th1: String(i),
      th2: 'th2 내용',
      th3: 'th3 내용',
      th4: 'th4 내용',
      th5: '성공',
      th6: '2025.12.12 11:22:00',
      th7: 'Error Message if exist',
    })
  }
  return arr
}
const extraItems = ref(generateExtraItems(15))
const extraFields = computed(() => {
  return [
    { key: 'th1', label: 'No', thStyle: { width: '5rem' } },
    { key: 'th2', label: '장치명', thStyle: { width: 'auto' } },
    { key: 'th3', label: '장치유형', thStyle: { width: 'auto' } },
    { key: 'th4', label: '장치 모델명', thStyle: { width: 'auto' } },
    { key: 'th5', label: '장치유형', thStyle: { width: '8rem' } },
    { key: 'th6', label: '응답결과', thStyle: { width: '14rem' } },
    { key: 'th7', label: '부가정보', thStyle: { width: 'auto' } },
  ];
});

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
