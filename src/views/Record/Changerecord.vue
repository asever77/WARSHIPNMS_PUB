<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 16rem" />
      <col style="width: auto; min-width: 38.6rem" />
      <col style="width: 16rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
    <tr>
      <th scope="row">
        <div class="ui-flex" data-item-align="center" data-gap="4">
          <span class="ui-flex-1">{{ lang.search1 }}</span>
          <BButton
            class="btn-sort ui-shrink-0"
            aria-sort="none"
            :aria-label="`${lang.filterDeviceName} ${lang.sortAll}`"
          ></BButton>
        </div>
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
        <div class="ui-flex" data-item-align="center" data-gap="4">
          <span class="ui-flex-1">{{ lang.search2 }}</span>
          <BButton
            class="btn-sort ui-shrink-0"
            aria-sort="none"
            :aria-label="`${lang.filterSearchTarget} ${lang.sortAll}`"
          ></BButton>
        </div>
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
    <tr>
      <th scope="row">
        <div class="ui-flex" data-item-align="center" data-gap="4">
          <span class="ui-flex-1">{{ lang.search3 }}</span>
          <BButton
            class="btn-sort ui-shrink-0"
            aria-sort="none"
            :aria-label="`${lang.filterRegDate} ${lang.sortAll}`"
          ></BButton>
        </div>
      </th>
      <td colspan="3">
        <div
          class="ui-flex ui-data-box"
          data-item-align="center"
          data-gap="4"
          style="width: 20rem"
        >
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
            <button type="button" class="btn-search-icon" aria-label="검색" />
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
      <BTable
        :items="paginatedItems"
        :fields="fields"
        bordered
        small
        responsive
        data-type="clickable"
      >
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
import { ref, onMounted, computed, watch, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup, BPagination, BTable } from 'bootstrap-vue-next'

// 장치 목록 샘플 데이터 40개 생성 (테스트용)
const items = ref(generateItems(4))
function generateItems(n) {
  const arr = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      id: i,
      th1: String(i),
      th2: 'On Device',
      th3: '',
      th4: '무선통신기',
      th5: '마스트',
      th6: '88-856K 12335',
      th7: 'VenderSerialNumber=',
      th8: '2024-08-15 12:28:01',
      th9: '',
    })
  }
  return arr
}
const fields = computed(() => [
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: '10rem' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: '8rem' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: '10rem' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '8rem' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '12rem' } },
  { key: 'th7', label: lang.value.colTh7, thStyle: { width: '15rem' }, tdClass: 'ta-l' },
  { key: 'th8', label: lang.value.colTh8, thStyle: { width: '13.6rem' } },
  { key: 'th9', label: lang.value.colTh9, thStyle: { width: 'auto' }, tdClass: 'ta-l' },
])

const filterText = ref('')
const perPageOptions = [
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' },
]

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

const ko = {
  search1: '장치유형',
  search2: '장치명',
  search3: '검색기간',
  filterRegDate: '등록일',
  sortAll: '전체 정렬',

  totalLabel: '전체',
  btnSearch: '조회',

  colTh1: 'No',
  colTh2: '변경구분',
  colTh3: '사용자',
  colTh4: '장치 유형',
  colTh5: '위치',
  colTh6: '장치명',
  colTh7: '작업내용',
  colTh8: '발생일시',
  colTh9: '장치 관리자',
}

const en = {
  search1: '장치유형',
  search2: '장치명',
  search3: '검색기간',
  filterRegDate: '등록일',
  sortAll: '전체 정렬',

  totalLabel: '전체',
  btnSearch: '조회',

  colTh1: 'No',
  colTh2: '변경구분',
  colTh3: '사용자',
  colTh4: '장치 유형',
  colTh5: '위치',
  colTh6: '장치명',
  colTh7: '작업내용',
  colTh8: '발생일시',
  colTh9: '장치 관리자',
}

const lang = ref({})

onMounted(() => {
  lang.value = G.lang === 'ko' ? ko : en
})
</script>
