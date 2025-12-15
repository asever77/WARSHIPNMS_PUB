<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 16rem" />
      <col style="width: auto" />
      <col style="width: 16rem" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter1 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="none" aria-label="{{ lang.filter1 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormSelect
            id="device-type"
            class="ui-select"
            :options="[
              {value: '1', text: '선택',}
            ]"
          ></BFormSelect>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter2 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter2 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormInput id="search-word" class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter3 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter5 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td colspan="3">
          <div
            class="ui-flex ui-data-box"
            data-item-align="center"
            data-gap="4"
          >
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
            aria-label="{{ lang.searchSelect }}"
          />
        </template>
        <template #cell(select)="data">
          <BFormCheckbox v-model="selectedIds" :value="data.item.id" />
        </template>
        <!-- th6: 다운로드 버튼 -->
        <template #cell(th6)="data">
          <BButton
            class="gray24 min-w-0"
            :href="data.item.downloadUrl || '#'"
            download
            target="_blank"
            rel="noopener"
          >
            {{ lang.btn5 }}
          </BButton>
        </template>
        <!-- th7: 복원 버튼 -->
        <template #cell(th7)="data">
          <BButton class="gray24 min-w-0" @click.stop="modals.modal2.show = true">{{ lang.btn6 }}</BButton>
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
    <BButton class="blue28" @click="modals.modal1.show = true">{{ lang.btn2 }}</BButton>
    <BButton class="gray28">{{ lang.btn3 }}</BButton>
    <BButton class="blue28" @click="modals.modal3.show = true">{{ lang.btn4 }}</BButton>
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
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh1_1 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_2 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_3 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <div class="ui-flex mt-4" data-direction="col" data-gap="8">
      <p class="fs-5 mb-4 ta-c fw-bold">운용정보를 백업하고 있습니다. <br />완료될 때 까지 기다려 주십시오. <br />완료되면 화면이 자동으로 갱신됩니다.</p>
      <p class="fs-5">통화연결설정 백업 중</p>
      <div class="ui-flex" data-direction="col" data-gap="4">
        <progress
          max="100"
          value="24"
          class="w-100"
          style="height: 2.4rem;"
        ></progress>
      </div>
    </div>

    <template #footer>
      <BButton class="gray28" @click="modals.modal1.show = false">{{ lang.btn8 }}</BButton>
      <BButton class="blue28">{{ lang.btn7 }}</BButton>
    </template>
  </UiModal>

  <UiModal
    v-model="modals.modal2.show"
    :title="lang.modalTitle2"
    type="modal"
    size="md"
    @close-btn-click="modals.modal2.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh2_1 }}</th>
            <td>복원 요청 버전 내용</td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh2_2 }}</th>
            <td>현재 운영 버전 내용</td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh2_3 }}</th>
            <td>
              <BFormInput type="password" class="ui-input" />
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <div class="ui-flex mt-4" data-direction="col" data-gap="8">
      <p class="fs-5 mb-4 ta-c fw-bold">현재 적용된 운용정보를 요청한 복원버전으로 변경하려면 <br />확인코드란에 로그인 패스워드를 입력하여 승인 해주세요.</p>

      <p class="fs-5 mb-4 ta-c fw-bold">요청한 운용정보를 복원하고 있습니다.<br /> 완료될 때 까지 기다려 주십시오. <br />완료되면 화면이 자동으로 갱신됩니다.</p>
      <p class="fs-5">장비로 동기화 요청 중…</p>
      <div class="ui-flex" data-direction="col" data-gap="4">
        <progress
          max="100"
          value="24"
          class="w-100"
          style="height: 2.4rem;"
        ></progress>
      </div>
    </div>

    <template #footer>
      <BButton class="gray28" @click="modals.modal2.show = false">{{ lang.btn8 }}</BButton>
      <BButton class="blue28">{{ lang.btn6 }}</BButton>
    </template>
  </UiModal>

  <UiModal
    v-model="modals.modal3.show"
    :title="lang.modalTitle3"
    type="modal"
    size="md"
    @close-btn-click="modals.modal3.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh3_1 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh3_2 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh3_3 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh3_4 }}</th>
            <td>
              <BFormInput type="file" class="ui-input" />
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <template #footer>
      <BButton class="gray28" @click="modals.modal3.show = false">{{ lang.btn8 }}</BButton>
      <BButton class="blue28">{{ lang.btn7 }}</BButton>
    </template>
  </UiModal>

</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
// NOTE: 컴포넌트 이름은 multi-word로 권장됨. 실제 이름 변경 시 파일명, 라우터 등 전체 영향 주의
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect, BButton, BFormTextarea, BPagination, BTable, BFormCheckbox } from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'

// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  sortAll: '전체 정렬',
  searchLabel: '검색어',
  searchSelect: '전체 선택/해제',
  searchPlaceholder: '검색어 입력',
  totalLabel: '전체',
  btnSearch: '조회',

  filter1: '백업명',
  filter2: '버전',
  filter3: '생성일시',

  btn1: '조회',
  btn2: '운용정보 백업',
  btn3: '삭제',
  btn4: '백업파일 등록',
  btn5: '다운로드',
  btn6: '복원',
  btn7: '저장',
  btn8: '취소',

  colTh1: 'No',
  colTh2: '백업명',
  colTh3: '버전명',
  colTh4: '생성일시',
  colTh5: '설명/비고',
  colTh6: '내보내기',
  colTh7: '복원',

  modalTitle1: '운용정보 백업 등록',
  modalTitle2: '운용정보 복원',
  modalTitle3: '백업파일 불러오기',

  modalTh1_1: '백업명',
  modalTh1_2: '버전명',
  modalTh1_3: '설명/비고',

  modalTh2_1: '복원 요청 버전',
  modalTh2_2: '현재 운용 버전',
  modalTh2_3: '확인코드',

  modalTh3_1: '백업명',
  modalTh3_2: '버전명',
  modalTh3_3: '설명/비고',
  modalTh3_4: '운용정보 백업 파일',
}
const en = {}
const lang = ref({})

// =========================
// [모달 상태 관리]
// =========================
const modals = reactive({
  modal1: { show: false },
  modal2: { show: false },
  modal3: { show: false },
})

// =========================
// [상태/폼/리스트 관리]
// =========================
const selectedIds = ref([]) // 선택된 행 id
const currentPage = ref(1) // 현재 페이지
const perPage = ref(10) // 페이지당 개수
const perPageOptions = [ { value: 10, text: '10' }, { value: 15, text: '15' }, { value: 20, text: '20' } ]

// 실제 데이터 연동 시 아래 부분을 교체하세요
// 임시 샘플 데이터 생성 함수
function generateItems(n) {
  const arr = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      id: i,
      th1: String(i),
      th2: 'th2 내용',
      th3: '1.6',
      th4: '2025-11-12 11:09:13',
      th5: 'th5 내용',
      th6: '',
      th7: '',
      downloadUrl: `/download/sample${i}.zip`,
    })
  }
  return arr
}
const items = ref(generateItems(40)) // 임시 데이터 40개
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: 'auto' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: '8rem' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: '14rem' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: 'auto' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '9rem' } },
  { key: 'th7', label: lang.value.colTh7, thStyle: { width: '9rem' } },
])

// 필터링/페이지네이션
const filteredItems = computed(() => items.value)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

// 체크박스 전체선택/부분선택
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
    const set = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(set)
  } else {
    selectedIds.value = selectedIds.value.filter(id => !pageIds.includes(id))
  }
}

// =========================
// [UI 이벤트 핸들러]
// =========================
function onRowClicked() { modals.modal2.show = true }

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
