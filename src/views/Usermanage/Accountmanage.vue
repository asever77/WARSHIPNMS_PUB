<template>
  <h2 class="table-title-box">
    {{ lang.title }}
  </h2>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 16rem" />
      <col style="width: calc(50% - 16rem)" />
      <col style="width: 16rem" />
      <col style="width: calc(50% - 16rem)" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">{{ lang.table1 }}</th>
        <td>
          <BFormInput id="input-1" class="ui-input" v-model="text1" placeholder=""></BFormInput>
        </td>
        <th scope="row">{{ lang.table2 }}</th>
        <td>
          <BButton class="blue24">{{ lang.btn1 }}</BButton>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.table3 }}</th>
        <td>
          <BFormInput id="input-2" class="ui-input" v-model="text2" placeholder=""></BFormInput>
        </td>
        <th scope="row">{{ lang.table4 }}</th>
        <td>
          <BFormSelect
            id="select-1"
            class="ui-select"
            v-model="selected"
            :options="options1"
          ></BFormSelect>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.table5 }}</th>
        <td>
          <BFormInput id="input-3" class="ui-input" v-model="text3" placeholder=""></BFormInput>
        </td>
        <th scope="row">{{ lang.table6 }}</th>
        <td>
          <BFormSelect
            id="select-2"
            class="ui-select"
            v-model="selected"
            :options="options2"
          ></BFormSelect>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.table7 }}</th>
        <td>
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <BFormInput
              id="input-4"
              class="ui-input"
              v-model="datetime"
              placeholder=""
              type="datetime-local"
            ></BFormInput>
            <BButton class="blue24">{{ lang.btn2 }}</BButton>
          </div>
        </td>
        <th scope="row">{{ lang.table8 }}</th>
        <td>
          <BFormSelect
            id="select-3"
            class="ui-select"
            v-model="selected"
            :options="options3"
          ></BFormSelect>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
    <BButton class="blue28">{{ lang.btn3 }}</BButton>
    <BButton class="gray28">{{ lang.btn4 }}</BButton>
  </div>

  <div class="base-wrap mt-20">
    <div class="search-base">
      <div class="search-base--form">
        <!-- 장치유형 기준 선택 -->
        <BFormGroup label="검색구분" label-for="search-deviceType">
          <BFormSelect
            id="search-deviceType"
            class="ui-select-28"
            v-model="filterField"
            :options="filterFieldOptions"
          />
        </BFormGroup>

        <!-- 검색어 입력 -->
        <BFormGroup label="검색어" label-for="search-word">
          <BFormInput
            id="search-word"
            v-model="filterText"
            :placeholder="lang.placeholder1"
            class="ui-input-28"
          />
        </BFormGroup>

        <BFormRadioGroup v-model="radioSelected" :options="radioOptions" name="radio-group-1" />
      </div>
      <div class="search-base--btns">
        <BButton class="blue28" @click="onFilter">{{ lang.btn5 }}</BButton>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive>
        <template #cell(select)="data">
          <BFormRadio v-model="selectedIds" name="some-radios" :value="data.item.id" />
        </template>
        <template #cell(use)="data">
          <span :class="data.value ? 'text-success' : 'text-danger'">
            {{ data.value ? lang.use1 : lang.use2 }}
          </span>
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
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormRadio, BFormGroup, BPagination, BFormRadioGroup,BTable } from 'bootstrap-vue-next'

// BFormInput
const text1 = ref('')
const text2 = ref('')
const text3 = ref('')
const datetime = ref('')
const filterText = ref('')
const searchField = ref('')
const radioSelected = ref('')

const selected = ref(null)
const options1 = computed(() => [
  { value: null, text: lang.value.optionSelect ?? '' },
  { value: 'a', text: lang.value.option1 ?? '' },
  { value: 'b', text: lang.value.option2 ?? '' },
])
const options2 = computed(() => [
  { value: null, text: lang.value.optionSelect ?? '' },
  { value: 'a', text: lang.value.option3 ?? '' },
  { value: 'b', text: lang.value.option4 ?? '' },
])
const options3 = computed(() => [
  { value: null, text: lang.value.optionSelect ?? '' },
  { value: 'a', text: lang.value.option5 ?? '' },
  { value: 'b', text: lang.value.option6 ?? '' },
])

const items = ref([
  { id: 1, number: '4', userId: 'USER01', userName: '사용자1', userLevel: 'Admin', phone: '010-1234-1234', area:'후부장교실', login:'0', use: true },
  { id: 2, number: '3', userId: 'USER02', userName: '사용자2', userLevel: 'Admin', phone: '010-1234-1234', area:'후부장교실', login:'0', use: true },
  { id: 3, number: '2', userId: 'USER03', userName: '사용자3', userLevel: 'Manager', phone: '010-1234-1234', area:'후부장교실2', login:'0', use: false },
  { id: 4, number: '1', userId: 'USER04', userName: '사용자4', userLevel: 'Admin', phone: '010-1234-1234', area:'후부장교실2', login:'0', use: true },
])

const selectedIds = ref([])

const fields = computed(() => [
  { key: 'select', label: lang.value.table9 || '선택', thStyle: { width: '5rem' } },
  { key: 'number', label: lang.value.table10 || '순번', thStyle: { width: '8rem' } },
  { key: 'userId', label: lang.value.table1 || '사용자 ID', thStyle: { width: '12rem' } },
  { key: 'userName', label: lang.value.table3 || '사용자 명', thStyle: { width: '12rem' } },
  { key: 'userLevel', label: lang.value.table4 || '사용자 등급', thStyle: { width: '12rem' } },
  { key: 'phone', label: lang.value.table5 || '핸드폰 번호', thStyle: { width: '15rem' } },
  { key: 'area', label: lang.value.table6 || '근무지', thStyle: { width: 'auto' } },
  { key: 'login', label: lang.value.table11 || '로그인 실패', thStyle: { width: '10rem' } },
  { key: 'use', label: lang.value.table12 || '계정사용', thStyle: { width: '7.2rem' } }
])

const radioOptions = computed(() => [
  { text: lang.value.use1 || '사용', value: 'true' },
  { text: lang.value.use2 || '사용안함', value: 'false' }
])

// 실제 검색에 사용되는 값
const filterField = ref('')
const searchText = ref('')
const searchRadio = ref('')

const filterFieldOptions = computed(() => {
  const types = items.value.map(item => item.area)
  const uniqueTypes = [...new Set(types)]
  return [
    { value: '', text: '근무지' },
    ...uniqueTypes.map(type => ({ value: type, text: type }))
  ]
});


const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchType = !searchField.value || item.area === searchField.value
    const radioBool = searchRadio.value === '' ? null : searchRadio.value === 'true'
    const matchRadio = radioBool === null || item.use === radioBool
    const matchText = !searchText.value ||
      item.area.includes(searchText.value)
    return matchType && matchRadio && matchText
  })
})

const currentPage = ref(1)
const perPage = ref(10)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

function onFilter() {
  searchField.value = filterField.value
  searchText.value = filterText.value
  searchRadio.value = radioSelected.value
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
