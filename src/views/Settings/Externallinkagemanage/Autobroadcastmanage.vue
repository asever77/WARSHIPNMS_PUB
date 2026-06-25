<template>
  <div class="base-wrap ">
    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">{{ lang.totalLabel }}:15</span>
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
              aria-label="{{ lang.btnSearch }}"
              @click="onFilter"
            ></button>
          </div>
        </BFormGroup>
        <BFormSelect class="ui-select-28"></BFormSelect>

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
        <template #cell(th7)="{ item }">
          <div class="form-switch--wrap">
            <BFormCheckbox
              v-model="item.th7"
              switch
              :inline="true"
              :value="true"
              :unchecked-value="false"
              class="switch-checkbox"
            />
            <span>{{ item.th7 ? 'on' : 'off' }}</span>
          </div>
        </template>
      </BTable>
    </div>
  </div>
  <div class="ui-btn-group">
    <div class="ui-flex ml-auto" data-gap="8">
      <BFormCheckbox switch :inline="true" :value="true" :unchecked-value="false" class="ui-switch" v-model="shipStatus">
         <span>{{ shipStatus ? '함정운항상태: 항해중' : '함정운항상태: 정박중' }}</span>
      </BFormCheckbox>
    </div>
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
              {{ form1.name }}
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_2 }}</th>
            <td>
               {{ form1.type }}
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_3 }}</th>
            <td>
               {{ form1.gender }}
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_4 }}</th>
            <td>
               {{ form1.content }}
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalTh1_5 }}</th>
            <td>
               {{ form1.datestart }} ~ {{ form1.dateend }}
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalTh1_6 }}</th>
            <td>
              {{ form1.scedule }}
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
      <BButton class="blue28">{{ lang.modal1Btn1 }}</BButton>
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
  filter2: '반복여부',

  btnSearch: '조회',
  btn1: '등록',
  btn2: '삭제',

  colTh1: 'No',
  colTh2: '이름',
  colTh3: '반복여부',
  colTh4: '방송내용',
  colTh5: '적용기간',
  colTh6: '스케쥴',
  colTh7: '적용시간',

  modalTitle1: '방송음원 생성',
  modalTh1_1: '이름',
  modalTh1_2: '유형',
  modalTh1_3: '목소리 성별',
  modalTh1_4: '방송내용',
  modalTh1_5: '적용기간',
  modalTh1_6: '스케줄',
  modal1Btn1: '즉시방송',
}

const en = {

}
const lang = ref({})

const form1 = ref({
  name: '테스트방송 ',
  type: '항해중',
  gender: '남성',
  content: '음성합성이란 텍스트데이터를 음성으로 변환하는 기술로 임의의 문장을 입력받아 음성으로 표현하는 기술입니다',
  datestart: '2026-05-10',
  dateend: '2027-01-03',
  scedule: '선택',
})

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
const filterText = ref('') // 검색어
const shipStatus = ref(true) // true: 항해중, false: 정박중
// 샘플 데이터 (JSON 배열)
const items = ref(Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  th1: String(i + 1),
  th2: `당직교대 15분전 휴일`,
  th3: '항해중',
  th4: `음성합성아란 텍스트데이터를 가지고서음성합성아란 텍스트데이터를 가지고서음성합성아란 텍스트데이터를 가지고서음성합성아란 텍스트데이터를 가지고서음성합성아란 텍스트데이터를 가지고서`,
  th5: `2026-01-01~2026-01-01`,
  th6: `평일 오전과 업알림 15분전`,
  th7: false
})))
const fields = computed(() => [
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: '14rem' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: '8rem' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: 'auto' }, tdClass: 'text-ellipsis' },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '18rem' } },
  { key: 'th6', label: lang.value.colTh6, tdAttr: { style: 'width: 15rem;' }, thAttr: { colspan: 2 } },
  { key: 'th7', label: '',  tdAttr: { style: 'width: 8rem;' }, thAttr: { style: 'display: none' } },
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
function onRowClicked() { modals.modal1.show = true }

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
