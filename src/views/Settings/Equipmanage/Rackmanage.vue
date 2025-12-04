<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 13rem" />
      <col style="width: 39.2rem" />
      <col style="width: 13rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          {{ lang.filterDeviceType }}
          <BButton
            class="btn-sort"
            aria-sort="none"
            :aria-label="`${lang.filterDeviceType} 전체 정렬`"
          ></BButton>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            v-model="deviceType"
            :options="selectOptions"
          ></BFormSelect>
        </td>
        <th scope="row">{{ lang.filterSearchWord }}</th>
        <td>
          <BFormInput
            id="search-word"
            class="ui-input"
            v-model="searchWord"
            placeholder=""
          ></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{ lang.filterRegDate }}
          <BButton
            class="btn-sort"
            aria-sort="ascending"
            :aria-label="`${lang.filterRegDate} 전체 정렬`"
          ></BButton>
        </th>
        <td colspan="3">
          <div class="ui-flex" data-item-align="center" data-gap="4" style="width: 20rem">
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
        <template #cell(count)="data">
          <div class="ui-flex" data-item-align="center" data-justify-align="end" data-gap="8">
            <span>5</span>
            <BButton class="gray24 min-w-0" @click="modals.modalRackOption.show = true">{{
              lang.btnAdd
            }}</BButton>
          </div>
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
    <BButton class="blue28" @click="modals.modalRackRegister.show = true">{{
      lang.btnRegister
    }}</BButton>
    <BButton class="gray28">{{ lang.btnDelete }}</BButton>
  </div>

  <!-- modal 랙 정보 등록 -->
  <UiModal
    v-model="modals.modalRackRegister.show"
    :title="lang.modalTitle1"
    type="modal"
    size="md"
    @close-btn-click="modals.modalRackRegister.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.thead3 }}</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.deviceType"
                :options="deviceTypeOptions"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.thead4 }}</th>
            <td>
              <BFormSelect class="ui-select" v-model="formData.model" :options="modelOptions" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.thead6 }}</th>
            <td>
              <BFormSelect class="ui-select" v-model="formData.model" :options="rackOptions" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.thead7 }}</th>
            <td>
              <BFormSelect class="ui-select" v-model="formData.model" :options="sizeOptions" />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.thead5 }}</th>
            <td>
              <div class="ui-flex" data-direction="col" data-gap="4">
                <BFormSelect class="ui-select" v-model="formData.model" :options="areaOptions1" />
                <BFormSelect class="ui-select" v-model="formData.model" :options="areaOptions2" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalRackRegister.show = false">{{
        lang.btnCancel
      }}</BButton>
      <BButton class="blue28">{{ lang.btnSave }}</BButton>
    </template>
  </UiModal>

  <!-- modal 랙 구성품 -->
  <UiModal
    v-model="modals.modalRackOption.show"
    :title="lang.modalTitle2"
    type="modal"
    size="xl"
    no-footer
    @close-btn-click="modals.modalRackOption.show = false"
  >
    <div class="ui-flex modal-h-full" data-gap="16">
      <div class="ui-shrink-0 rack-setting-area">1</div>
      <div>
        <table class="table-type-a">
          <colgroup>
            <col style="width: 14rem" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">{{ lang.thead3 }}</th>
              <td>무선통신운용콘솔 랙</td>
            </tr>
            <tr>
              <th scope="row">{{ lang.thead14 }}</th>
              <td>
                <BFormInput class="ui-input" v-model="formData.rackNumber" placeholder="" />
              </td>
            </tr>
            <tr>
              <th scope="row">{{ lang.thead10 }}</th>
              <td>
                <BFormInput class="ui-input" v-model="formData.rackPosition" placeholder="" />
              </td>
            </tr>
            <tr>
              <th scope="row">{{ lang.thead7 }}</th>
              <td>
                <BFormInput class="ui-input" v-model="formData.rackSize" placeholder="" />
              </td>
            </tr>
            <tr>
              <th scope="row">{{ lang.thead11 }}</th>
              <td>
                <BFormSelect
                  class="ui-select"
                  v-model="formData.model"
                  :options="rackTypeOptions"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">{{ lang.thead12 }}</th>
              <td>
                <BFormSelect
                  class="ui-select"
                  v-model="formData.model"
                  :options="rackDeviceOptions"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">{{ lang.thead13 }}</th>
              <td>
                <BFormFile
                  class="ui-input"
                  v-model="formData.file"
                  :placeholder="lang.btnFile || '파일 선택'"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="ui-btn-group">
          <BButton class="gray28" @click="modals.modalRackOption.show = false">{{
            lang.btnCancel
          }}</BButton>
          <BButton class="blue28">{{ lang.btnModify }}</BButton>
          <BButton class="blue28">{{ lang.btnDelete }}</BButton>
        </div>
      </div>
    </div>
  </UiModal>
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import {
  BButton,
  BFormGroup,
  BPagination,
  BTable,
  BFormCheckbox,
  BFormTextarea,
  BFormFile,
} from 'bootstrap-vue-next'
import UiModal from '@/components/UiModal.vue'

