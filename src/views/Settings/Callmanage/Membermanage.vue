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
            <span class="ui-flex-1">전화번호</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="none" :aria-label="`전화번호 ${lang.sortAll}`"></BButton>
          </div>
        </th>
        <td>
          <BFormInput type="text" class="ui-input" placeholder="" />
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">아이디</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" :aria-label="`${lang.filterLocation} ${lang.sortAll}`"></BButton>
          </div>
        </th>
        <td>
          <BFormInput type="text" class="ui-input" placeholder="" />
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">단말유형</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" :aria-label="`${lang.filterRadioSilence} ${lang.sortAll}`"></BButton>
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
            <span class="ui-flex-1">등록일</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" :aria-label="`${lang.filterStatus} ${lang.sortAll}`"></BButton>
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
          id="per-page"
          class="ui-select-28 w-60"
          v-model="perPage"
          :options="perPageOptions"
        ></BFormSelect>
      </div>
    </div>
    <div class="base-table">
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive @row-clicked="onRowClicked" data-type="clickable">
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

  <UiModal v-model="modals.modalModify1.show" :title="'점대점 연결 등록'" type="modal" size="md" @close-btn-click="modals.modalModify1.show = false">
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:18rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">피호출 사용자단말</th>
            <td>
              <BFormSelect
                class="ui-select"
                :disabled="true"
                :options="[
                  { value: '1', text: '선택' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">통화기능키 레이블</th>
            <td>
              <BFormInput
                class="ui-input"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">통화모드</th>
            <td>
              <BFormSelect
                class="ui-select"
                :disabled="true"
                :options="[
                  { value: '1', text: 'PTT' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">응답모드</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.answerMode"
                :options="[
                  { value: '1', text: '수동연결' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">녹음제어</th>
            <td>
              <BFormSelect
                class="ui-select"
                v-model="formData.recordControl"
                :options="[
                  { value: '1', text: '자동녹음' },
                ]"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">스피커 출력방향</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">왼쪽</BFormCheckbox>
                <BFormCheckbox value="2">오른쪽</BFormCheckbox>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">호출알림</th>
            <td>
              <div class="d-flex w100-2">
                <BFormCheckbox value="1">벨소리</BFormCheckbox>
                <BFormCheckbox value="2">알림등</BFormCheckbox>
              </div>
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
</template>

<script setup>
// 모달 폼 데이터 및 옵션 선언 (에러 방지)
const formData = reactive({
  deviceType: null,
  model: null,
});

import { ref, onMounted, computed, watch, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next'
import UiModal from '@/components/UiModal.vue'

const ko = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',
  filterDeviceName: '장치명',
  filterRadioSilence: '무선침묵권한',
  filterLocation: '위치(구역)',
  filterStatus: '상태',
  btnRegister: '등록',
  btnBulkRegister: '일괄등록',
  btnDelete: '삭제',
  colSelect: '선택',
  colNumber: 'No',
  colLocation: '위치(구역)',
  colDeviceName: '장치명',
  colRadioSilence: '무선침묵',
  colAlarmAuth: '경보권한',
  colBroadcastAuth: '방송권한',
  colMuteAuth: 'Mute권한',
  colExtensionNo: '내선번호',
  colStatus: '상태',
  colIpAddress: 'IP Address',
  colL2Switch: 'L2 스위치',
  colSerial: 'Serial No',
  thead1: '검색대상',
  thead2: '검색어',
  thead3: '무선침묵권한',
  thead4: '상태',
}
const en = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',
  filterDeviceName: '장치명',
  filterRadioSilence: '무선침묵권한',
  filterLocation: '위치(구역)',
  filterStatus: '상태',
  btnRegister: '등록',
  btnBulkRegister: '일괄등록',
  btnDelete: '삭제',
  colSelect: '선택',
  colNumber: 'No',
  colLocation: '위치(구역)',
  colDeviceName: '장치명',
  colRadioSilence: '무선침묵',
  colAlarmAuth: '경보권한',
  colBroadcastAuth: '방송권한',
  colMuteAuth: 'Mute권한',
  colExtensionNo: '내선번호',
  colStatus: '상태',
  colIpAddress: 'IP Address',
  colL2Switch: 'L2 스위치',
  colSerial: 'Serial No',
  thead1: '검색대상',
  thead2: '검색어',
  thead3: '무선침묵권한',
  thead4: '상태',
}
const lang = ref({})

// 모달 상태
const modals = reactive({
  modalTerminalModify: { show: false },
  modalPointSetting: { show: false },
  modalModify1: { show: false },
})


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

function onRowClicked(item) {
  modals.modalTerminalModify.show = true;
}
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
