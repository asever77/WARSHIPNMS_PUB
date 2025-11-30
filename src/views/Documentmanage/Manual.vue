<template>
  <div class="base-wrap">
    <div class="search-base">
      <div class="search-base--form">
        <!-- 장치유형 기준 선택 -->
        <BFormGroup label="장치유형" label-for="search-deviceType">
          <BFormSelect
            id="search-deviceType"
            v-model="filterField"
            :options="filterFieldOptions"
          />
        </BFormGroup>

        <!-- 장비명 기준 선택 -->
        <BFormGroup label="장비명" label-for="search-deviceName">
          <BFormSelect
            id="search-deviceName"
            v-model="filterField2"
            :options="filterFieldOptions2"
          />
        </BFormGroup>

        <!-- 검색어 입력 -->
        <BFormGroup label="검색어" label-for="search-word">
          <BFormInput
            id="search-word"
            v-model="filterText"
            placeholder="검색어 입력"
          />
        </BFormGroup>
      </div>
      <div class="search-base--btns">
        <BButton variant="primary" @click="onFilter">
          조회
        </BButton>
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
      >
        <template #cell(select)="data">
          <BFormCheckbox
            v-model="selectedIds"
            :value="data.item.id"
          />
        </template>
        <template #cell(download)="data">
          <BButton size="sm" :href="data.item.download" target="_blank">다운로드</BButton>
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

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { BTable, BButton, BFormCheckbox, BFormInput, BFormGroup, BFormSelect, BPagination } from 'bootstrap-vue-next'

import G from "@/config/global.js";

const ko = {
  "title": "매뉴얼 내용",
  "title_deviceType": "장치유형",
  "title_deviceName": "장비명",
  "title_fileName": "파일명",
  "title_download": "다운로드",
  "title_uploadDate": "업로드일시"
};

const en = {
  "title": "Manual Content",
  "title_deviceType": "Device Type",
  "title_deviceName": "Device Name",
  "title_fileName": "File Name",
  "title_download": "Download",
  "title_uploadDate": "Upload Date"
};

const lang = ref({});

// --- 데이터 ---
const items = ref([
  { id: 1, deviceType: '무전기', deviceName: 'A장비', fileName: 'manual1.pdf', download: '/download/manual1.pdf', uploadDate: '2025-11-30 10:00' },
  { id: 2, deviceType: '서버', deviceName: 'B장비', fileName: 'manual2.pdf', download: '/download/manual2.pdf', uploadDate: '2025-11-29 14:20' },
  { id: 3, deviceType: '센서', deviceName: 'C장비', fileName: 'manual3.pdf', download: '/download/manual3.pdf', uploadDate: '2025-11-28 09:15' },
  { id: 4, deviceType: '컨트롤러', deviceName: 'D장비', fileName: 'manual4.pdf', download: '/download/manual4.pdf', uploadDate: '2025-11-27 16:45' },
])

const selectedIds = ref([])

const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '4rem' } },
  { key: 'deviceType', label: lang.value.title_deviceType || '장치유형', thStyle: { width: '20rem' }, tdClass: 'text-start' },
  { key: 'deviceName', label: lang.value.title_deviceName || '장비명', tdClass: 'text-start'},
  { key: 'fileName', label: lang.value.title_fileName || '파일명', tdClass: 'text-start' },
  { key: 'download', label: lang.value.title_download || '다운로드', thStyle: { width: '8rem' } },
  { key: 'uploadDate', label: lang.value.title_uploadDate || '업로드일시', thStyle: { width: '18rem' } }
])

const filterField = ref('')
const filterField2 = ref('')
const filterText = ref('')

// 실제 검색에 사용되는 값
const searchField = ref('')
const searchField2 = ref('')
const searchText = ref('')

const filterFieldOptions = computed(() => {
  const types = items.value.map(item => item.deviceType)
  const uniqueTypes = [...new Set(types)]
  return [
    { value: '', text: '전체' },
    ...uniqueTypes.map(type => ({ value: type, text: type }))
  ]
});

const filterFieldOptions2 = computed(() => {
  const types = items.value.map(item => item.deviceName)
  const uniqueNames = [...new Set(types)]
  return [
    { value: '', text: '전체' },
    ...uniqueNames.map(type => ({ value: type, text: type }))
  ]
});

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchType = !searchField.value || item.deviceType === searchField.value
    const matchName = !searchField2.value || item.deviceName === searchField2.value
    const matchText = !searchText.value ||
      item.deviceType.includes(searchText.value) ||
      item.deviceName.includes(searchText.value) ||
      item.fileName.includes(searchText.value)
    return matchType && matchName && matchText
  })
})

const currentPage = ref(1)
const perPage = ref(10)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  if (filterFieldOptions.value.length > 0) {
    filterField.value = filterFieldOptions.value[0].value;
  }
});

function onFilter() {
  searchField.value = filterField.value
  searchField2.value = filterField2.value
  searchText.value = filterText.value
  currentPage.value = 1
}

</script>
