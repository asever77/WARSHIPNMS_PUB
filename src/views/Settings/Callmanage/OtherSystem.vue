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
          <BFormInput class="ui-input" placeholder=""></BFormInput>
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
        <th scope="row"></th>
        <td></td>
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
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive @row-clicked="onRowClicked" data-type="clickable">
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

        <template #cell(th9)="{ item }">
          <div class="form-switch--wrap">
            <BFormCheckbox
              v-model="item.th9"
              switch
              :inline="true"
              :value="true"
              :unchecked-value="false"
              class="switch-checkbox"
            />
            <span>{{ item.th9 ? 'on' : 'off' }}</span>
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
    <BButton class="blue28" @click="modals.modal1.show = true">{{ lang.btn2 }}</BButton>
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
               <BFormInput type="text" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_2 }}</th>
            <td>
               <BFormInput type="text" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_3 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_4 }}</th>
            <td>
               <BFormInput type="text" />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="ui-flex" data-direction="col" data-gap="8">
        <div class="ui-btn-group">
          <BButton class="blue24">{{ lang.btn6 }}</BButton>
        </div>

        <table class="table-type-a">
          <colgroup>
            <col style="width: 4rem" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: 6rem" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{{ lang.modalTh2_1 }}</th>
              <th scope="col">{{ lang.modalTh2_2 }}</th>
              <th scope="col">{{ lang.modalTh2_3 }}</th>
              <th scope="col">{{ lang.modalTh2_4 }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ta-c">1</td>
              <td>
                <BFormInput class="ui-input" placeholder=""></BFormInput>
              </td>
              <td>
                <BFormInput class="ui-input" placeholder=""></BFormInput>
              </td>
              <td class="ta-c">
                <BButton class="gray24 min-w-0">{{ lang.btn3 }}</BButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
            <th scope="row">{{ lang.modalTh1_1 }}</th>
            <td>
               <BFormInput type="text" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_2 }}</th>
            <td>
               <BFormInput type="text" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_3 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_4 }}</th>
            <td>
               <BFormInput type="text" />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="ui-flex" data-direction="col" data-gap="8">
        <div class="ui-btn-group">
          <BButton class="blue24">{{ lang.btn6 }}</BButton>
        </div>

        <table class="table-type-a">
          <colgroup>
            <col style="width: 4rem" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: 6rem" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{{ lang.modalTh2_1 }}</th>
              <th scope="col">{{ lang.modalTh2_2 }}</th>
              <th scope="col">{{ lang.modalTh2_3 }}</th>
              <th scope="col">{{ lang.modalTh2_4 }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ta-c">1</td>
              <td>
                <BFormInput class="ui-input" placeholder=""></BFormInput>
              </td>
              <td>
                <BFormInput class="ui-input" placeholder=""></BFormInput>
              </td>
              <td class="ta-c">
                <BButton class="gray24 min-w-0">{{ lang.btn3 }}</BButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modal2.show = false">{{ lang.btn4 }}</BButton>
      <BButton class="blue28">{{ lang.btn5 }}</BButton>
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
import { BFormInput, BButton, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  totalLabel: '전체',

  filter1: '교환기이름',
  filter2: '교환기주소',
  filter3: '기압자정보',

  btn1: '조회',
  btn2: '등록',
  btn3: '삭제',
  btn4: '취소',
  btn5: '저장',
  btn6: '가입자 추가 +',

  colTh1: 'No',
  colTh2: '타체계 교환기 이름',
  colTh3: '타체계 교환기 주소',
  colTh4: '프리픽스',
  colTh5: '설명',
  colTh6: '가입자 수',
  colTh7: '가입자 내선번호',
  colTh8: '등록일',
  colTh9: '활성여부',

  modalTitle1: '타체계 교환기 정보 등록',
  modalTitle2: '타체계 교환기 정보 수정',

  modalTh1_1:'타체계 교환기 이름',
  modalTh1_2:'타체계 교환기 주소',
  modalTh1_3:'프리픽스',
  modalTh1_4:'설명/비고',

  modalTh2_1:'No',
  modalTh2_2:'내선번호',
  modalTh2_3:'이름(설명)',
  modalTh2_4:'삭제',
}
const en = {}
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
const items = ref([
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: 'th4 내용', th5: 'th5 내용',  th6: 'th6 내용',  th7: 'th7 내용',  th8: '2025-09-12 12:22:33', th9: false },
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: 'th4 내용', th5: 'th5 내용',  th6: 'th6 내용',  th7: 'th7 내용',  th8: '2025-09-12 12:22:33', th9: true },
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: 'th4 내용', th5: 'th5 내용',  th6: 'th6 내용',  th7: 'th7 내용',  th8: '2025-09-12 12:22:33', th9: false },
  { id: 1, th1: '1', th2: 'th2 내용', th3: 'th3 내용', th4: 'th4 내용', th5: 'th5 내용',  th6: 'th6 내용',  th7: 'th7 내용',  th8: '2025-09-12 12:22:33', th9: false },

])
const fields = computed(() => [
  { key: 'select', label: lang.value.colSelect, thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '6rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: '14rem' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: 'auto' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: '12rem' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '12rem' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '12rem' } },
  { key: 'th7', label: lang.value.colTh7, thStyle: { width: '15rem' } },
  { key: 'th8', label: lang.value.colTh8, thStyle: { width: '16rem' } },
  { key: 'th9', label: lang.value.colTh9, thStyle: { width: '12rem' } },

])

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

// 필터링/페이지네이션
const filteredItems = computed(() => items.value)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})


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