const ko = {
  // 필터 영역
  filterDeviceType: '장치유형',
  filterSearchWord: '검색어',
  filterRegDate: '등록일',

  // 검색 영역
  searchLabel: '검색어',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',

  // 버튼
  btnSearch: '조회',
  btnRegister: '등록',
  btnDelete: '삭제',
  btnSave: '저장',
  btnCancel: '취소',
  btnAdd: '구성품등록',
  btnModify: '수정',
  btnFile: '파일 선택',

  // 테이블 헤더
  thead1: '선택',
  thead2: 'No',
  thead3: '이름',
  thead4: '모델명',
  thead5: '위치',
  thead6: '랙 개수',
  thead7: 'Unit Size',
  thead8: '등록일',
  thead9: '등록 구성품 개수',
  thead10: 'Start Position',
  thead11: '구성품 유형',
  thead12: '장치',
  thead13: '이미지',
  thead14: '랙 번호',

  // modal
  modalTitle1: '랙 정보 등록',
  modalTitle2: '랙 구성품',

  // 옵션
  optionSelect: '선택하세요',
  optionAdmin: '관리자',
  optionManager: '매니저',
  optionLocation1: '위치1',
  optionLocation2: '위치2',
  optionDetailA: 'A구역',
  optionDetailB: 'B구역',
  optionL2SW01: 'L2SW-01',
  optionL2SW02: 'L2SW-02',
  optionCardCount1: '1',
  optionCardCount2: '2',
  optionCardCount4: '4',
  optionEthernet: '이더넷',
  optionSerial: '시리얼',
  optionFiber: '광',
}
const en = {
  // 필터 영역
  filterDeviceType: '장치유형',
  filterSearchWord: '검색어',
  filterRegDate: '등록일',

  // 검색 영역
  searchLabel: '검색어',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',

  // 버튼
  btnSearch: '조회',
  btnRegister: '등록',
  btnDelete: '삭제',
  btnSave: '저장',
  btnCancel: '취소',
  btnAdd: '구성품등록',
  btnModify: '수정',
  btnFile: '파일 선택',

  // 테이블 헤더
  thead1: '선택',
  thead2: 'No',
  thead3: '이름',
  thead4: '모델명',
  thead5: '위치',
  thead6: '랙 개수',
  thead7: 'Unit Size',
  thead8: '등록일',
  thead9: '등록 구성품 개수',
  thead10: 'Start Position',
  thead11: '구성품 유형',
  thead12: '장치',
  thead13: '이미지',
  thead14: '랙 번호',

  // modal
  modalTitle1: '랙 정보 등록',
  modalTitle2: '랙 구성품',

  // 옵션
  optionSelect: '선택하세요',
  optionAdmin: '관리자',
  optionManager: '매니저',
  optionLocation1: '위치1',
  optionLocation2: '위치2',
  optionDetailA: 'A구역',
  optionDetailB: 'B구역',
  optionL2SW01: 'L2SW-01',
  optionL2SW02: 'L2SW-02',
  optionCardCount1: '1',
  optionCardCount2: '2',
  optionCardCount4: '4',
  optionEthernet: '이더넷',
  optionSerial: '시리얼',
  optionFiber: '광',
}

