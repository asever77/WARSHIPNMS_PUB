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
          <BFormSelect
            id="device-type"
            class="ui-select"
            :options="[
              {value: '1', text: '선택',}
            ]"
          ></BFormSelect>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter2 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter2 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
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
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter4 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter4 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter5 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter5 }} {{ lang.sortAll }}"></BButton>
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
        <!-- th2 컬럼을 다운로드 링크로 렌더링 -->
        <template #cell(th2)="data">
          <a :href="data.item.downloadUrl" download target="_blank" rel="noopener" style="color: #007bff; text-decoration: underline;">{{ data.item.th2 }}</a>
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
    <BButton class="blue28" @click="modals.modal1.show = true">{{ lang.btn1 }}</BButton>
    <BButton class="gray28">{{ lang.btn3 }}</BButton>
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
              <BFormSelect class="ui-select" :options="[ {value: '1', text: '선택',} ]" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_2 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ {value: '1', text: '선택',} ]" />
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
              <BFormInput type="file" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_5 }}</th>
            <td>
             <BFormTextarea rows="3" class="ui-input" />
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modal1.show = false">{{ lang.btn4 }}</BButton>
      <BButton class="blue28">{{ lang.btn5 }}</BButton>
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
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh2_1 }}</th>
            <td>
              <b>펌웨어 파일명</b>
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh2_2 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ {value: '1', text: '선택',} ]" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh2_3 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ {value: '1', text: '선택',} ]" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh2_4 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh2_5 }}</th>
            <td>
             <BFormTextarea rows="3" class="ui-input" />
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modal2.show = false">{{ lang.btn4 }}</BButton>
      <BButton class="blue28">{{ lang.btn8 }}</BButton>
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
import { BFormInput, BFormSelect, BButton, BFormTextarea, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next/components'
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

  filter1: '장치 유형',
  filter2: '장치 모델명',
  filter3: '펌웨어 버전',
  filter4: '설명',
  filter5: '등록일',

  btn1: '등록',
  btn2: '일괄등록',
  btn3: '삭제',
  btn4: '취소',
  btn5: '저장',
  btn6: '추가',
  btn7: '통화기능키 설정',
  btn8: '수정',

  colTh1: 'No',
  colTh2: 'F/W 이름',
  colTh3: '장치 유형',
  colTh4: '장치 모델명',
  colTh5: '펌웨어 버전',
  colTh6: '설명/비고',
  colTh7: '등록일',

  modalTitle1: '펌웨어 등록',
  modalTitle2: '펌웨어 정보 수정',

  modalTh1_1: '장치유형',
  modalTh1_2: '장치 모델명',
  modalTh1_3: '펌웨어 버전',
  modalTh1_4: '펌웨어 파일',
  modalTh1_5: '설명/비고',

  modalTh2_1: '펌웨어 파일명',
  modalTh2_2: '장치유형',
  modalTh2_3: '장치 모델명',
  modalTh2_4: '펌웨어 버전',
  modalTh2_5: '설명/비고',

}
const en = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
  searchSelect: '전체 선택/해제',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',

  filter1: '장치 유형',
  filter2: '장치 모델명',
  filter3: '펌웨어 버전',
  filter4: '설명',
  filter5: '등록일',

  btn1: '등록',
  btn2: '일괄등록',
  btn3: '삭제',
  btn4: '취소',
  btn5: '저장',
  btn6: '추가',
  btn7: '통화기능키 설정',
  btn8: '수정',

  colTh1: 'No',
  colTh2: 'F/W 이름',
  colTh3: '장치 유형',
  colTh4: '장치 모델명',
  colTh5: '펌웨어 버전',
  colTh6: '설명/비고',
  colTh7: '등록일',

  modalTitle1: '펌웨어 등록',
  modalTitle2: '펌웨어 정보 수정',

  modalTh1_1: '장치유형',
  modalTh1_2: '장치 모델명',
  modalTh1_3: '펌웨어 버전',
  modalTh1_4: '펌웨어 파일',
  modalTh1_5: '설명/비고',

  modalTh2_1: '펌웨어 파일명',
  modalTh2_2: '장치유형',
  modalTh2_3: '장치 모델명',
  modalTh2_4: '펌웨어 버전',
  modalTh2_5: '설명/비고',
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
const selectedIds = ref([]) // 선택된 행 id
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
      th2: `펌웨어_${i}.bin`, downloadUrl: `https://example.com/firmware/firmware_${i}.bin`, // 다운로드 URL
      th3: 'th3 내용',
      th4: 'th4 내용',
      th5: 'th5 내용',
      th6: 'th6 내용',
      th7: '2025.12.12 11:22:00',
    })
  }
  return arr
}
const items = ref(generateItems(40)) // 임시 데이터 40개
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: 'auto' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: '14rem' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: '14rem' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '14rem' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '14rem' } },
  { key: 'th7', label: lang.value.colTh7, thStyle: { width: '14rem' } },
])

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
function onRowClicked() { modals.modal2.show = true }

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
