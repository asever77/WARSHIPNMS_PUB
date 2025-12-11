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
            <span class="ui-flex-1">{{ lang.thead1 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="none" aria-label="{{ lang.thead1 }} {{ lang.sortAll }}"></BButton>
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
            <span class="ui-flex-1">{{ lang.thead2 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.thead2 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormInput id="search-word" class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.thead3 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.thead3 }} {{ lang.sortAll }}"></BButton>
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
            <span class="ui-flex-1">{{ lang.thead4 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.thead4 }} {{ lang.sortAll }}"></BButton>
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
        <span class="search-total">Online:36</span>
        <span class="search-total">Offline:177</span>
      </div>
      <div class="search-base--btns">
        <!-- 검색어 입력 -->
        <BFormGroup :label="lang.searchLabel" label-for="search-word-2">
          <div class="ui-search-with-btn">
            <BFormInput
              id="search-word-2"
              v-model="filterText"
              :placeholder="lang.searchPlaceholder"
              class="ui-input-28"
            />
            <button type="button" class="btn-search-icon" aria-label="{{ lang.btnSearch }}" @click="onFilter" ></button>
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
    <BButton class="blue28">{{ lang.btnRegister }}</BButton>
    <BButton class="blue28">{{ lang.btnBulkRegister }}</BButton>
    <BButton class="gray28">{{ lang.btnDelete }}</BButton>
  </div>

  <UiModal
    v-model="modals.modalTerminalModify.show"
    :title="lang.modalTitle1"
    type="modal"
    size="lg"
    @close-btn-click="modals.modalTerminalModify.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
          <col style="width: 6rem" />
          <col style="width: 8rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalth1 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: 'MC700',}
                ]"
              />
            </td>
            <th scope="row" colspan="2">{{ lang.modalth2 }}</th>
            <td>
              <BFormInput type="number" value="50" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth3 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row" colspan="2">{{ lang.modalth4 }}</th>
            <td>
              <BFormInput type="number" value="50" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth5 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row" colspan="2">{{ lang.modalth6 }}</th>
            <td>
              <BFormInput type="number" value="50" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth7 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row" rowspan="3">{{ lang.modalth8 }}</th>
            <th scope="row">{{ lang.modalth9 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '모닝글로리',}
                ]"
              />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth10 }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row">{{ lang.modalth11 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '기상나팔',}
                ]"
              />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth12 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: 'ON',}
                ]"
              />
            </td>
            <th scope="row">{{ lang.modalth13 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '기상나팔',}
                ]"
              />
            </td>
          </tr>

          <tr>
            <th scope="row" rowspan="2">{{ lang.modalth14 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '구역',}
                ]"
              />
            </td>
            <th scope="row" colspan="2">{{ lang.modalth15 }}</th>
            <td>
              <BFormInput type="tel" />
            </td>
          </tr>

          <tr>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '전탐실',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth16 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '무선통신기시스템',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth17 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '6',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth18 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: 'ON',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth19 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: 'OFF',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth20 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :disabled="true"
                :options="[
                  {value: '1', text: 'OFF',}
                ]"
              />
            </td>
            <th scope="row" colspan="2"></th>
            <td></td>
          </tr>

        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalTerminalModify.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
      <BButton class="blue28 footer-right-btn"  @click="modals.modalPointSetting.show = true">{{ lang.btnBulkRegister }}</BButton>
    </template>
  </UiModal>

  <UiModal v-model="modals.modalPointSetting.show" :title="'BRDG1 CAPTS'" type="modal" size="md" class="bg-type" @close-btn-click="modals.modalPointSetting.show = false">
    <div class="ui-flex" data-direction="col" data-gap="8" style="padding-top: 0;">
      <h2 class="layer-title-box">
        <img src="@/assets/images/icon/icon-aspect-title-1.svg" alt="icon" />
        {{ lang.modalTitle2 }}
      </h2>
      <div class="box-pp">
        <div v-for="(btn, idx) in ppButtons" :key="idx" class="box-pp--item">{{ btn }}</div>
        <BButton class="box-pp--item" @click="openModify1">{{ lang.btnAdd }}</BButton>
      </div>
    </div>
  </UiModal>

  <UiModal v-model="modals.modalModify1.show" :title="lang.modalTitle3" type="modal" size="md" @close-btn-click="modals.modalModify1.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalth21 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :disabled="true"
                :options="[
                  { value: '1', text: '선택' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth22 }}</th>
            <td>
              <BFormInput
                class="ui-input"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth23 }}</th>
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
            <th scope="row">{{ lang.modalth24 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.answerMode"
                :options="[
                  { value: '1', text: '수동연결' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth25 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.recordControl"
                :options="[
                  { value: '1', text: '자동녹음' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth26 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox1 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox2 }}</BFormCheckbox>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth27 }}</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">{{ lang.checkbox3 }}</BFormCheckbox>
                <BFormCheckbox value="2">{{ lang.checkbox4 }}</BFormCheckbox>
              </div>
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
// 모달 폼 데이터 및 옵션 선언 (에러 방지)
const formData = reactive({
  deviceType: null,
  model: null,
});

