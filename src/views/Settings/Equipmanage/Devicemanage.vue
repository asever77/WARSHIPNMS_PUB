<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 13rem" />
      <col style="width: 16.5rem" />
      <col style="width: 13rem" />
      <col style="width: 16.5rem" />
      <col style="width: 13rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          {{ lang.filterDeviceType }}
          <BButton class="btn-sort" aria-sort="none" :aria-label="`${lang.filterDeviceType} 전체 정렬`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            v-model="deviceType"
            :options="selectOptions"
          ></BFormSelect>
        </td>
        <th scope="row">{{ lang.filterSearchTarget }}
          <BButton class="btn-sort" aria-sort="descending" :aria-label="`${lang.filterSearchTarget} 전체 정렬`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="selectOptions"
          ></BFormSelect>
        </td>
        <th scope="row">{{ lang.filterSearchWord }}</th>
        <td>
          <BFormInput id="search-word" class="ui-input" v-model="searchWord" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.filterRegDate }}
          <BButton class="btn-sort" aria-sort="ascending" :aria-label="`${lang.filterRegDate} 전체 정렬`"></BButton>
        </th>
        <td colspan="5">
          <div class="ui-flex" data-item-align="center" data-gap="4" style="width: 20rem;">
            <BFormInput
              id="reg-date-start"
              class="ui-input"
              v-model="regDateStart"
              placeholder=""
              type="datetime-local"
            ></BFormInput>
            ~
            <BFormInput
              id="reg-date-end"
              class="ui-input"
              v-model="regDateEnd"
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
        <!-- 검색어 입력 -->
        <BFormGroup :label="lang.searchLabel" label-for="search-word-2">
          <div class="ui-search-with-btn">
            <BFormInput
              id="search-word-2"
              v-model="filterText"
              :placeholder="lang.searchPlaceholder"
              class="ui-input-28"
            />
            <button type="button" class="btn-search-icon" aria-label="검색" @click="onFilter" />
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
    <BButton class="blue28">{{ lang.btnRegister }}</BButton>
    <BButton class="gray28">{{ lang.btnDelete }}</BButton>
  </div>

  <!-- modal 장치 수정 -->
  <UiModal v-model="modals.modalName.show" :title="lang.modalTitleEdit" type="modal" size="lg" @close-btn-click="modals.modalName.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalDeviceType }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.deviceType"
                :options="deviceTypeOptions"
                disabled
              />
            </td>
            <th scope="row">{{ lang.modalModel }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.model"
                :options="modelOptions"
                disabled
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <thead>
        <tr>
          <th scope="col" colspan="2">{{ lang.thead5 }}</th>
          <th scope="col" colspan="2">{{ lang.thead6 }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">{{ lang.modalDeviceName }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.deviceName"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
          <th scope="row">{{ lang.modalDescription }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalGrade }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.grade"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
          <th scope="row">{{ lang.modalSerial }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.serialNumber"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalLocation }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.location"
              :options="locationOptions"
            />
          </td>
          <th scope="row">{{ lang.modalLocationDetail }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.locationDetail"
              :options="locationDetailOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalL2Switch }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.l2Switch"
              :options="l2SwitchOptions"
            />
          </td>
          <th scope="row">{{ lang.modalIpAddress }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.ipAddress"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.modalCardCount }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.cardCount"
              :options="cardCountOptions"
            />
          </td>
          <th scope="row"></th>
          <td></td>
        </tr>
        </tbody>
      </table>

      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:30rem">
        </colgroup>
        <thead>
        <tr>
          <th scope="col">{{ lang.thead1 }}</th>
          <th scope="col">{{ lang.thead2 }}</th>
          <th scope="col">{{ lang.thead3 }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">P01</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.portType1"
              :options="portTypeOptions1"
            />
          </td>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.portLabel"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        </tbody>
      </table>

      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <thead>
        <tr>
          <th scope="col" colspan="4">{{ lang.thead4 }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">{{ lang.modalServerTYpe }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.portType1"
              :options="portTypeOptions1"
            />
          </td>
          <th scope="row">System IP(VIP)</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.portLabel"
              placeholder=""
              value="192.16.0.25"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalName.show = false">{{ lang.btnCancel }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'
import UiModal from '@/components/UiModal.vue'


const ko = {
  // 필터 영역
  filterDeviceType: '장치유형',
  filterSearchTarget: '검색대상',
  filterSearchWord: '검색어',
  filterRegDate: '등록일',

  // 검색 영역
  searchLabel: '검색어',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',

  // 버튼
  btnSearch: '조회',
  btnRegister: '등록',
  btnDelete: '삭제',
  btnSave: '저장',
  btnCancel: '취소',

  // 테이블 헤더
  colSelect: '선택',
  colNumber: '순번',
  colDeviceType: '장치유형',
  colModel: '모델',
  colDeviceName: '장치명',
  colGrade: '등급',
  colSerial: '시리얼번호',
  colLocation: '위치',
  colRegDate: '등록일',

  // 모달
  modalTitleEdit: '장치 수정',
  modalDeviceType: '장치유형',
  modalModel: '모델명',
  modalDeviceName: '장치명',
  modalDescription: '장비설명',
  modalGrade: '설명/비고',
  modalSerial: '시리얼번호',
  modalLocation: '위치',
  modalLocationDetail: '위치상세',
  modalL2Switch: 'L2 스위치',
  modalIpAddress: 'IP Address',
  modalCardCount: '카드갯수',
  modalServerTYpe: '서버타입',

  // 옵션
  optionSelect: '선택하세요',
  optionAdmin: 'Admin',
  optionManager: 'Manager',

  // thead
  thead1:'포트 식별자',
  thead2:'포트 인터페이스 유형',
  thead3:'레이블',
  thead4:'VoIP교환기 속성',
  thead5:'VoIP 교환기 1',
  thead6:'VoIP 교환기 2',
}

const en = {
  // Filter area
  filterDeviceType: 'Device Type',
  filterSearchTarget: 'Search Target',
  filterSearchWord: 'Search Word',
  filterRegDate: 'Registration Date',

  // Search area
  searchLabel: 'Search',
  searchPlaceholder: 'Enter search term',
  totalLabel: 'Total',

  // Buttons
  btnSearch: 'Search',
  btnRegister: 'Register',
  btnDelete: 'Delete',
  btnSave: 'Save',
  btnCancel: 'Cancel',

  // Table headers
  colSelect: 'Select',
  colNumber: 'No.',
  colDeviceType: 'Device Type',
  colModel: 'Model',
  colDeviceName: 'Device Name',
  colGrade: 'Grade',
  colSerial: 'Serial Number',
  colLocation: 'Location',
  colRegDate: 'Reg. Date',

  // Modal
  modalTitleEdit: 'Edit Device',
  modalDeviceType: 'Device Type',
  modalModel: 'Model Name',
  modalDeviceName: 'Device Name',
  modalDescription: 'Device Description',
  modalGrade: 'Description/Remarks',
  modalSerial: 'Serial Number',
  modalLocation: 'Location',
  modalLocationDetail: 'Location Detail',
  modalL2Switch: 'L2 Switch',
  modalIpAddress: 'IP Address',
  modalCardCount: 'Card Count',
  modalServerTYpe: 'Server TYpe',

  // Options
  optionSelect: 'Please Select',
  optionAdmin: 'Admin',
  optionManager: 'Manager',

  // thead
  thead1:'Port Identifier',
  thead2:'Port Interface Type',
  thead3:'Labels',
  thead4:'VoIP Exchange Properties',
  thead5:'VoIP Switchboard 1',
  thead6:'VoIP Switchboard 2',
}

const lang = ref({})

// 수정 모달 상태
const modals = reactive({ modalName: { show: false } })
const formData = reactive({ deviceType: '', model: '' })
const deviceTypeOptions = computed(() => [{ value: formData.deviceType, text: formData.deviceType }])
const modelOptions = computed(() => [{ value: formData.model, text: formData.model }])


// 폼 상태
const searchWord = ref('')
const regDateStart = ref('')
const regDateEnd = ref('')
const filterText = ref('')
const searchField = ref('')

// 셀렉트 상태
const deviceType = ref(null)
const searchTarget = ref(null)
const selectOptions = computed(() => [
  { value: null, text: lang.value.optionSelect ?? '' },
  { value: 'a', text: lang.value.option1 ?? '' },
  { value: 'b', text: lang.value.option2 ?? '' },
])

// 장치 목록 샘플 데이터 40개 생성 (테스트용)
const items = ref(generateItems(40))

function generateItems(n) {
  const types = ['라우터', '스위치', '무전기', '중계기']
  const models = ['RTX-1000', 'SW-48P', 'VX-500', 'RG-200']
  const grades = ['A', 'B', 'C']
  const locations = ['후부장교실', '후부장교실2']
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = (i - 1)
    const day = String((idx % 28) + 1).padStart(2, '0')
    const hour = String((idx % 24)).padStart(2, '0')
    const minute = String((idx % 60)).padStart(2, '0')
    arr.push({
      id: i,
      number: String(n - i + 1),
      deviceType: types[idx % types.length],
      model: models[idx % models.length],
      deviceName: `${types[idx % types.length]}-${i}`,
      grade: grades[idx % grades.length],
      serial: `SN-${String(i).padStart(4, '0')}`,
      location: locations[idx % locations.length],
      regDate: `2025-11-${day} ${hour}:${minute}`,
    })
  }
  return arr
}

const selectedIds = ref([])

// 테이블 필드: 선택,순번,장치유형,모델,장치명,등급,시리얼번호,위치,등록일
// 정렬 추가: 장치유형,모델,장치명,등급,위치,등록일
const fields = computed(() => [
  { key: 'select', label: lang.value.colSelect, thStyle: { width: '5rem' } },
  { key: 'number', label: lang.value.colNumber, thStyle: { width: '8rem' } },
  { key: 'deviceType', label: lang.value.colDeviceType, sortable: true, thStyle: { width: '12rem' } },
  { key: 'model', label: lang.value.colModel, sortable: true, thStyle: { width: '12rem' } },
  { key: 'deviceName', label: lang.value.colDeviceName, sortable: true, thStyle: { width: '14rem' } },
  { key: 'grade', label: lang.value.colGrade, sortable: true, thStyle: { width: '10rem' } },
  { key: 'serial', label: lang.value.colSerial, thStyle: { width: '15rem' } },
  { key: 'location', label: lang.value.colLocation, sortable: true, thStyle: { width: 'auto' } },
  { key: 'regDate', label: lang.value.colRegDate, sortable: true, thStyle: { width: '14rem' } },
])

// 사용여부 라디오 삭제 (스키마 변경으로 미사용)

// 실제 검색에 사용되는 값
const filterField = ref('')
const searchText = ref('')

const filterFieldOptions = computed(() => {
  const types = items.value.map(item => item.location)
  const uniqueTypes = [...new Set(types)]
  return [
    { value: '', text: '근무지' },
    ...uniqueTypes.map(type => ({ value: type, text: type }))
  ]
});


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

// 테이블 행 클릭 시 모달 열고 데이터 채우기
function onRowClicked(item, index, event) {
  if (!item) return;
  formData.deviceType = item.deviceType || ''
  formData.model = item.model || ''
  modals.modalName.show = true
}

function onFilter() {
  searchField.value = filterField.value
  searchText.value = filterText.value
  currentPage.value = 1
}


onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  if (filterFieldOptions.value.length > 0) {
    filterField.value = filterFieldOptions.value[0].value;
  }
})
</script>

