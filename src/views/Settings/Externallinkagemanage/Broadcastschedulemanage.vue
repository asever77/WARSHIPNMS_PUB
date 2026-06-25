<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 8rem" />
      <col style="width: auto" />
      <col style="width: 8rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
    <tr>
      <th scope="row">{{ lang.filter1 }}</th>
      <td>
        <BFormInput class="ui-input" placeholder=""></BFormInput>
      </td>
      <th scope="row">{{ lang.filter2 }}</th>
      <td>
         <BFormSelect class="ui-select-28" v-model="filterRepeat" :options="repeatOptions"></BFormSelect>
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
        <span class="search-total">{{ lang.totalLabel }}: {{ filteredItems.length }}</span>
      </div>
      <div class="search-base--btns">
        <!-- 검색어 입력 -->
        <BFormGroup>
          <div class="ui-search-with-btn">
            <BFormInput
              id="search-word-2"
              v-model="filterText"
              :placeholder="lang.searchPlaceholder"
              class="ui-input-28"
            />
            <button
              type="button"
              class="btn-search-icon"
              aria-label="검색"
              @click="onFilter"
            ></button>
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
        hover
        small
        responsive
        @row-clicked="onRowClicked"
        data-type="clickable"
      >
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
    <BButton class="blue28" @click="modals.modal1.show = true">{{ lang.btn1 }}</BButton>
    <BButton class="gray28">{{ lang.btn2 }}</BButton>
  </div>

  <UiModal
    v-model="modals.modal1.show"
    :title="lang.modalTitle1"
    type="modal"
    size="md"
    @close-btn-click="modals.modal1.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:8rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh1_1 }}*</th>
            <td>
              <BFormInput type="text" class="ui-input" v-model="form1.name" placeholder="평일 오전과업알림 15분전" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_2 }}*</th>
            <td>
              <div class="ui-flex" data-direction="col" data-gap="12">
                <div class="ui-flex" data-gap="16">
                  <BFormCheckbox v-model="form1.excludeHoliday" class="me-3">휴일제외</BFormCheckbox>
                  <BFormCheckbox v-model="form1.excludeWeekend">주말제외</BFormCheckbox>
                </div>
                <BFormSelect class="ui-select-28 w-100" :options="['매주', '매일', '매월']" v-model="form1.repeatType"></BFormSelect>
                <div class="ui-flex" data-gap="12">
                  <BFormCheckbox v-model="form1.days" value="월">월</BFormCheckbox>
                  <BFormCheckbox v-model="form1.days" value="화">화</BFormCheckbox>
                  <BFormCheckbox v-model="form1.days" value="수">수</BFormCheckbox>
                  <BFormCheckbox v-model="form1.days" value="목">목</BFormCheckbox>
                  <BFormCheckbox v-model="form1.days" value="금">금</BFormCheckbox>
                  <BFormCheckbox v-model="form1.days" value="토">토</BFormCheckbox>
                  <BFormCheckbox v-model="form1.days" value="일">일</BFormCheckbox>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_3 }}*</th>
            <td>
              <div class="ui-flex" data-direction="col" data-gap="12">
                <div class="ui-flex" data-item-align="center" data-gap="6">
                  <BFormSelect class="ui-select-28" :options="hourOptions" v-model="timeForm.hour"></BFormSelect>
                  <BFormSelect class="ui-select-28" :options="minuteOptions" v-model="timeForm.minute"></BFormSelect>
                  <BFormSelect class="ui-select-28" :options="['오전', '오후']" v-model="timeForm.ampm"></BFormSelect>
                  <BButton class="gray28" style="height: 2.8rem;" @click="addTime">시간추가</BButton>
                </div>
                <div class="ui-flex mt-2" data-gap="8" style="flex-wrap: wrap; align-content: flex-start; min-height: 8rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.8rem; background-color: #f8fafc;">
                  <div
                    v-for="(time, index) in form1.appliedTimes"
                    :key="index"
                    class="ui-flex"
                    data-item-align="center"
                    data-gap="4"
                    style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 9999px; padding: 0.4rem 1rem; font-size: 1.3rem; color: #334155;"
                  >
                    <span>{{ time }}</span>
                    <button
                      type="button"
                      style="border: none; background: transparent; color: #94a3b8; font-size: 1.2rem; cursor: pointer; padding: 0 0.2rem; display: flex; align-items: center;"
                      @click="removeTime(index)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modal1.show = false">{{ lang.modalBtnCancel }}</BButton>
      <BButton class="blue28">{{ lang.modalBtnRegister }}</BButton>
    </template>
  </UiModal>

