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
        <BFormGroup>
          <div class="ui-search-with-btn">
            <BFormInput
              id="search-word-2"
              class="ui-input-28"
            />
            <button type="button" class="btn-search-icon" aria-label="{{ lang.btnSearch }}" ></button>
          </div>
        </BFormGroup>
      </div>
    </div>
    <div class="base-table thead-sticky">
      <BTable :items="items" :fields="fields" bordered hover small responsive>
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
    </div>
  </div>

  <div class="ui-btn-group">
    <BButton class="blue28" @click="modals.modal2.show = true">{{ lang.btn1 }}</BButton>
    <BButton class="blue28" @click="modals.modal1.show = true">{{ lang.btn5 }}</BButton>
  </div>

  <UiModal v-model="modals.modal2.show"
    :title="lang.modalTitle2"
    type="modal"
    size="md"
    @close-btn-click="modals.modal2.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">

      <div class="ui-flex py-4" data-direction="col" data-gap="20" data-item-align="center">
        <p class="fs-4 ta-c fw-bold">
          선택한 123개의 장치가 재시작 됩니다.
        </p>
        <p class="fs-5 ta-c">
          계속 진행하시려면 로그인 패스워드를 <br />입력하여 작업을 승인해야 합니다.
        </p>
      </div>
      <table class="table-type-a">
        <colgroup>
          <col style="width: 16rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh2_1 }}</th>
            <td>
              <BFormInput type="password" class="ui-input" placeholder=""></BFormInput>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="ui-flex mt-4" data-direction="col" data-gap="8">
      <p class="fs-5">재시작 요청 100% (123/123) </p>
      <div class="ui-flex" data-direction="col" data-gap="4">
        <progress
          max="100"
          value="24"
          class="w-100"
          style="height: 2.4rem;"
        ></progress>
      </div>
      <p class="fs-5">재시작 완료율 100% (123/123) </p>
      <div class="ui-flex" data-direction="col" data-gap="4">
        <progress
          max="100"
          value="90"
          class="w-100"
          style="height: 2.4rem;"
        ></progress>
      </div>
    </div>

    <template #footer>
      <BButton class="gray28" @click="modals.modal2.show = false"
        >{{ lang.btn2 }}</BButton
      >
      <BButton class="blue28" @click="modals.modal1.show = true">{{ lang.btn3 }}</BButton>
    </template>
  </UiModal>

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
          <col style="width: 20rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh1_1 }}</th>
            <td>
              <b>BDGR1 CAPTS 외 122개(총 123개 장치) </b>
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_2 }}</th>
            <td>
              123
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_3 }}</th>
            <td>
              121
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_4 }}</th>
            <td>
              0
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_5 }}</th>
            <td>
              1
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template #footer>
      <BButton class="gray28" @click="modals.modal1.show = false">{{ lang.btn4 }}</BButton>
      <BButton class="blue28" @click="modals.modal3.show = true">{{ lang.btn6 }}</BButton>
    </template>
  </UiModal>

  <UiModal
    v-model="modals.modal3.show"
    :title="lang.modalTitle3"
    type="modal"
    size="xlg"
    @close-btn-click="modals.modal3.show = false"
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
        <template #head(select)>
          <BFormCheckbox
            :indeterminate="extraIsIndeterminate"
            :model-value="extraIsAllSelected"
            @update:modelValue="extraToggleSelectAll"
            aria-label="추가 테이블 전체 선택/해제"
          />
        </template>
        <template #cell(select)="data">
          <BFormCheckbox v-model="extraSelectedIds" :value="data.item.id" />
        </template>
      </BTable>
    </div>

    <template #footer>
      <BButton class="blue28">{{ lang.btn7 }}</BButton>
      <BButton class="gray28" @click="modals.modal3.show = false">{{ lang.btn4 }}</BButton>
    </template>
  </UiModal>
</template>

<style scoped>
.thead-sticky .table-responsive{height: calc(100dvh - 40rem);}
</style>

