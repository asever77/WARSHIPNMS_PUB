<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 8rem" />
      <col style="width: 14rem" />
      <col style="width: 8rem" />
      <col style="width: auto" />
       <col style="width: 8rem" />
      <col style="width: auto" />
       <col style="width: 8rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
    <tr>
      <th scope="row">{{ lang.filter1 }}</th>
      <td>
        <BFormInput class="ui-input" placeholder=""></BFormInput>
      </td>
      <th scope="row">{{ lang.filter2 }}</th>
      <td>
        <BFormInput class="ui-input" placeholder=""></BFormInput>
      </td>

      <th scope="row">{{ lang.filter3 }}</th>
      <td>
        <BFormInput class="ui-input" placeholder=""></BFormInput>
      </td>
      <th scope="row">{{ lang.filter4 }}</th>
      <td>
        <BFormInput class="ui-input" placeholder=""></BFormInput>
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
        <span class="search-total">{{ lang.totalLabel }}: {{ filteredItems.length }}</span>
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
            <button
              type="button"
              class="btn-search-icon"
              aria-label="검색"
              @click="onFilter"
            ></button>
          </div>
        </BFormGroup>
        <BFormSelect
          id="per-page"
          class="ui-select-28 w-60"
          v-model="perPage"
          :options="perPageOptions"
        ></BFormSelect>
      </div>
    </div>
    <div class="base-table">
      <BTable
        :items="paginatedItems"
        :fields="fields"
        bordered
        hover
        small
        responsive
        @row-clicked="onRowClicked"
        data-type="clickable"
      >
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
    <BButton class="blue28" @click="modals.modal1.show = true">{{ lang.btn1 }}</BButton>
    <BButton class="gray28">{{ lang.btn2 }}</BButton>
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
            <th scope="row">{{ lang.modalTh1_1 }}*</th>
            <td>
               <BFormInput type="text" class="ui-input" v-model="form1.name" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_2 }}*</th>
            <td>
               <BFormSelect class="ui-select-28 w-60" :options="['항해중', '정박중', '기타']" v-model="form1.type"></BFormSelect>
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_3 }}*</th>
            <td>
               <BFormSelect class="ui-select-28 w-60" :options="['남성', '여성']" v-model="form1.gender"></BFormSelect>
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_4 }}*</th>
            <td>
               <BFormTextarea class="ui-textarea" style="height: 10rem;" v-model="form1.content" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalTh1_5 }}</th>
            <td>
               <div class="ui-flex ui-data-box" data-item-align="center" data-gap="4">
                <BFormInput
                  id="reg-date-start"
                  class="ui-input"
                  placeholder=""
                  type="date"
                  v-model="form1.datestart"
                ></BFormInput>
                ~
                <BFormInput
                  id="reg-date-end"
                  class="ui-input"
                  placeholder=""
                  type="date"
                  v-model="form1.dateend"
                ></BFormInput>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalTh1_6 }}</th>
            <td>
              <BFormSelect class="ui-select-28 w-60" :options="['선택', '평일 오전과업알림 15분전', '평일 오전과업알림 5분전', '매일 오후 18시']" v-model="form1.scedule"></BFormSelect>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ui-flex mt-2" data-direction="col" data-gap="4">
        <p class="fs-5">음성 합성 중…</p>
        <div class="ui-flex" data-direction="col" data-gap="4">
          <progress
            max="100"
            value="24"
            class="w-100"
            style="height: 2.4rem;"
          ></progress>
        </div>
      </div>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modal1.show = false">{{ lang.modal1Btn1 }}</BButton>
      <BButton class="blue28">{{ lang.modal1Btn2 }}</BButton>
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
            <th scope="row">{{ lang.modalTh2_1 }}*</th>
            <td>
               <BFormInput type="text" class="ui-input" v-model="form2.name" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh2_2 }}*</th>
            <td>
               <BFormSelect class="ui-select-28 w-60" :options="['항해중', '정박중', '기타']" v-model="form2.type"></BFormSelect>
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh2_3 }}*</th>
            <td>
               <BFormSelect class="ui-select-28 w-60" :options="['남성', '여성']" v-model="form2.gender"></BFormSelect>
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh2_4 }}*</th>
            <td>
               <BFormTextarea class="ui-textarea" style="height: 10rem;" v-model="form2.content" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalTh2_5 }}</th>
            <td>
               <div class="ui-flex ui-data-box" data-item-align="center" data-gap="4">
                <BFormInput
                  id="reg-date-start"
                  class="ui-input"
                  placeholder=""
                  type="date"
                  v-model="form2.datestart"
                ></BFormInput>
                ~
                <BFormInput
                  id="reg-date-end"
                  class="ui-input"
                  placeholder=""
                  type="date"
                  v-model="form2.dateend"
                ></BFormInput>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalTh1_6 }}</th>
            <td>
              <BFormSelect class="ui-select-28 w-60" :options="['선택', '평일 오전과업알림 15분전', '평일 오전과업알림 5분전', '매일 오후 18시']" v-model="form2.scedule"></BFormSelect>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ui-flex mt-2" data-direction="col" data-gap="4">
        <div class="ui-flex" data-direction="col" data-gap="4">
          <audio controls class="w-100" style="height: 3.2rem;">
            <source src="" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modal2.show = false">{{ lang.modal2Btn1 }}</BButton>
      <BButton class="blue28" @click="openSystemConfirm">{{ lang.modal2Btn2 }}</BButton>
    </template>
  </UiModal>

  <UiModal
    v-model="modals.systemModal.show"
    :title=lang.systemTitle
    type="system"
  >
    <p class="text-center py-3 fs-5">{{ lang.systemContent }}</p>
    <template #footer>
      <div class="ui-flex ui-w-full" data-item-align="center" data-justify-align="center" data-gap="10">
        <BButton class="blue28" @click="modals.systemModal.show = false">{{ lang.btn3 }}</BButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import {
  BFormInput,
  BFormSelect,
  BButton,
  BFormGroup,
  BPagination,
  BTable,
  BFormCheckbox,
  BFormTextarea,
} from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  title1: '방송 음원 관리',
  totalLabel: '전체',

  filter1: '이름',
  filter2: '유형',
  filter3: '방송내용',
  filter4: '스케쥴',

  btnSearch: '조회',
  btn1: '등록',
  btn2: '삭제',
  btn3: '확인',

  colTh1: 'No',
  colTh2: '이름',
  colTh3: '유형',
  colTh4: '방송내용',
  colTh5: '적용기간',
  colTh6: '스케쥴',

  modalTitle1: '방송음원 생성',
  modalTh1_1: '이름',
  modalTh1_2: '유형',
  modalTh1_3: '목소리 성별',
  modalTh1_4: '방송내용',
  modalTh1_5: '적용기간',
  modalTh1_6: '스케줄',
  modal1Btn1: '취소',
  modal1Btn2: '음성생성',

  modalTitle2: '방송음원 수정',
  modalTh2_1: '이름',
  modalTh2_2: '유형',
  modalTh2_3: '목소리 성별',
  modalTh2_4: '방송내용',
  modalTh2_5: '적용기간',
  modalTh2_6: '스케줄',
  modal2Btn1: '취소',
  modal2Btn2: '수정하기',
  modal2Audio: '음원 미리듣기',
  systemTitle: '운영중인 방송음원 변경',
  systemContent: '운영중인 방송장비의 음원이 변경됩니다.',

  searchPlaceholder: '검색어 입력',
  searchSelect: '전체 선택/해제',
}

