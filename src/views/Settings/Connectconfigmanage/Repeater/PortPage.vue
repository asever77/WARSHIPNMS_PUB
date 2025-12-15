<template>
  <div class="base-wrap">
    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">{{ lang.totalLabel }}:15</span>
      </div>
      <div class="search-base--btns">
        <BFormSelect
          id="search-target"
          class="ui-select"
          :options="[
            {value: '1', text: '선택',}
          ]"
        ></BFormSelect>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive @row-clicked="onRowClicked" data-type="clickable">
      </BTable>

      <div class="d-flex justify-content-center mt-4">
        <BPagination
          v-model="currentPage"
          :total-rows="items.length"
          :per-page="perPage"
          aria-controls="manual-table"
        />
      </div>
    </div>
  </div>

  <UiModal v-model="modals.modalModify1.show" :title="lang.modalTitle1" type="modal" size="md" @close-btn-click="modals.modalModify1.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:9rem">
          <col style="width:9rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row" colspan="2">{{ lang.modalth1 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>
          <tr>
            <th scope="row" colspan="2">{{ lang.modalth2 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>
          <tr>
            <th scope="row" colspan="2">{{ lang.modalth3 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>
          <tr>
            <th scope="row" colspan="2">{{ lang.modalth4 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row" rowspan="2">{{ lang.modalth5 }}</th>
            <th scope="row">{{ lang.modalth6 }}</th>
            <td>
              <div class="d-flex gap-1">
                <BFormCheckbox value="1">{{ lang.checkbox1 }}</BFormCheckbox>
                <BFormInput class="ui-input mt-2" />
              </div>

            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth7 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :disabled="true"
                :options="[
                  { value: '1', text: 'PTT' },
                ]"
              />
            </td>
          </tr>


          <tr>
            <th scope="row" colspan="2" rowspan="2">{{ lang.modalth8 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  { value: '1', text: 'PTT' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <td>
              <BFormSelect
                class="ui-select"
                :disabled="true"
                :options="[
                  { value: '1', text: 'PTT' },
                ]"
              />
            </td>
          </tr>

          <tr>
            <th scope="row" rowspan="3">{{ lang.modalth9 }}</th>
            <th scope="row">{{ lang.modalth10 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :disabled="true"
                :options="[
                  { value: '1', text: 'PTT' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth11 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :disabled="true"
                :options="[
                  { value: '1', text: 'PTT' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth12 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :disabled="true"
                :options="[
                  { value: '1', text: 'PTT' },
                ]"
              />
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify1.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'
import UiModal from '@/components/UiModal.vue'

const ko = {
  totalLabel: '전체',

  btnCancel: '취소',
  btnSave: '저장',

  colSelect: '선택',
  colTh1: 'No',
  colTh2: '장치명',
  colTh3: 'I/F 유형',
  colTh4: '카드#',
  colTh5: '포트#',
  colTh6: 'VoIP 가입자',
  colTh7: '연결 장치',

  modalTitle1: '유무선통합중계기 포트 연결정보 설정',

  modalth1: '장치명',
  modalth2: '카드 I/F 유형',
  modalth3: '카드번호',
  modalth4: '포트번호',
  modalth5: 'VoIP',
  modalth6: '가입자',
  modalth7: '등급',
  modalth8: '연결유형',
  modalth9: '연결장치',
  modalth10: '장치',
  modalth11: '카드',
  modalth12: '포트',
}
const en = {
  totalLabel: '전체',

  btnCancel: '취소',
  btnSave: '저장',

  colSelect: '선택',
  colTh1: 'No',
  colTh2: '장치명',
  colTh3: 'I/F 유형',
  colTh4: '카드#',
  colTh5: '포트#',
  colTh6: 'VoIP 가입자',
  colTh7: '연결 장치',

  modalTitle1: '유무선통합중계기 포트 연결정보 설정',

  modalth1: '장치명',
  modalth2: '카드 I/F 유형',
  modalth3: '카드번호',
  modalth4: '포트번호',
  modalth5: 'VoIP',
  modalth6: '가입자',
  modalth7: '등급',
  modalth8: '연결유형',
  modalth9: '연결장치',
  modalth10: '장치',
  modalth11: '카드',
  modalth12: '포트',
}
const lang = ref({})

// 모달 상태
const modals = reactive({
  modalModify1: { show: false },
})

// 장치 목록 샘플 데이터 40개 생성 (테스트용)
const items = ref(generateItems(4))

function onRowClicked() {
  modals.modalModify1.show = true;
}

// 샘플데이터 생성 함수
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
      th6: 'th6 내용',
      th7: 'th7 내용',
    })
  }
  return arr
}

const fields = computed(() => [
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: '20rem' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: '20rem' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: '10rem' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '10rem' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '10rem' } },
  { key: 'th7', label: lang.value.colTh7, thStyle: { width: 'auto' } },
]);

const currentPage = ref(1)
const perPage = ref(10)

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return items.value.slice(start, start + perPage.value)
})

// 페이지당 개수 변경 시 첫 페이지로 이동
watch(perPage, () => {
  currentPage.value = 1
})

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
})
</script>
