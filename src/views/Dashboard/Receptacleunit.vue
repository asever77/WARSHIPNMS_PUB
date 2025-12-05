<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 11rem" />
      <col style="width: auto" />
      <col style="width: 11rem" />
      <col style="width: auto" />
      <col style="width: 11rem" />
      <col style="width: auto" />
      <col style="width: 11rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          {{ lang.filterDeviceName }}
          <BButton class="btn-sort" aria-sort="none" :aria-label="`${lang.filterDeviceName} ${lang.sortAll}`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            v-model="deviceType"
            :options="selectOptions"
          ></BFormSelect>
        </td>

        <th scope="row">
          {{ lang.filterModel }}
          <BButton class="btn-sort" aria-sort="descending" :aria-label="`${lang.filterModel} ${lang.sortAll}`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="selectOptions"
          ></BFormSelect>
        </td>

        <th scope="row">
          {{ lang.filterLocation }}
          <BButton class="btn-sort" aria-sort="descending" :aria-label="`${lang.filterLocation} ${lang.sortAll}`"></BButton>
        </th>
        <td>
          <BFormInput id="search-word" class="ui-input" v-model="searchWord" placeholder=""></BFormInput>
        </td>

        <th scope="row">
          {{ lang.filterStatus }}
          <BButton class="btn-sort" aria-sort="descending" :aria-label="`${lang.filterStatus} ${lang.sortAll}`"></BButton>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="selectOptions"
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
            <button type="button" class="btn-search-icon" aria-label="검색" @click="onFilter" />
          </div>
        </BFormGroup>
        <BFormSelect
          id="search-category"
          class="ui-select-28"
          v-model="searchCategory"
          :options="detailOptions"
        ></BFormSelect>
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
    <BButton class="blue28">{{ lang.btnRegister }}</BButton>
    <BButton class="blue28">{{ lang.btnBulkRegister }}</BButton>
    <BButton class="gray28">{{ lang.btnDelete }}</BButton>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'

const ko = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',
  filterDeviceName: '장치아이디',
  filterModel: '모델명',
  filterLocation: '위치(구역)',
  filterStatus: '상태',
  btnRegister: '등록',
  btnBulkRegister: '일괄등록',
  btnDelete: '삭제',
  colSelect: '선택',
  colNumber: 'No',
  colLocation: '위치(구역)',
  colDeviceName: '장치명',
  colModel: '모델명',
  colAlarmAuth: '경보권한',
  colBroadcastAuth: '방송권한',
  colMuteAuth: 'Mute권한',
  colExtensionNo: '내선번호',
  colStatus: '상태',
  colIpAddress: 'IP Address',
  colL2Switch: 'L2 스위치',
  colSerial: 'Serial No',
}
const en = {
  sortAll: 'Sort All',
  searchLabel: 'Search',
  searchPlaceholder: 'Enter search term',
  totalLabel: 'Total',
  btnSearch: 'Search',
  filterDeviceName: 'Device ID',
  filterModel: 'Model Name',
  filterLocation: 'Location(Area)',
  filterStatus: 'Status',
  btnRegister: 'Register',
  btnBulkRegister: 'Bulk Register',
  btnDelete: 'Delete',
  colSelect: 'Select',
  colNumber: 'No',
  colLocation: 'Location(Area)',
  colDeviceName: 'Device Name',
  colModel: 'Model Name',
  colAlarmAuth: 'Alarm Auth',
  colBroadcastAuth: 'Broadcast Auth',
  colMuteAuth: 'Mute Auth',
  colExtensionNo: 'Extension No',
  colStatus: 'Status',
  colIpAddress: 'IP Address',
  colL2Switch: 'L2 Switch',
  colSerial: 'Serial No',
}

const lang = ref({})

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

function generateItems(n) {
  const locations = ['후부장교실', '전방장교실', '기관실', '함교', '작전실']
  const statuses = ['정상', '정상(통화중)', '비정상']
  const models = ['Model-A', 'Model-B', 'Model-C', 'Model-D']
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = (i - 1)
    arr.push({
      id: i,
      number: String(i),
      location: locations[idx % locations.length],
      deviceName: `Receptacle-${String(i).padStart(3, '0')}`,
      radioSilence: models[idx % models.length],
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
  { key: 'select', label: lang.value.colSelect, thStyle: { width: '3rem' } },
  { key: 'number', label: lang.value.colNumber, thStyle: { width: '5rem' } },
  { key: 'location', label: lang.value.colLocation, sortable: true, thStyle: { width: 'auto' } },
  { key: 'deviceName', label: lang.value.colDeviceName, sortable: true, thStyle: { width: 'auto' } },
  { key: 'radioSilence', label: lang.value.colModel, thStyle: { width: 'auto' } },
  { key: 'extensionNo', label: lang.value.colExtensionNo, thStyle: { width: '8rem' } },
  { key: 'status', label: lang.value.colStatus, thStyle: { width: '9rem' }, tdClass: (value, key, item) => item.status === '비정상' ? 'error' : '' },
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
const detailOptions = [
  { value: 1, text: '기본정보' },
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
