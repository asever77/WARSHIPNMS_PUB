<template>
  <div class="base-wrap">
    <div class="search-base">
      <div class="search-base--form">
        <!-- 장치유형 기준 선택 -->
        <BFormGroup :label="lang.text2" label-for="search-deviceType">
          <BFormSelect
            id="search-deviceType"
            class="ui-select-28"
            v-model="filterField"
            :options="filterFieldOptions"
          />
        </BFormGroup>

        <!-- 장비명 기준 선택 -->
        <BFormGroup :label="lang.text3" label-for="search-deviceName">
          <BFormSelect
            id="search-deviceName"
            class="ui-select-28"
            v-model="filterField2"
            :options="filterFieldOptions2"
          />
        </BFormGroup>

        <!-- 검색어 입력 -->
        <BFormGroup :label="lang.text10" label-for="search-word">
          <BFormInput
            id="search-word"
            v-model="filterText"
            :placeholder="lang.text11"
            class="ui-input-28"
          />
        </BFormGroup>
      </div>
      <div class="search-base--btns">
        <BButton class="blue28" @click="onFilter">
          {{ lang.text9 }}
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
          <BButton class="gray24 min-w-0" :href="data.item.download" target="_blank">{{ lang.text5 }}</BButton>
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
    <BButton class="blue28" @click="modals.modalName.show = true">{{ lang.text7 }}</BButton>
    <BButton class="gray28">{{ lang.text8 }}</BButton>
  </div>

  <UiModal v-model="modals.modalName.show" :title="lang.text13" type="modal" size="sm" @close-btn-click="modals.modalName.show = false">
    <table class="table-type-a">
      <colgroup>
        <col style="width:10rem">
        <col style="width:auto">
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">{{ lang.text2 || '장치유형' }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.deviceType"
              :options="deviceTypeOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.text15 || '장치 모델명' }}</th>
          <td>
            <BFormInput
              class="ui-input"
              v-model="formData.modelName"
              placeholder=""
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.text16 || 'FILE' }}</th>
          <td>
            <BFormFile
              class="ui-input"
              v-model="formData.file"
              :placeholder="lang.text14 || '파일 선택'"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <template #footer>
      <BButton class="gray28" @click="modals.modalName.show = false">{{ lang.text17 || '취소' }}</BButton>
      <BButton class="blue28">{{ lang.text18 || '저장' }}</BButton>
    </template>
  </UiModal>

</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import UiModal from '@/components/UiModal.vue'
import { BTable, BButton, BFormCheckbox, BFormInput, BFormGroup, BFormSelect, BPagination, BFormFile } from 'bootstrap-vue-next';

import G from "@/config/global.js";

const ko = {
  "text1": "매뉴얼 내용",
  "text2": "장치유형",
  "text3": "장비명",
  "text4": "파일명",
  "text5": "다운로드",
  "text6": "업로드일시",
  "text7": "등록",
  "text8": "삭제",
  "text9": "조회",
  "text10": "검색어",
  "text11": "검색어 입력",
  "text12": "전체",
  "text13": "메뉴얼 등록",
  "text14": "파일 선택",
  "text15": "장치 모델명",
  "text16": "FILE",
  "text17": "취소",
  "text18": "저장",
};

const en = {
  "text1": "Manual Content",
  "text2": "Device Type",
  "text3": "Device Name",
  "text4": "File Name",
  "text5": "Download",
  "text6": "Upload Date",
  "text7": "Register",
  "text8": "Delete",
  "text9": "Search",
  "text10": "Search Word",
  "text11": "Enter search word",
  "text12": "All",
  "text13": "Register Manual",
  "text14": "Choose File",
  "text15": "Device Model Name",
  "text16": "FILE",
  "text17": "Cancel",
  "text18": "Save",
};

const lang = ref({});

const modals = reactive({
  modalName: { show: false },
})

// 모달 폼 데이터
const formData = reactive({
  deviceType: null,
  modelName: '',
  file: null
})

// 장치유형 옵션
const deviceTypeOptions = computed(() => [
  { value: null, text: lang.value.text12 || '선택하세요' },
  { value: '무전기', text: '무전기' },
  { value: '서버', text: '서버' },
  { value: '센서', text: '센서' },
  { value: '컨트롤러', text: '컨트롤러' }
])

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
  { key: 'deviceType', label: lang.value.text2 || '장치유형', thStyle: { width: '20rem' }, tdClass: 'text-start' },
  { key: 'deviceName', label: lang.value.text3 || '장비명', tdClass: 'text-start'},
  { key: 'fileName', label: lang.value.text4 || '파일명', tdClass: 'text-start' },
  { key: 'download', label: lang.value.text5 || '다운로드', thStyle: { width: '10rem' } },
  { key: 'uploadDate', label: lang.value.text6 || '업로드일시', thStyle: { width: '18rem' } }
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
    { value: '', text: lang.value.text12 || '전체' },
    ...uniqueTypes.map(type => ({ value: type, text: type }))
  ]
});

const filterFieldOptions2 = computed(() => {
  const types = items.value.map(item => item.deviceName)
  const uniqueNames = [...new Set(types)]
  return [
    { value: '', text: lang.value.text12 || '전체' },
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