</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import {
  BFormInput,
  BFormSelect,
  BButton,
  BFormGroup,
  BPagination,
  BTable,
  BFormCheckbox,
} from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  title1: '방송 음원 관리',
  totalLabel: '전체',

  filter1: '이름',
  filter2: '반복여부',

  btnSearch: '조회',
  btn1: '등록',
  btn2: '삭제',

  colTh1: 'No',
  colTh2: '이름',
  colTh3: '반복여부',
  colTh4: '적용시간',

  modalTitle1: '스케줄 등록',
  modalTh1_1: '이름',
  modalTh1_2: '반복여부',
  modalTh1_3: '적용시간',
  modalBtnCancel: '취소',
  modalBtnRegister: '등록하기',

  searchPlaceholder: '검색어 입력',
  searchSelect: '전체 선택/해제',
}

const en = {
  title1: 'Broadcast Source Manage',
  totalLabel: 'Total',

  filter1: 'Name',
  filter2: 'Repeat',

  btnSearch: 'Search',
  btn1: 'Register',
  btn2: 'Delete',

  colTh1: 'No',
  colTh2: 'Name',
  colTh3: 'Repeat',
  colTh4: 'Time',

  modalTitle1: 'Schedule Register',
  modalTh1_1: 'Name',
  modalTh1_2: 'Repeat',
  modalTh1_3: 'Applied Time',
  modalBtnCancel: 'Cancel',
  modalBtnRegister: 'Register',

  searchPlaceholder: 'Enter search term',
  searchSelect: 'Select/Deselect All',
}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modal1: { show: false },
  modal2: { show: false },
})

// =========================
// [상태/폼/리스트 관리]
// =========================
const currentPage = ref(1) // 현재 페이지
const form1 = ref({
  name: '평일 오전과업알림 15분전',
  excludeHoliday: false,
  excludeWeekend: false,
  repeatType: '매주',
  days: ['토', '일'],
  appliedTimes: ['09:15 오전', '10:15 오전']
})
const timeForm = ref({
  hour: '01',
  minute: '01',
  ampm: '오후'
})
const hourOptions = Array.from({ length: 12 }, (_, i) => {
  const h = String(i + 1).padStart(2, '0')
  return { value: h, text: h }
})
const minuteOptions = Array.from({ length: 60 }, (_, i) => {
  const m = String(i).padStart(2, '0')
  return { value: m, text: m }
})
const perPage = ref(10) // 페이지당 개수
const selectedIds = ref([]) // 선택된 행 id
const filterText = ref('') // 검색어
const filterRepeat = ref('') // 반복여부 검색 필터
const repeatOptions = [
  { value: '', text: '전체' },
  { value: '매일', text: '매일' },
  { value: '매주', text: '매주' },
  { value: '매월', text: '매월' },
]
const perPageOptions = [
  { value: 10, text: '10' },
  { value: 15, text: '15' },
  { value: 20, text: '20' },
]

// 샘플 데이터 (JSON 배열)
const items = ref(Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  th1: String(i + 1),
  th2: `평일 오전과업알림 5분전`,
  th3: '매주(월,화,수,목,금), 휴일제외',
  th4: `06:00. 07:00, 08:00 외 9건`,
})))
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: 'auto' }, tdClass: 'text-ellipsis' },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: 'auto' }, tdClass: 'text-ellipsis' },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: 'auto' }, tdClass: 'text-ellipsis' },
])

// 필터링/페이지네이션
const filteredItems = computed(() => {
  return items.value.filter(item => {
    if (filterRepeat.value && !item.th3.includes(filterRepeat.value)) {
      return false
    }
    if (filterText.value) {
      const query = filterText.value.toLowerCase()
      const matchName = item.th2?.toLowerCase().includes(query)
      const matchRepeat = item.th3?.toLowerCase().includes(query)
      const matchTime = item.th4?.toLowerCase().includes(query)
      return matchName || matchRepeat || matchTime
    }
    return true
  })
})
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

// 체크박스 전체선택/부분선택
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
    const set = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(set)
  } else {
    selectedIds.value = selectedIds.value.filter((id) => !pageIds.includes(id))
  }
}

// =========================
// [UI 이벤트 핸들러]
// =========================
function onRowClicked() { modals.modal1.show = true }
function onFilter() {
  currentPage.value = 1
}
function addTime() {
  const newTime = `${timeForm.value.hour}:${timeForm.value.minute} ${timeForm.value.ampm}`
  if (!form1.value.appliedTimes.includes(newTime)) {
    form1.value.appliedTimes.push(newTime)
  }
}
function removeTime(index) {
  form1.value.appliedTimes.splice(index, 1)
}

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
