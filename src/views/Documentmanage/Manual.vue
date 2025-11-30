<template>
  <div class="base-wrap">
    <div class="search-base">
      <!-- 장치유형 기준 선택 -->
      <BFormSelect
        v-model="filterField"
        :options="filterFieldOptions"
        size="sm"
        class="me-2"
      />
      <!-- 장치유형 기준 선택 -->
      <BFormSelect
        v-model="filterField2"
        :options="filterFieldOptions2"
        size="sm"
        class="me-2"
      />
      <!-- 검색어 입력 -->
      <BFormInput
        v-model="filterText"
        size="sm"
        placeholder="검색어 입력"
        class="me-2"
      />
      <BButton size="sm" variant="primary" @click="onFilter">
        조회
      </BButton>
      <BButton size="sm" variant="secondary" class="ms-2" @click="onReset">
        초기화
      </BButton>
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
            :total-rows="items.length"
            :per-page="perPage"
            aria-controls="manual-table"
          />
        </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { BTable, BButton, BFormCheckbox, BFormInput, BFormSelect, BPagination } from 'bootstrap-vue-next'

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
const filterFieldOptions = computed(() => {
  const types = items.value.map(item => item.deviceType)
  return [...new Set(types)].map(type => ({ value: type, text: type }))
});

const filterField2 = ref('')
const filterFieldOptions2 = computed(() => {
  const types = items.value.map(item => item.deviceName)
  return [...new Set(types)].map(type => ({ value: type, text: type }))
});

const currentPage = ref(1)
const perPage = ref(10)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return items.value.slice(start, start + perPage.value)
})

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  if (filterFieldOptions.value.length > 0) {
    filterField.value = filterFieldOptions.value[0].value;
  }
});
</script>