<script setup>

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

  filter1: '장치 유형',
  filter2: '장치 모델명',
  filter3: '펌웨어 버전',
  filter4: '장치명',
  filter5: '부팅일시',

  btn1: '재시작 요청',
  btn2: '취소',
  btn3: '적용',
  btn4: '닫기',
  btn5: '초기화 요청',
  btn6: '상세정보 조회',
  btn7: '재시도',

  colTh1: 'No',
  colTh2: '장치명',
  colTh3: '장치 유형',
  colTh4: '장치 모델명',
  colTh5: '펌웨어 버전',
  colTh6: '펌웨어 적용 일시',
  colTh7: '부팅 일시',

  colTh2_1: 'No',
  colTh2_2: '장치명',
  colTh2_3: '장치 유형',
  colTh2_4: '장치 모델명',
  colTh2_5: '응답결과',
  colTh2_6: '응답일시',
  colTh2_7: '부가정보',

  modalTitle1: '장치 재시작 작업 결과',
  modalTitle2: '장치 재시작 요청',
  modalTitle3: '장치 재시작 상세정보',

  modalTh1_1: '대상 장치',
  modalTh1_2: '재시작 요청',
  modalTh1_3: '성공 응답 장치',
  modalTh1_4: '실패 응답 장치',
  modalTh1_5: '응답 타임아웃',

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

  modalTh2_1: '로그인 패스워드',
}
const en = {}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modal1: { show: false },
  modal2: { show: false },
  modal3: { show: false },
})

// =========================
// [상태/폼/리스트 관리]
// =========================
const selectedIds = ref([]) // 선택된 행 id
const currentPage = ref(1) // 현재 페이지
const perPage = ref(10) // 페이지당 개수

// 실제 데이터 연동 시 아래 부분을 교체하세요
// 임시 샘플 데이터 생성 함수
function generateItems(n) {
  const arr = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      id: i,
      th1: String(i),
      th2: 'th2 내용',
      th3: 'th3 내용',
      th4: 'th4 내용',
      th5: 'th5 내용',
      th6: '2025.12.12 11:22:00',
      th7: '2025.12.12 11:22:00',
    })
  }
  return arr
}
const items = ref(generateItems(40)) // 임시 데이터 40개
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, sortable: true, thStyle: { width: 'auto' } },
  { key: 'th3', label: lang.value.colTh3, sortable: true, thStyle: { width: 'auto' } },
  { key: 'th4', label: lang.value.colTh4, sortable: true, thStyle: { width: '14rem' } },
  { key: 'th5', label: lang.value.colTh5, sortable: true, thStyle: { width: '14rem' } },
  { key: 'th6', label: lang.value.colTh6, sortable: true, thStyle: { width: '14rem' } },
  { key: 'th7', label: lang.value.colTh7, sortable: true, thStyle: { width: '14rem' } },
])

// =========================
// [추가 테이블 상태 관리]
// =========================
const extraSelectedIds = ref([])
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
const extraFields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh2_1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2_2, thStyle: { width: 'auto' } },
  { key: 'th3', label: lang.value.colTh2_3, thStyle: { width: 'auto' } },
  { key: 'th4', label: lang.value.colTh2_4, thStyle: { width: 'auto' } },
  { key: 'th5', label: lang.value.colTh2_5, thStyle: { width: '8rem' } },
  { key: 'th6', label: lang.value.colTh2_6, thStyle: { width: '14rem' } },
  { key: 'th7', label: lang.value.colTh2_7, thStyle: { width: 'auto' } },
]);

const extraIsAllSelected = computed(() => {
  const ids = extraItems.value.map(i => i.id)
  if (ids.length === 0) return false
  return ids.every(id => extraSelectedIds.value.includes(id))
})
const extraIsIndeterminate = computed(() => {
  const ids = extraItems.value.map(i => i.id)
  if (ids.length === 0) return false
  const selectedOnPage = ids.filter(id => extraSelectedIds.value.includes(id)).length
  return selectedOnPage > 0 && selectedOnPage < ids.length
})
function extraToggleSelectAll(checked) {
  const ids = extraItems.value.map(i => i.id)
  if (checked) {
    const set = new Set([...extraSelectedIds.value, ...ids])
    extraSelectedIds.value = Array.from(set)
  } else {
    extraSelectedIds.value = extraSelectedIds.value.filter(id => !ids.includes(id))
  }
}

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

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
