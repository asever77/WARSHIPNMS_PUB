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
        <th scope="row">장치유형</th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            v-model="deviceType"
            :options="selectOptions"
          ></BFormSelect>
        </td>
        <th scope="row">검색대상</th>
        <td>
          <BFormSelect
            id="search-target"
            class="ui-select"
            v-model="searchTarget"
            :options="selectOptions"
          ></BFormSelect>
        </td>
        <th scope="row">검색어</th>
        <td>
          <BFormInput id="search-word" class="ui-input" v-model="searchWord" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">등록일</th>
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
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
  </div>

  <div class="base-wrap mt-20">
    <div class="search-base">
      <div class="search-base--form">
        <b>전체:15</b>
      </div>
      <div class="search-base--btns">
        <!-- 검색어 입력 -->
        <BFormGroup label="검색어" label-for="search-word-2">
          <BFormInput
            id="search-word-2"
            v-model="filterText"
            :placeholder="lang.placeholder1"
            class="ui-input-28"
          />
        </BFormGroup>
        <BButton class="blue28" @click="onFilter">{{ lang.btn5 }}</BButton>
        <BFormSelect
            id="per-page"
            class="ui-select"
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
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'

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
  { key: 'select', label: '선택', thStyle: { width: '5rem' } },
  { key: 'number', label: '순번', thStyle: { width: '8rem' } },
  { key: 'deviceType', label: '장치유형', sortable: true, thStyle: { width: '12rem' } },
  { key: 'model', label: '모델', sortable: true, thStyle: { width: '12rem' } },
  { key: 'deviceName', label: '장치명', sortable: true, thStyle: { width: '14rem' } },
  { key: 'grade', label: '등급', sortable: true, thStyle: { width: '10rem' } },
  { key: 'serial', label: '시리얼번호', thStyle: { width: '15rem' } },
  { key: 'location', label: '위치', sortable: true, thStyle: { width: 'auto' } },
  { key: 'regDate', label: '등록일', sortable: true, thStyle: { width: '14rem' } },
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

function onFilter() {
  searchField.value = filterField.value
  searchText.value = filterText.value
  currentPage.value = 1
}

const ko = {
  title: '사용자 계정 정보',
  table1: '사용자 ID',
  table2: '비밀번호',
  table3: '사용자 명',
  table4: '사용자 등급',
  table5: '핸드폰 번호',
  table6: '근무지',
  table7: '재 로그인 가능시간',
  table8: '계정 사용여부',
  btn1: '초기화',
  btn2: '즉시사용',
  btn3: '저장',
  btn4: '삭제',
  btn5: '조회',
  optionSelect: '선택하세요',
  option1: 'Admin',
  option2: 'Manager',
  option3: '후부장교실1',
  option4: '후부장교실2',
  option5: '사용',
  option6: '사용안함',
  table9: "선택",
  table10: "순번",
  table11: "로그인 실패",
  table12: "계정사용",
  placeholder1: "검색어 입력",
  use1: "사용",
  use2: "사용안함",
}

const en = {
  title: '사용자 계정 정보',
  table1: '사용자 ID',
  table2: '비밀번호',
  table3: '사용자 명',
  table4: '사용자 등급',
  table5: '핸드폰 번호',
  table6: '근무지',
  table7: '재 로그인 가능시간',
  table8: '계정 사용여부',
  btn1: '초기화',
  btn2: '즉시사용',
  btn3: '저장',
  btn4: '삭제',
  btn5: '조회',
  optionSelect: '선택하세요',
  option1: 'Admin',
  option2: 'Manager',
  option3: '후부장교실1',
  option4: '후부장교실2',
  option5: '사용',
  option6: '사용안함',
  table9: "선택",
  table10: "순번",
  table11: "로그인 실패",
  table12: "계정사용",
  placeholder1: "검색어 입력",
  use1: "사용",
  use2: "사용안함",
}

const lang = ref({})

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  if (filterFieldOptions.value.length > 0) {
    filterField.value = filterFieldOptions.value[0].value;
  }
})
</script>