const lang = ref({})

// 모달 상태
const modals = reactive({
  modalRackOption: { show: false },
  modalRackRegister: { show: false },
})
const formData = reactive({
  deviceType: '',
  model: '',
  rackNumber: '',
  rackPosition: '',
  rackSize: '',
  file: ''
})
const deviceTypeOptions = computed(() => [
  { value: formData.deviceType, text: formData.deviceType },
])
const modelOptions = computed(() => [{ value: formData.model, text: formData.model }])
const rackOptions = computed(() => [{ value: formData.model, text: formData.model }])
const sizeOptions = computed(() => [{ value: formData.model, text: formData.model }])
const areaOptions1 = computed(() => [{ value: formData.model, text: formData.model }])
const areaOptions2 = computed(() => [{ value: formData.model, text: formData.model }])
const rackTypeOptions = computed(() => [{ value: formData.model, text: formData.model }])
const rackDeviceOptions = computed(() => [{ value: formData.model, text: formData.model }])

// 폼 상태
const searchWord = ref('')
const regDateStart = ref('')
const regDateEnd = ref('')
const filterText = ref('')
const searchField = ref('')

// 셀렉트 상태
const deviceType = ref(null)
const selectOptions = computed(() => [
  { value: null, text: lang.value.optionSelect ?? '' },
  { value: 'a', text: lang.value.option1 ?? '' },
  { value: 'b', text: lang.value.option2 ?? '' },
])

// 장치 목록 샘플 데이터 40개 생성 (테스트용)
const items = ref(generateItems(40))

function generateItems(n) {
  const types = ['무선통신운용콘솔 랙', '무선통신기기스템 랙', '비상통신시스템 랙']
  const models = ['RU-4R-M1', 'RU-3R-M1', 'RU-2R-M1']
  const locations = ['통신실', '장비실']
  const racks = ['4', '3', '2']
  const sizes = ['36', '38', '32']
  const arr = []
  for (let i = 1; i <= n; i++) {
    const idx = i - 1
    const day = String((idx % 28) + 1).padStart(2, '0')
    const hour = String(idx % 24).padStart(2, '0')
    const minute = String(idx % 60).padStart(2, '0')
    arr.push({
      id: i,
      number: String(n - i + 1),
      deviceType: types[idx % types.length],
      model: models[idx % models.length],
      deviceName: `${types[idx % types.length]}-${i}`,
      rack: racks[idx % racks.length],
      size: sizes[idx % sizes.length],
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
  { key: 'select', label: lang.value.thead1, thStyle: { width: '5rem' } },
  { key: 'number', label: lang.value.thead2, thStyle: { width: '6rem' } },
  { key: 'deviceType', label: lang.value.thead3, thStyle: { width: 'auto' } },
  { key: 'model', label: lang.value.thead4, thStyle: { width: '14rem' } },
  { key: 'location', label: lang.value.thead5, thStyle: { width: '14rem' } },
  { key: 'rack', label: lang.value.thead6, thStyle: { width: '12rem' } },
  { key: 'size', label: lang.value.thead7, thStyle: { width: '12rem' } },
  { key: 'regDate', label: lang.value.thead8, thStyle: { width: '16rem' } },
  { key: 'count', label: lang.value.thead9, thStyle: { width: '16rem' } },
])

// 실제 검색에 사용되는 값
const filterField = ref('')
const searchText = ref('')

const filterFieldOptions = computed(() => {
  const types = items.value.map((item) => item.location)
  const uniqueTypes = [...new Set(types)]
  return [
    { value: '', text: '근무지' },
    ...uniqueTypes.map((type) => ({ value: type, text: type })),
  ]
})

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchType = !searchField.value || item.location === searchField.value
    const matchText =
      !searchText.value || (item.location && item.location.includes(searchText.value))
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

function onFilter() {
  searchField.value = filterField.value
  searchText.value = filterText.value
  currentPage.value = 1
}

onMounted(() => {
  lang.value = G.lang === 'ko' ? ko : en
  if (filterFieldOptions.value.length > 0) {
    filterField.value = filterFieldOptions.value[0].value
  }
})
</script>
