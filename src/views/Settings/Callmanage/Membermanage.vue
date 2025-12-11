<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 16rem" />
      <col style="width: 34rem" />
      <col style="width: 16rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter1 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="none" :aria-label="`{{ lang.filter1 }} ${lang.sortAll}`"></BButton>
          </div>
        </th>
        <td>
          <BFormInput type="text" class="ui-input" placeholder="" />
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter2 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" :aria-label="`${lang.filter2} ${lang.sortAll}`"></BButton>
          </div>
        </th>
        <td>
          <BFormInput type="text" class="ui-input" placeholder="" />
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter3 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" :aria-label="`${lang.filter3} ${lang.sortAll}`"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            :options="[
              { value: '1', text: '단말유형' },
            ]"
          ></BFormSelect>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter4 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" :aria-label="`${lang.filter4} ${lang.sortAll}`"></BButton>
          </div>
        </th>
        <td>
          <div class="ui-flex ui-data-box" data-item-align="center" data-gap="4">
            <BFormInput
              id="reg-date-start"
              class="ui-input"
              placeholder=""
              type="datetime-local"
            ></BFormInput>
            ~
            <BFormInput
              id="reg-date-end"
              class="ui-input"
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
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive >
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
    <BButton class="blue28" @click="modals.modalModify1.show = true">{{ lang.btnRegister }}</BButton>
    <BButton class="blue28"  @click="modals.modalFileUpload.show = true">{{ lang.btnBulkRegister }}</BButton>
    <BButton class="gray28">{{ lang.btnDelete }}</BButton>
  </div>

  <UiModal v-model="modals.modalModify1.show" :title="lang.modalTitle1" type="modal" size="md" >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalth1 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth2 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth3 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth4 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalth5 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                :options="[
                  { value: '1', text: 'PTT' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.modalth6 }}</th>
            <td>
              <BFormInput class="ui-input" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalModify1.show = false">취소</BButton>
      <BButton class="blue28">저장</BButton>
    </template>
  </UiModal>

  <UiModal v-model="modals.modalFileUpload.show"
    :title="lang.modalTitle2"
    type="modal"
    size="md"
    @close-btn-click="modals.modalFileUpload.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 10rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.fileRegister }}</th>
            <td>
              <BFormFile
                class="ui-input"
                v-model="formData.file"
                :placeholder="lang.fileSelect"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ui-flex py-4" data-direction="col" data-gap="20" data-item-align="center">
        <p class="text-12-400">
          {{ lang.bulkGuide }}
        </p>
        <a href="/download/connector-bulk-template.cfg" download class="ui-link-underline"
          >가입자일괄등록양식.cfg</a
        >
      </div>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalFileUpload.show = false"
        >{{ lang.btnCancel }}</BButton
      >
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup, BPagination, BTable, BFormCheckbox, BFormFile } from 'bootstrap-vue-next'
import UiModal from '@/components/UiModal.vue'

const ko = {
  sortAll: '전체 정렬',

  searchLabel: '검색어',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',

  btnRegister: '등록',
  btnBulkRegister: '일괄등록',
  btnDelete: '삭제',
  btnCancel: '취소',
  btnSave: '저장',

  fileRegister: '가입자 파일등록',
  fileSelect: '파일찾기',
  bulkGuide: '다음 문서 양식을 다운받아 작성 후 일괄등록에 사용할 수 있습니다.',


  filter1: '전화번호',
  filter2: '아이디',
  filter3: '단말유형',
  filter4: '등록일',

  colSelect: '선택',
  colTh1: 'No',
  colTh2: '장치명',
  colTh3: 'I/F 유형',
  colTh4: '카드#',
  colTh5: '포트#',
  colTh6: 'VoIP 가입자',
  colTh7: '연결 장치',

  modalTitle1: '무선링크연동장치 포트 연결정보 설정',
  modalTitle2: '가입자 일괄등록',

  modalth1: '전화번호',
  modalth2: '아이디',
  modalth3: '패스워드',
  modalth4: '패스워드 확인',
  modalth5: '단말유형',
  modalth6: 'Description',
}
const en = {
  sortAll: '전체 정렬',

  searchLabel: '검색어',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',

  btnRegister: '등록',
  btnBulkRegister: '일괄등록',
  btnDelete: '삭제',
  btnCancel: '취소',
  btnSave: '저장',

  filter1: '전화번호',
  filter2: '아이디',
  filter3: '단말유형',
  filter4: '등록일',

  colSelect: '선택',
  colTh1: 'No',
  colTh2: '장치명',
  colTh3: 'I/F 유형',
  colTh4: '카드#',
  colTh5: '포트#',
  colTh6: 'VoIP 가입자',
  colTh7: '연결 장치',

  modalTitle1: '무선링크연동장치 포트 연결정보 설정',

  modalth1: '전화번호',
  modalth2: '아이디',
  modalth3: '패스워드',
  modalth4: '패스워드 확인',
  modalth5: '단말유형',
  modalth6: 'Description',
}
const lang = ref({})

// 모달 상태
const modals = reactive({
  modalModify1: { show: false },
  modalFileUpload: { show: false },
})

const formData = reactive({
  deviceType: '',
  model: '',
  location: lang.value.locationRack,
})
const portDropdown = ref(null)
const deviceTypeOptions = computed(() => [
  { value: formData.deviceType, text: formData.deviceType },
])
const modelOptions = computed(() => [{ value: formData.model, text: formData.model }])

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
  const arr = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      id: i,
      th1: String(i),
      th2: `th2 1010`,
      th3: `th3 1010`,
      th4: `th4 1010`,
      th5: `th5 1010`,
      th6: `th6 1010`,
      th7: `th7 1010`,
      th8: `th8 1010`,
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
  { key: 'th1', label: 'No', thStyle: { width: '5rem' } },
  { key: 'th2', label: '전화번호', thStyle: { width: 'auto' } },
  { key: 'th3', label: '아이디', thStyle: { width: 'auto' } },
  { key: 'th4', label: '패스워드', thStyle: { width: 'auto' } },
  { key: 'th5', label: '등록일', thStyle: { width: 'auto' } },
  { key: 'th6', label: '단말유형', thStyle: { width: 'auto' } },
  { key: 'th7', label: '단말 이름', thStyle: { width: 'auto' } },
  { key: 'th8', label: 'IP Address', thStyle: { width: 'auto' } },
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