const en = {
  title1: '방송 음원 관리',
  totalLabel: '전체',

  filter1: '이름',
  filter2: '유형',
  filter3: '방송내용',
  filter4: '스케쥴',

  btnSearch: '조회',
  btn1: '등록',
  btn2: '삭제',

  colTh1: 'No',
  colTh2: '이름',
  colTh3: '유형',
  colTh4: '방송내용',
  colTh5: '적용기간',
  colTh6: '스케쥴',

  modalTitle1: '방송음원 생성',
  modalTh1_1: '이름',
  modalTh1_2: '유형',
  modalTh1_3: '목소리 성별',
  modalTh1_4: '방송내용',
  modalTh1_5: '적용기간',
  modalTh1_6: '스케줄',
  modal1Btn1: '취소',
  modal1Btn2: '음성생성',

  modalTitle2: '방송음원 수정',
  modalTh2_1: '이름',
  modalTh2_2: '유형',
  modalTh2_3: '목소리 성별',
  modalTh2_4: '방송내용',
  modalTh2_5: '적용기간',
  modalTh2_6: '스케줄',
  modal2Btn1: '취소',
  modal2Btn2: '수정하기',
  modal2Audio: '음원 미리듣기',
  systemTitle: '운영중인 방송음원 변경',
  systemContent: '운영중인 방송장비의 음원이 변경됩니다.',

  searchPlaceholder: '검색어 입력',
  searchSelect: '전체 선택/해제',
}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modal1: { show: false },
  modal2: { show: false },
  systemModal: { show: false },
})