import { ref, onMounted, computed, watch, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'
import UiModal from '@/components/UiModal.vue'

const ko = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
  searchSelect: '전체 선택/해제',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',
  filterDeviceName: '장치명',
  filterRadioSilence: '무선침묵권한',
  filterLocation: '위치(구역)',
  filterStatus: '상태',

  btnRegister: '등록',
  btnBulkRegister: '일괄등록',
  btnDelete: '삭제',
  btnCancel: '최소',
  btnSave: '저장',
  btnAdd: '추가',

  colSelect: '선택',
  colNumber: 'No',
  colLocation: '위치(구역)',
  colDeviceName: '장치명',
  colRadioSilence: '무선침묵',
  colAlarmAuth: '경보권한',
  colBroadcastAuth: '방송권한',
  colMuteAuth: 'Mute권한',
  colExtensionNo: '내선번호',
  colStatus: '상태',
  colIpAddress: 'IP Address',
  colL2Switch: 'L2 스위치',
  colSerial: 'Serial No',
  thead1: '검색대상',
  thead2: '검색어',
  thead3: '무선침묵권한',
  thead4: '상태',
  modalTitle1: '사용자단말 정보 수정',
  modalTitle2: '점대점 통화',
  modalTitle3: '점대점 연결 등록',

  modalth1: '모델명',
  modalth2: '스피커볼륨',
  modalth3: '장치명',
  modalth4: '헤드셋볼륨',
  modalth5: '설명/비고',
  modalth6: '화면밝기',
  modalth7: '시리얼 번호',
  modalth8: '벨소리',
  modalth9: '점대점',
  modalth10: '가입자정보 (내선번호)',
  modalth11: '회의통화',
  modalth12: '그룹통화',
  modalth13: '무선침묵 설정',
  modalth14: '자동연결 대기시간(초)',
  modalth15: 'L2 스위치',
  modalth16: '무선채널 최대할당 개수',
  modalth17: '경보권한',
  modalth18: '방송권한',
  modalth19: 'Muting-Relay 기능',
  modalth20: '모델명',

  modalth21: '피호출 사용자단말',
  modalth22: '통화기능키 레이블',
  modalth23: '통화모드',
  modalth24: '응답모드',
  modalth25: '녹음제어',
  modalth26: '스피커 출력방향',
  modalth27: '호출알림',

  checkbox1: '왼쪽',
  checkbox2: '오른쪽',
  checkbox3: '벨소리',
  checkbox4: '알림등',
}
const en = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
  searchSelect: '전체 선택/해제',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',
  filterDeviceName: '장치명',
  filterRadioSilence: '무선침묵권한',
  filterLocation: '위치(구역)',
  filterStatus: '상태',

  btnRegister: '등록',
  btnBulkRegister: '일괄등록',
  btnDelete: '삭제',
  btnCancel: '최소',
  btnSave: '저장',
  btnAdd: '추가',

  colSelect: '선택',
  colNumber: 'No',
  colLocation: '위치(구역)',
  colDeviceName: '장치명',
  colRadioSilence: '무선침묵',
  colAlarmAuth: '경보권한',
  colBroadcastAuth: '방송권한',
  colMuteAuth: 'Mute권한',
  colExtensionNo: '내선번호',
  colStatus: '상태',
  colIpAddress: 'IP Address',
  colL2Switch: 'L2 스위치',
  colSerial: 'Serial No',
  thead1: '검색대상',
  thead2: '검색어',
  thead3: '무선침묵권한',
  thead4: '상태',
  modalTitle1: '사용자단말 정보 수정',
  modalTitle2: '점대점 통화',
  modalTitle3: '점대점 연결 등록',

  modalth1: '모델명',
  modalth2: '스피커볼륨',
  modalth3: '장치명',
  modalth4: '헤드셋볼륨',
  modalth5: '설명/비고',
  modalth6: '화면밝기',
  modalth7: '시리얼 번호',
  modalth8: '벨소리',
  modalth9: '점대점',
  modalth10: '가입자정보 (내선번호)',
  modalth11: '회의통화',
  modalth12: '그룹통화',
  modalth13: '무선침묵 설정',
  modalth14: '자동연결 대기시간(초)',
  modalth15: 'L2 스위치',
  modalth16: '무선채널 최대할당 개수',
  modalth17: '경보권한',
  modalth18: '방송권한',
  modalth19: 'Muting-Relay 기능',
  modalth20: '모델명',

  modalth21: '피호출 사용자단말',
  modalth22: '통화기능키 레이블',
  modalth23: '통화모드',
  modalth24: '응답모드',
  modalth25: '녹음제어',
  modalth26: '스피커 출력방향',
  modalth27: '호출알림',

  checkbox1: '왼쪽',
  checkbox2: '오른쪽',
  checkbox3: '벨소리',
  checkbox4: '알림등',
}
const lang = ref({})

