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
            <span class="ui-flex-1">{{ lang.filterDeviceName }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="none" :aria-label="`${lang.filterDeviceName} ${lang.sortAll}`"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            :options="[{
              value: '1',
              text: '전체',
            }]"
          ></BFormSelect>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filterLocation }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" :aria-label="`${lang.filterLocation} ${lang.sortAll}`"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
           :options="[{
              value: '1',
              text: '전체',
            }]"
          ></BFormSelect>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filterRadioSilence }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" :aria-label="`${lang.filterRadioSilence} ${lang.sortAll}`"></BButton>
          </div>
        </th>
        <td>

          <BFormInput id="search-word" class="ui-input" v-model="searchWord" placeholder=""></BFormInput>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filterStatus }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" :aria-label="`${lang.filterStatus} ${lang.sortAll}`"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            :options="[{
              value: '1',
              text: '전체',
            }]"
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
        <span class="search-total">{{ lang.onlineLabel || 'Online' }}:36</span>
        <span class="search-total">{{ lang.offlineLabel || 'Offline' }}:177</span>
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
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive>
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
    <BButton class="blue28" @click="modals.modalRegister.show = true">{{ lang.btnRegister }}</BButton>
    <BButton class="blue28">{{ lang.btnBulkRegister }}</BButton>
    <BButton class="gray28">{{ lang.btnDelete }}</BButton>
  </div>

  <UiModal
    v-model="modals.modalRegister.show"
    :title="lang.modalRegisterTitle || '리셉터클유닛 등록'"
    type="modal"
    size="lg"
    @close-btn-click="modals.modalRegister.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.filterLocation }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: 'MC700',}
                ]"
              />
            </td>
            <th scope="row">{{ lang.colIpAddress }}</th>
            <td>
              <BFormInput type="number" value="192.239.12.2" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.filterDeviceName }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row">{{ lang.colSubnetMask || 'Subnet Mask' }}</th>
            <td>
              <BFormInput type="number" value="255.255.255.0" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.colDescription || '설명/비고' }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row">{{ lang.colDefaultGateway || 'Default Gateway' }}</th>
            <td>
              <BFormInput type="number" value="192.239.12.1" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.colSerial }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row">{{ lang.colHeadsetVolume || '헤드셋볼륨' }}</th>
            <td>
              <BFormInput type="number" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.colExtensionNo }}</th>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row">{{ lang.colAutoConnectWait || '자동연결 대기시간(초)' }}</th>
            <td>
              <BFormInput type="number" />
            </td>
          </tr>

          <tr>
            <th scope="row" rowspan="2">{{ lang.filterRadioSilence }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: 'ON',}
                ]"
              />
            </td>
            <th scope="row"></th>
            <td></td>
          </tr>

          <tr>
            <td>
              <BFormInput type="text" />
            </td>
            <th scope="row"></th>
            <td></td>
          </tr>

          <tr>
            <th scope="row">{{ lang.colL2Switch }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  {value: '1', text: '무선통신기시스템',}
                ]"
              />
            </td>
            <th scope="row"></th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalRegister.show = false">{{ lang.btnCancel || '취소' }}</BButton>
      <BButton class="blue28">{{ lang.btnSave || '저장' }}</BButton>
    </template>
  </UiModal>
</template>

<script setup>
// 모달 폼 데이터 및 옵션 선언 (에러 방지)

import { ref, onMounted, computed, watch, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'
import UiModal from '@/components/UiModal.vue'

const ko = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
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
}
const en = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
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
}
const lang = ref({})

// 모달 상태
const modals = reactive({
  modalRegister: { show: false },
})


// 폼 상태
const searchWord = ref('')
const filterText = ref('')
const searchField = ref('')
const searchText = ref('')

// 장치 목록 샘플 데이터 40개 생성 (테스트용)
const items = ref(generateItems(40))

function generateItems(n) {
  const locations = ['후부장교실', '전방장교실', '기관실', '함교', '작전실']
  const statuses = ['정상', '정상(통화중)', '비정상']
  const l2Switches = ['L2SW-01', 'L2SW-02', 'L2SW-03']
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = (i - 1)
    arr.push({
      id: i,
      number: String(i),
      location: locations[idx % locations.length],
      deviceName: `Terminal-${String(i).padStart(3, '0')}`,
      radioSilence: '모델명이름',
      alarmAuth: '시리얼넘버',
      extensionNo: `${3000 + i}`,
      status: statuses[idx % statuses.length],
      ipAddress: `192.168.${Math.floor(idx / 254) + 1}.${(idx % 254) + 1}`,
      l2Switch: l2Switches[idx % l2Switches.length],
      serial: `SN-${String(i).padStart(6, '0')}`,
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
  { key: 'number', label: 'No', thStyle: { width: '5rem' } },
  { key: 'location', label: '위치(구역)', thStyle: { width: 'auto' } },
  { key: 'deviceName', label: '장치명', thStyle: { width: 'auto' } },
  { key: 'radioSilence', label: '모델명', thStyle: { width: 'auto' } },
  { key: 'alarmAuth', label: 'Serial No', thStyle: { width: '12rem' } },
  { key: 'extensionNo', label: '내선번호', thStyle: { width: '6rem' } },
  { key: 'status', label: '상태', thStyle: { width: '9rem' }, tdClass: (value, key, item) => item.status === '비정상' ? 'red' : '' },
  { key: 'ipAddress', label: 'IP Address', thStyle: { width: '10rem' } },
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