// =========================
// [상태/폼/리스트 관리]
// =========================
const currentPage = ref(1) // 현재 페이지
const form1 = ref({
  name: '테스트방송 ',
  type: '항해중',
  gender: '남성',
  content: '음성합성이란 텍스트데이터를 음성으로 변환하는 기술로 임의의 문장을 입력받아 음성으로 표현하는 기술입니다',
  datestart: '2026-05-10',
  dateend: '2027-01-03',
  scedule: '선택',
})
const form2 = ref({
  name: '테스트방송 ',
  type: '항해중',
  gender: '남성',
  content: '음성합성이란 텍스트데이터를 음성으로 변환하는 기술로 임의의 문장을 입력받아 음성으로 표현하는 기술입니다',
  datestart: '2026-05-10',
  dateend: '2027-01-03',
  scedule: '선택',
})
const perPage = ref(10) // 페이지당 개수
const selectedIds = ref([]) // 선택된 행 id
const filterText = ref('') // 검색어
const perPageOptions = [
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' },
]
// 샘플 데이터 (JSON 배열)
const items = ref(Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  th1: String(i + 1),
  th2: `총기상15분전`,
  th3: '정박중',
  th4: `설명${i + 1}`,
  th5: '2026-01-01~2026-01-01',
  th6: '평일 총기상 오전6시30분 ',
})))
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: '10rem' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: '8rem' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: 'auto' }, tdClass: 'text-ellipsis' },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '18rem' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '18rem' }, tdClass: 'text-ellipsis' },
])

// 필터링/페이지네이션
const filteredItems = computed(() => {
  if (!filterText.value) return items.value
  const query = filterText.value.toLowerCase().trim()
  return items.value.filter((item) => {
    return (
      (item.th2 && item.th2.toLowerCase().includes(query)) ||
      (item.th3 && item.th3.toLowerCase().includes(query)) ||
      (item.th4 && item.th4.toLowerCase().includes(query)) ||
      (item.th5 && item.th5.toLowerCase().includes(query)) ||
      (item.th6 && item.th6.toLowerCase().includes(query))
    )
  })
})
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

// 체크박스 전체선택/부분선택
const isAllSelected = computed(() => {
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (pageIds.length === 0) return false
  return pageIds.every((id) => selectedIds.value.includes(id))
})
const isIndeterminate = computed(() => {
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (pageIds.length === 0) return false
  const selectedOnPage = pageIds.filter((id) => selectedIds.value.includes(id)).length
  return selectedOnPage > 0 && selectedOnPage < pageIds.length
})
function toggleSelectAll(checked) {
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (checked) {
    const set = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(set)
  } else {
    selectedIds.value = selectedIds.value.filter((id) => !pageIds.includes(id))
  }
}

// =========================
// [UI 이벤트 핸들러]
// =========================
function onRowClicked(item) {
  let start = ''
  let end = ''
  if (item.th5 && item.th5.includes('~')) {
    const parts = item.th5.split('~')
    start = parts[0].trim()
    end = parts[1].trim()
  }
  form2.value = {
    name: item.th2 || '',
    type: item.th3 || '항해중',
    gender: item.gender || '남성',
    content: item.th4 || '',
    datestart: start,
    dateend: end,
    scedule: item.th6 || '선택',
  }
  modals.modal2.show = true
}
function onFilter() {
  currentPage.value = 1
}
function openSystemConfirm() {
  modals.systemModal.show = true
}
function confirmSystemChange() {
  modals.systemModal.show = false
  modals.modal2.show = false
}

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
