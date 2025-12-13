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
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            :options="[
              {value: '1', text: '선택',}
            ]"
          ></BFormSelect>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter4 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter4 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            :options="[
              {value: '1', text: '선택',}
            ]"
          ></BFormSelect>
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
    </div>
    <div class="base-table">
      <div class="table-responsive">
        <table class="table b-table table-bordered table-hover table-sm">
          <colgroup>
            <col style="width: 5rem" />
            <col style="width: 7rem" />
            <col style="width: 17rem" />
            <col style="width: 17rem" />
            <col style="width: 14rem" />
            <col style="width: 14rem" />
            <col style="width: 14rem" />
            <col style="width: auto" />
          </colgroup>
          <thead>
            <tr>
              <th rowspan="2">{{ lang.colTh1 }}</th>
              <th rowspan="2">{{ lang.colTh2 }}</th>
              <th colspan="2">{{ lang.colTh3 }}</th>
              <th rowspan="2">{{ lang.colTh4 }}</th>
              <th rowspan="2">{{ lang.colTh5 }}</th>
              <th rowspan="2">{{ lang.colTh6 }}</th>
              <th rowspan="2">{{ lang.colTh7 }}</th>
            </tr>
            <tr>
              <th class="l-line">{{ lang.colTh3_1 }}</th>
              <th>{{ lang.colTh3_2 }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in items" :key="row.no" @click="modals.modalModify.show = true" style="cursor:pointer;">
              <td>{{ row.no }}</td>
              <td>{{ row.type }}</td>
              <td>{{ row.voip_caller }}</td>
              <td>{{ row.voip_callee }}</td>
              <td>{{ row.card_port }}</td>
              <td>{{ row.caller_number }}</td>
              <td>{{ row.record_number }}</td>
              <td>{{ row.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
     </div>
  </div>

  <UiModal
    v-model="modals.modalModify.show"
    :title="lang.modalTitle1"
    type="modal"
    size="md"
    @close-btn-click="modals.modalModify.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 9rem" />
          <col style="width: 9rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row" colspan="2">{{ lang.modalth1 }}</th>
            <td>
             <b>Voip</b>
            </td>
          </tr>
          <tr>
            <th scope="row" colspan="2">{{ lang.modalth2 }}</th>
            <td>
             <b>C03</b>
            </td>
          </tr>

          <tr>
            <th scope="row" colspan="2">{{ lang.modalth3 }}</th>
            <td>
              <BFormSelect  class="ui-select" :options="[ {value: '1', text: '선택',} ]" />
            </td>
          </tr>

          <tr>
            <th scope="row" colspan="2">{{ lang.modalth4 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
          </tr>

          <tr>
            <th scope="row" colspan="2">{{ lang.modalth5 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
          </tr>

          <tr>
            <th scope="row" rowspan="2">{{ lang.modalth6 }}</th>
            <th scope="row">{{ lang.modalth7 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth8 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
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
import { BTab } from 'bootstrap-vue-next'
import UiTabs from '@/components/UiTabs.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  totalLabel: '전체',

  filter1: '유형',
  filter2: '녹음대상 명칭',
  filter3: '아이디',
  filter4: '도메인(IP)',

  btnSearch: '조회',
  btnCancel: '취소',
  btnSave: '저장',

  colTh1: 'No',
  colTh2: '유형',
  colTh3: 'VoIP 녹음대상',
  colTh3_1: '발신가입자',
  colTh3_2: '착신가입자',
  colTh4: '카트/포트',
  colTh5: '발신 전화번호',
  colTh6: '녹음 전화번호',
  colTh7: '녹음대상 (설명/비고)',

  modalTitle1: '녹음대상 정보 등록/수정',

  modalth1: '녹음대상 유형',
  modalth2: '연결정보(카드/포트)',
  modalth3: '발신 전화번호',
  modalth4: '녹음(착신) 전화번호',
  modalth5: '녹음대상 (설명/비고)',
  modalth6: 'VoIP 녹음대상',
  modalth7: '발신',
  modalth8: '착신',
}
const en = {}
const lang = ref({})


// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modalModify: { show: false },
})

// =========================
// [상태/폼/리스트 관리]
// =========================

// 실제 데이터 연동 시 아래 부분을 교체하세요
// 임시 샘플 데이터 생성 함수
const items = [
  {
    "no": 1,
    "type": "내선",
    "voip_caller": "홍길동",
    "voip_callee": "김철수",
    "card_port": "A-1",
    "caller_number": "010-1234-5678",
    "record_number": "070-1111-2222",
    "desc": "테스트 설명"
  },
  {
    "no": 2,
    "type": "외선",
    "voip_caller": "이영희",
    "voip_callee": "박영수",
    "card_port": "B-2",
    "caller_number": "010-8765-4321",
    "record_number": "070-3333-4444",
    "desc": "비고 내용"
  }
]


// 필터링/페이지네이션


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