// 모달 상태
const modals = reactive({
  modalTerminalModify: { show: false },
  modalPointSetting: { show: false },
  modalModify1: { show: false },
})
function openModify1() {
  modals.modalModify1.show = true;
}
const ppButtons = [
  'HLCPTR CONTRC', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
  'HLCPTR CONTRM', 'HLCPTR CONTRM', 'HLCPTR CONTRM',
];

// 폼 상태
const searchWord = ref('')
const filterText = ref('')
const searchField = ref('')
const searchText = ref('')
const deviceType = ref(null)
const searchTarget = ref(null)
const selectOptions = []

// 장치 목록 샘플 데이터 40개 생성 (테스트용)
const items = ref(generateItems(40))

function onRowClicked() {
  modals.modalTerminalModify.show = true;
}

// 샘플데이터 생성 함수
function generateItems(n) {
  const statuses = ['정상', '정상(통화중)', '비정상']
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = (i - 1)
    arr.push({
      id: i,
      number: String(i),
      location: '위치내용',
      deviceName: '장치명내용',
      radioSilence: 'O',
      alarmAuth:'O',
      broadcastAuth: 'O',
      muteAuth:'O',
      extensionNo: `${3000 + i}`,
      status: statuses[idx % statuses.length],
      ipAddress: `192.168.${Math.floor(idx / 254) + 1}.${(idx % 254) + 1}`,
    })
  }
  return arr
}

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

const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'number', label: lang.value.colNumber, thStyle: { width: '5rem' } },
  { key: 'location', label: lang.value.colLocation, thStyle: { width: 'auto' } },
  { key: 'deviceName', label: lang.value.colDeviceName, thStyle: { width: 'auto' } },
  { key: 'radioSilence', label: lang.value.colRadioSilence, thStyle: { width: '7rem' } },
  { key: 'alarmAuth', label: lang.value.colAlarmAuth, thStyle: { width: '7rem' } },
  { key: 'broadcastAuth', label: lang.value.colBroadcastAuth, thStyle: { width: '7rem' } },
  { key: 'muteAuth', label: lang.value.colMuteAuth, thStyle: { width: '7rem' } },
  { key: 'extensionNo', label: lang.value.colExtensionNo, thStyle: { width: '6rem' } },
  { key: 'status', label: lang.value.colStatus, thStyle: { width: '9rem' }, tdClass: (value, key, item) => item.status === '비정상' ? 'red' : '' },
  { key: 'ipAddress', label: lang.value.colIpAddress, thStyle: { width: '10rem' } },
]);

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchType = !searchField.value || item.location === searchField.value
    const matchText = !searchText.value || (item.location && item.location.includes(searchText.value))
    return matchType && matchText
  })
})

const currentPage = ref(1)
const perPage = ref(10)
const perPageOptions = [
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' },
]
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

// 페이지당 개수 변경 시 첫 페이지로 이동
watch(perPage, () => {
  currentPage.value = 1
})

function onFilter() {
  searchField.value = searchWord.value
  searchText.value = filterText.value
  currentPage.value = 1
}

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
})
</script>
