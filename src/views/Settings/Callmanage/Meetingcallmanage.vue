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
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter2 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter2 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter3 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter3 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>

        <th scope="row">
          <div class="ui-flex" data-item-align="center" data-gap="4">
            <span class="ui-flex-1">{{ lang.filter4 }}</span>
            <BButton class="btn-sort ui-shrink-0" aria-sort="descending" aria-label="{{ lang.filter4 }} {{ lang.sortAll }}"></BButton>
          </div>
        </th>
        <td>
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
      <BTable :items="paginatedItems" :fields="fields" bordered hover small responsive>
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
        <!-- th2 컬럼을 다운로드 링크로 렌더링 -->

        <template #cell(th7)="data">
          <div v-if="data.item.th7 && data.item.th7.split('\n').length <= 4" v-html="data.item.th7.replace(/\n/g, '<br>')"></div>
          <div v-else>
            <BTooltip placement="right" triggers="click" class="tooltip-td">
              <template #target="{ on, attrs }">
                <BButton
                  v-bind="attrs"
                  v-on="on"
                  variant="link"
                  style="padding:0;min-width:0;vertical-align:top;text-decoration: none;color: #3E3E3E;"
                >
                  <span v-html="data.item.th7.split('\n').slice(0,4).join('<br>')"></span>
                  <span v-if="data.item.th7.split('\n').length > 4" style="color:#007bff;"> +{{ data.item.th7.split('\n').length - 4 }}</span>
                </BButton>
              </template>
              <div style="max-width:220px;white-space:normal;" v-html="data.item.th7.replace(/\n/g, '<br>')"></div>
            </BTooltip>
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
    <BButton class="blue28" @click="modals.modal1.show = true">{{ lang.btn1 }}</BButton>
    <BButton class="gray28">{{ lang.btn3 }}</BButton>
  </div>

  <UiModal
    v-model="modals.modal1.show"
    :title="lang.modalTitle1"
    type="modal"
    size="xlg"
    @close-btn-click="modals.modal1.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 14rem" />
          <col style="width: auto" />
          <col style="width: 14rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.modalTh1_1 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
            <th scope="row">{{ lang.modalTh1_2 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ {value: '1', text: '선택',} ]" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_3 }}</th>
            <td>
              <BFormInput type="text" class="ui-input" />
            </td>
            <th scope="row">{{ lang.modalTh1_4 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ {value: '1', text: '선택',} ]" />
            </td>
          </tr>

          <tr>
            <th scope="row">{{ lang.modalTh1_5 }}</th>
            <td>
              <BFormSelect class="ui-select" :options="[ {value: '1', text: '선택',} ]" />
            </td>
            <th scope="row"></th>
            <td></td>
          </tr>

        </tbody>
      </table>

      <div class="base-wrap">
        <div class="base-wrap-top-box">
          <h3 class="text-14-700">{{ lang.modalTh1_6 }}</h3>
        </div>
        <div class="ui-flex" data-gap="16" data-item-align="start">
          <div class="table-col-1">
            <div class="ui-flex" data-justify-align="end">
              <div class="ui-search-with-btn">
                <BFormInput class="ui-input-28" />
                <button type="button" class="btn-search-icon" aria-label="검색"></button>
              </div>
            </div>
            <div class="mt-8 ui-thead-sticky" data-max-h="210">
              <table class="table-type-a" data-td-align="center">
                <colgroup>
                  <col style="width: 4rem" />
                  <col style="width: 7rem" />
                  <col style="width: auto" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" style="height:6rem"><BFormCheckbox /></th>
                    <th scope="col" style="height:6rem">{{ lang.colTh2_2 }}</th>
                    <th scope="col" style="height:6rem">{{ lang.colTh2_3 }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><BFormCheckbox /></td>
                    <td>1001</td>
                    <td>장치명 내용</td>
                  </tr>
                  <tr>
                    <td><BFormCheckbox /></td>
                    <td>1001</td>
                    <td>장치명 내용</td>
                  </tr>
                  <tr>
                    <td><BFormCheckbox /></td>
                    <td>1001</td>
                    <td>장치명 내용</td>
                  </tr>
                  <tr>
                    <td><BFormCheckbox /></td>
                    <td>1001</td>
                    <td>장치명 내용</td>
                  </tr>
                  <tr>
                    <td><BFormCheckbox /></td>
                    <td>1001</td>
                    <td>장치명 내용</td>
                  </tr>
                  <tr>
                    <td><BFormCheckbox /></td>
                    <td>1001</td>
                    <td>장치명 내용</td>
                  </tr>
                  <tr>
                    <td><BFormCheckbox /></td>
                    <td>1001</td>
                    <td>장치명 내용</td>
                  </tr>
                  <tr>
                    <td><BFormCheckbox /></td>
                    <td>1001</td>
                    <td>장치명 내용</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="ui-shrink-0 ui-flex" data-gap="8" data-direction="col" data-self="center">
            <BButton class="blue24 min-w-0">{{ lang.btn6 }} >> </BButton>
            <BButton class="gray24 min-w-0"> << {{ lang.btn4 }}</BButton>
          </div>
          <div class="ui-flex-1">
            <div class="ui-flex" data-justify-align="end">
              <div class="ui-search-with-btn">
                <BFormInput class="ui-input-28" />
                <button type="button" class="btn-search-icon" aria-label="검색"></button>
              </div>
            </div>
            <div class="ui-thead-sticky mt-8"  data-max-h="210">
              <table class="table-type-a" data-td-align="center">
                <colgroup>
                  <col style="width: 5rem" />
                  <col style="width: 7rem" />
                  <col style="width: auto" />
                  <col style="width: 5rem" span="2" />
                  <col style="width: 7rem" />
                  <col style="width: 5rem" span="4" />
                </colgroup>
                <thead>
                  <tr>
                    <th rowspan="2" scope="col"><BFormCheckbox /></th>
                    <th rowspan="2" scope="col">{{ lang.colTh2_2 }}</th>
                    <th rowspan="2" scope="col">{{ lang.colTh2_3 }}</th>
                    <th colspan="2" scope="col">{{ lang.colTh2_4 }}</th>
                    <th rowspan="2" scope="col">{{ lang.colTh2_5 }}</th>
                    <th colspan="2" scope="col">{{ lang.colTh2_6 }}</th>
                    <th colspan="2" scope="col">{{ lang.colTh2_7 }}</th>
                  </tr>
                  <tr>
                    <th scope="col" class="l-line">{{ lang.colTh2_4_1 }}</th>
                    <th scope="col">{{ lang.colTh2_4_2 }}</th>
                    <th scope="col">{{ lang.colTh2_6_1 }}</th>
                    <th scope="col">{{ lang.colTh2_6_1 }}</th>
                    <th scope="col">{{ lang.colTh2_7_1 }}</th>
                    <th scope="col">{{ lang.colTh2_7_1 }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><BFormCheckbox /></td>
                    <td>1002221</td>
                    <td>장치명 내용</td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                  </tr>
                  <tr>
                    <td><BFormCheckbox /></td>
                    <td>1002221</td>
                    <td>장치명 내용</td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                    <td><BFormCheckbox /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modal1.show = false">{{ lang.btn4 }}</BButton>
      <BButton class="blue28">{{ lang.btn1 }}</BButton>
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
import { BFormInput, BFormSelect, BButton, BFormGroup, BPagination, BTable, BFormCheckbox, BTooltip } from 'bootstrap-vue-next/components'
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

  filter1: '회의통화 번호',
  filter2: '회의통화 이름',
  filter3: '회의통화 멤버',
  filter4: '등록일',

  btn1: '등록',
  btn2: '일괄등록',
  btn3: '삭제',
  btn4: '취소',
  btn5: '저장',
  btn6: '선택',
  btn7: '통화기능키 설정 ',

  colTh1: 'No',
  colTh2: '회의통화 번호',
  colTh3: '회의통화 이름',
  colTh4: '응답모드',
  colTh5: '통화모드',
  colTh6: '멤버 수',
  colTh7: '회의통화 멤버',
  colTh8: '등록일',

  colTh2_1: '',
  colTh2_2: '번호',
  colTh2_3: '장치명',
  colTh2_4: '호출권한',
  colTh2_5: '발언 권한',
  colTh2_6: '출력방향',
  colTh2_7: '호출알림',
  colTh2_4_1: '발신',
  colTh2_4_2: '착신',
  colTh2_6_1: '왼쪽',
  colTh2_6_2: '오른쪽',
  colTh2_7_1: '벨소리',
  colTh2_7_2: '알림등',

  modalTitle1: '회의통화 목록',

  modalTh1_1: '회의통화 이름',
  modalTh1_2: '응답모드',
  modalTh1_3: '회의통화 번호',
  modalTh1_4: '통화모드',
  modalTh1_5: '녹음제어',
  modalTh1_6: '회의통화 멤버',

}
const en = {}
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
const selectedIds = ref([]) // 선택된 행 id
const currentPage = ref(1) // 현재 페이지
const perPage = ref(5) // 페이지당 개수
const perPageOptions = [ { value: 5, text: '5' }, { value: 10, text: '10' }, { value: 15, text: '15' } ]

// 실제 데이터 연동 시 아래 부분을 교체하세요
// 임시 샘플 데이터 생성 함수
function generateItems(n) {
  const arr = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      id: i,
      th1: String(i),
      th2: '9003',
      th3: 'th3 내용',
      th4: '수동연결',
      th5: '일반',
      th6: '10',
      th7: '1002 : BRDG2 CONN\n1003 : BIDG3\n1004 : RU001\n1005 : RU002\n1006 : RU003\n1007 : RU004',
      th8: '2025.12.12 11:22:00',
    })
  }
  return arr
}
const items = ref(generateItems(40)) // 임시 데이터 40개
const fields = computed(() => [
  { key: 'select', label: '', thStyle: { width: '3rem' } },
  { key: 'th1', label: lang.value.colTh1, thStyle: { width: '5rem' } },
  { key: 'th2', label: lang.value.colTh2, thStyle: { width: '8rem' } },
  { key: 'th3', label: lang.value.colTh3, thStyle: { width: '15rem' } },
  { key: 'th4', label: lang.value.colTh4, thStyle: { width: '10rem' } },
  { key: 'th5', label: lang.value.colTh5, thStyle: { width: '10rem' } },
  { key: 'th6', label: lang.value.colTh6, thStyle: { width: '7rem' } },
  { key: 'th7', label: lang.value.colTh7, thStyle: { width: 'auto' } },
  { key: 'th8', label: lang.value.colTh8, thStyle: { width: '14rem' } },
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

// =========================
// [초기화]
// =========================
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
