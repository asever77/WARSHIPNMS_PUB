<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 16rem" />
      <col style="width: 38.6rem" />
      <col style="width: 16rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.thead1 }}</span>
            <BButton
              class="btn-sort ui-shrink-0"
              aria-sort="none"
              :aria-label="`${lang.filterDeviceType} ${lang.sortAll}`"
            ></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            v-model="deviceType"
            :options="deviceTypeOptions"
          ></BFormSelect>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.thead2 }}</span>
            <BButton
              class="btn-sort ui-shrink-0"
              aria-sort="descending"
              :aria-label="`${lang.filterSearchTarget} ${lang.sortAll}`"
            ></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="searchTargetOptions"
          ></BFormSelect>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.thead3 }}</span>
            <BButton
              class="btn-sort ui-shrink-0"
              aria-sort="descending"
              :aria-label="`${lang.filterSearchTarget} ${lang.sortAll}`"
            ></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="searchTargetOptions"
          ></BFormSelect>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.thead4 }}</span>
            <BButton
              class="btn-sort ui-shrink-0"
              aria-sort="descending"
              :aria-label="`${lang.filterSearchTarget} ${lang.sortAll}`"
            ></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="searchTargetOptions"
          ></BFormSelect>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.thead5 }}</span>
            <BButton
              class="btn-sort ui-shrink-0"
              aria-sort="ascending"
              :aria-label="`${lang.filterRegDate} ${lang.sortAll}`"
            ></BButton>
          </div>
        </th>
        <td colspan="3">
          <div
            class="ui-flex ui-data-box"
            data-item-align="center"
            data-gap="4"
            style="width: 40rem"
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
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
  </div>

  <div class="base-wrap mt-20">
    <div class="search-base">
      <div class="search-base--form">
        <span class="search-total">전체:15</span>
      </div>
      <div class="search-base--btns">
        <!-- 검색어 입력 -->
        <BFormSelect
          id="search-target"
          class="ui-select-28"
          v-model="searchTarget"
          :options="searchTargetOptions"
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
    <BButton class="blue28">{{ lang.btn2 }}</BButton>
    <BButton class="gray28">{{ lang.btn3 }}</BButton>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'
import G from '@/config/global.js'

const lang = ref({})

// 폼 상태
const regDateStart = ref('')
const regDateEnd = ref('')

// 셀렉트 상태
const deviceType = ref(null)
const searchTarget = ref(null)

const ko = {
  thead1: '알림코드',
  thead2: '알림명',
  thead3: '발생위치',
  thead4: '심각도',
  thead5: '발생일시',
  thead6: '구분',
  thead7: '상세정보',
  thead8: '인지정보',

  btn1: '조회',
  btn2: '인지처리',
  btn3: '삭제',
}
const en = {
  thead1: '알림코드',
  thead2: '알림명',
  thead3: '발생위치',
  thead4: '심각도',
  thead5: '발생일시',
  thead6: '구분',
  thead7: '상세정보',
  thead8: '인지정보',

  btn1: '조회',
  btn2: '인지처리',
  btn3: '삭제',
}

// 장치 유형 옵션
const deviceTypeOptions = computed(() => [
  { value: null, text: lang.value.optionSelect ?? '' },
  { value: '라우터', text: '라우터' },
  { value: '스위치', text: '스위치' },
  { value: '무전기', text: '무전기' },
  { value: '중계기', text: '중계기' },
])

// 검색 대상 옵션
const searchTargetOptions = computed(() => [
  { value: null, text: lang.value.optionSelect ?? '' },
  { value: '위치', text: '위치' },
  { value: '장치명', text: '장치명' },
  { value: '시리얼번호', text: '시리얼번호' },
])

// 페이지당 개수 옵션
const perPageOptions = [
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' },
]

// 장치 목록 샘플 데이터 40개 생성 (테스트용)
const items = ref(generateItems(40))

function generateItems(n) {
  const severitys = ['CRITICAL', 'MINOR', 'MAJOR'] //심각도
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = i - 1
    const day = String((idx % 28) + 1).padStart(2, '0')
    const hour = String(idx % 24).padStart(2, '0')
    const minute = String(idx % 60).padStart(2, '0')
    arr.push({
      id: i,
      alarmCode: String(n - i + 1),
      alarmName: `알람명 텍스트`,
      location: `발생위치 텍스트`,
      severity: severitys[idx % severitys.length],
      category: `구분 텍스트`,
      detail: `상세 정보 텍스트`,
      eventTime: `2025-11-${day} ${hour}:${minute}`,
      recognition: `2025-11-${day} ${hour}:${minute} / 김담당`,
    })
  }
  return arr
}

const selectedIds = ref([])

// 테이블 필드: 선택,순번,장치유형,모델,장치명,등급,위치,등록일
// 정렬 추가: 장치유형,모델,장치명,등급,위치,등록일

const fields = computed(() => [
  { key: 'select', label: lang.value.colSelect, thStyle: { width: '4rem' } },
  { key: 'alarmCode', label: lang.value.thead1, thStyle: { width: '8rem' } },
  { key: 'alarmName', label: lang.value.thead2, thStyle: { width: '12rem' } },
  { key: 'location', label: lang.value.thead3, thStyle: { width: '12rem' } },
  {
    key: 'severity',
    label: lang.value.thead4,
    thStyle: { width: '10rem' },
    tdClass: (value) => {
      if (value === 'CRITICAL') return 'red'
      if (value === 'MINOR') return 'yellow'
      if (value === 'MAJOR') return 'green'
      return ''
    },
  },
  { key: 'category', label: lang.value.thead6, thStyle: { width: '10rem' } },
  { key: 'detail', label: lang.value.thead7, thStyle: { width: 'auto' } },
  { key: 'eventTime', label: lang.value.thead5, thStyle: { width: '13rem' } },
  { key: 'recognition', label:lang.value.thead8, thStyle: { width: '18rem' } },
])

const filteredItems = computed(() => {
  // 현재는 전체 items 반환 (필터 기능 미사용)
  return items.value
})

const currentPage = ref(1)
const perPage = ref(10)
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
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (pageIds.length === 0) return false
  return pageIds.every((id) => selectedIds.value.includes(id))
})
const isIndeterminate = computed(() => {
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (pageIds.length === 0) return false
  const selectedOnPage = pageIds.filter((id) => selectedIds.value.includes(id)).length
  return selectedOnPage > 0 && selectedOnPage < pageIds.length
})

function toggleSelectAll(checked) {
  const pageIds = paginatedItems.value.map((i) => i.id)
  if (checked) {
    // 현재 페이지의 모든 행 선택(중복 제거)
    const set = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(set)
  } else {
    // 현재 페이지의 모든 행 선택 해제
    selectedIds.value = selectedIds.value.filter((id) => !pageIds.includes(id))
  }
}

onMounted(() => {
  lang.value = G.lang === 'ko' ? ko : en
})
</script>
