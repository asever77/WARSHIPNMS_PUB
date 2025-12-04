<template>
  <div class="base-wrap">
    <div class="base-table">
      <!-- BTable -->
      <BTable
        :items="pagedItems"
        :fields="fields"
        bordered
        hover
        small
        responsive
        data-type="clickable"
        @row-clicked="modals.modalName.show = true"
      >
        <!-- 전체 선택 체크박스 -->
        <template #head(select)>
          <BFormCheckbox v-model="isAllSelected" />
        </template>

        <!-- 개별 선택 체크박스 -->
        <template #cell(select)="data">
          <BFormCheckbox v-model="selectedIds" :value="data.item.id" @click.stop />
        </template>
      </BTable>

      <!-- 페이지네이션 -->
      <div class="d-flex justify-content-center mt-4">
        <BPagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
      </div>
    </div>
  </div>

  <!-- 버튼 그룹 -->
  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
    <BButton class="gray28">{{ lang.btn2 }}</BButton>
  </div>

  <!-- 모달 -->
  <UiModal
    v-model="modals.modalName.show"
    :title="lang.popupTitle"
    type="modal"
    size="md"
    @close-btn-click="modals.modalName.show = false"
  >
    <table class="table-type-a">
      <colgroup>
        <col style="width: 10rem" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">{{ lang.table2 }}</th>
          <td>
            <BFormInput class="ui-input" v-model="formData.viewLabel" placeholder="" />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.table1 }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.viewOrder"
              :options="viewOrderOptions"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.table3 }}</th>
          <td>
            <div class="ui-flex" data-direction="col" data-gap="4">
              <BFormSelect
                class="ui-select"
                v-model="formData.viewType1"
                :options="viewTypeOptions1"
              />
              <BFormSelect
                class="ui-select"
                v-model="formData.viewType2"
                :options="viewTypeOptions2"
              />
              <BFormSelect
                class="ui-select"
                v-model="formData.viewType3"
                :options="viewTypeOptions3"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">{{ lang.table4 }}</th>
          <td>
            <BFormSelect
              class="ui-select"
              v-model="formData.viewScreen"
              :options="viewScreenOptions"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <template #footer>
      <BButton class="gray28" @click="modals.modalName.show = false">
        {{ lang.btn3 }}
      </BButton>
      <BButton class="blue28">
        {{ lang.btn4 }}
      </BButton>
    </template>
  </UiModal>

</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import UiModal from '@/components/UiModal.vue'
import G from '@/config/global.js'
import {
  BButton,
  BFormCheckbox,
  BPagination,
  BTable,
  BModal,
  BFormSelect,
  BFormInput,
  BFormFile,
} from 'bootstrap-vue-next'

/* --------------------------
   TABLE HEADER
--------------------------- */
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '5rem' } },
  { key: 'order', label: lang.value.table1 || '표시 순서', thStyle: { width: '10rem' } },
  { key: 'viewLabel', label: lang.value.table2 || '표시 레이블', thStyle: { width: '20rem' } },
  { key: 'viewType', label: lang.value.table3 || '분류', thStyle: { width: 'auto' } },
  { key: 'viewScreen', label: lang.value.table4 || '대상화면', thStyle: { width: '20rem' } },
])

/* --------------------------
   ITEMS
--------------------------- */
const items = ref([
  {
    id: 1,
    order: '1',
    viewLabel: '무선링크설정',
    viewType: '설정 / 연계설정관리 / 무선링크연동장치',
    viewScreen: '서비스 연결 설정',
  },
  {
    id: 2,
    order: '2',
    viewLabel: '녹음설정',
    viewType: '녹음관리 / 타체계녹음',
    viewScreen: '서비스 연결 설정',
  },
  {
    id: 3,
    order: '3',
    viewLabel: '보안장비설정',
    viewType: '설정 / 연계설정관리 / 보안장비연동장치',
    viewScreen: '서비스 연결 설정',
  },
])

/* 선택 항목 */
const selectedIds = ref([]) // 개별 선택 값
const isAllSelected = computed({
  get() {
    const pageIds = pagedItems.value.map((i) => i.id)
    return pageIds.length > 0 && pageIds.every((id) => selectedIds.value.includes(id))
  },
  set(value) {
    const pageIds = pagedItems.value.map((i) => i.id)
    if (value) {
      selectedIds.value = [...new Set([...selectedIds.value, ...pageIds])]
    } else {
      selectedIds.value = selectedIds.value.filter((id) => !pageIds.includes(id))
    }
  },
})

const modals = reactive({
  modalName: { show: false },
})

// 모달 폼 데이터
const formData = reactive({
  viewLabel: '',
  viewOrder: null,
  viewType1: null,
  viewType2: null,
  viewType3: null,
  viewScreen: null
})
// 표시 순서 옵션
const viewOrderOptions = computed(() => [
  { value: null, text: lang.value.optionTitle || '선택하세요' },
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
])
// 분류 옵션
const viewTypeOptions1 = computed(() => [
  { value: null, text: lang.value.optionTitle || '선택하세요' },
  { value: '설정', text: lang.value.option1 ?? '' },
])
const viewTypeOptions2 = computed(() => [
  { value: null, text: lang.value.optionTitle || '선택하세요' },
  { value: '연계설정관리', text: lang.value.option2 ?? '' },
])
const viewTypeOptions3 = computed(() => [
  { value: null, text: lang.value.optionTitle || '선택하세요' },
  { value: '무선링크연동장치', text: lang.value.option3 ?? '' },
])
// 대상화면 옵션
const viewScreenOptions = computed(() => [
  { value: null, text: lang.value.optionTitle || '선택하세요' },
  { value: '서비스 연결 설정', text: lang.value.option4 ?? '' },
])

/* --------------------------
   PAGINATION
--------------------------- */
const currentPage = ref(1)
const perPage = ref(5)
const totalRows = computed(() => items.value.length)

const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return items.value.slice(start, start + perPage.value)
})

/* --------------------------
   LANGUAGE
--------------------------- */
const ko = {
  btn1: '등록',
  btn2: '삭제',
  btn3: '취소',
  btn4: '저장',
  popupTitle: '바로가기 수정',
  table1: '표시 순서',
  table2: '표시레이블',
  table3: '분류',
  table4: '대상화면',
  optionTitle: '선택하세요',
  option1: '설정',
  option2: '연계설정관리',
  option3: '무선링크연동장치',
  option4: '서비스 연결 설정',
}
const en = {
  btn1: '등록',
  btn2: '삭제',
  btn3: '취소',
  btn4: '저장',
  popupTitle: '바로가기 수정',
  table1: '표시 순서',
  table2: '표시레이블',
  table3: '분류',
  table4: '대상화면',
  optionTitle: '선택하세요',
  option1: '설정',
  option2: '연계설정관리',
  option3: '무선링크연동장치',
  option4: '서비스 연결 설정',
}
const lang = ref({})

onMounted(() => {
  lang.value = G.lang === 'ko' ? ko : en
})

/* --------------------------
   MODAL
--------------------------- */
const isModalOpen = ref(false)
const selectedItem = ref(null)
const openModal = (item) => {
  selectedItem.value = item
  isModalOpen.value = true
}
</script>
