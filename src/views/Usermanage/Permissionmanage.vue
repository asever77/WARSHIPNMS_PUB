<template>
  <div class="base-wrap">
    <div class="search-base">
      <div class="search-base--form">
        <!-- 검색구분 기준 선택 -->
        <BFormGroup :label="lang.text2" label-for="search-deviceType">
          <BFormSelect
            id="search-deviceType"
            class="ui-select-28"
            v-model="filterField"
            :options="filterFieldOptions"
          />
        </BFormGroup>

        <!-- 검색어 입력 -->
        <BFormGroup :label="lang.text10" label-for="search-word">
          <BFormInput
            id="search-word"
            v-model="filterText"
            :placeholder="lang.text11"
            class="ui-input-28"
          />
        </BFormGroup>
        <BFormRadioGroup v-model="radioSelected" :options="radioOptions" name="radio-group-1" />
      </div>
      <div class="search-base--btns">
        <BButton class="blue28" @click="onFilter">
          {{ lang.text5 }}
        </BButton>
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
      >
        <template #cell(index)="{ index }">
          {{ (currentPage - 1) * perPage + index + 1 }}
        </template>
        <!-- 라디오 버튼은 검색 영역에만 사용, 테이블에서는 제거 -->
        <template #cell(setting)="{ item }">
          <BButton v-if="item.setting !== false" class="gray24 min-w-0" @click="openModal(item)">{{ lang.table6 }}</BButton>
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

  <UiModal v-model="modals.modalName.show" :title="lang.text1" type="modal" size="md" scrollable @close-btn-click="modals.modalName.show = false">
    <div class="base-table">
      <!-- <BTable
        :items="selectedRow ? [selectedRow] : []"
        :fields="modalFields"
        bordered
        hover
        small
        responsive
      >
      </BTable> -->
      <div class="base-wrap">
        <MenuTree :nodes="selectedRow ? perUserMenuTrees[selectedRow.userId] : menuTreeData" />
      </div>
    </div>
    <template #footer>
      <BButton class="gray28" @click="modals.modalName.show = false">{{ lang.text17 || '취소' }}</BButton>
      <BButton class="blue28" @click="saveUserMenu">{{ lang.text18 || '저장' }}</BButton>
    </template>
  </UiModal>

</template>

<script setup>
import MenuTree from '@/components/MenuTree.vue';
import UiModal from '@/components/UiModal.vue'
import { BTable, BButton, BFormInput, BFormRadioGroup, BFormGroup, BFormSelect, BPagination } from 'bootstrap-vue-next';
import G from "@/config/global.js";

// 메뉴 트리 데이터(JSON)
const menuTreeData = ref([
  {
    label: '설정',
    checked: false,
    children: [
      { label: '단말관리', checked: false },
      { label: '연계설정관리', checked: false },
      { label: '통화관리', checked: false, children: [
        { label: '가입자관리', checked: false },
        { label: '회의통화관리', checked: false },
        { label: '그룹통화관리', checked: false }
      ] },
      { label: '외부연계관리', checked: false },
      { label: '장치관리', checked: false },
      { label: '도면관리', checked: false },
    ]
  },
  { label: '통화연결 설정', checked: false },
  { label: '장치운영', checked: false },
  { label: '통계', checked: false },
  { label: '이력', checked: false },
]);

import { ref, onMounted, computed, reactive } from 'vue';

// --- 데이터 ---
const items = ref([
  { userId: 'user01', userName: '홍길동', userLevel: '관리자', menuAuth: '전체', setting: true },
  { userId: 'user02', userName: '김철수', userLevel: '일반', menuAuth: '조회', setting: false },
  { userId: 'user03', userName: '이영희', userLevel: '일반', menuAuth: '수정', setting: true },
]);

const fields = computed(() => [
  { key: 'index', label: lang.value.table1 || '순번', thStyle: { width: '5rem' }, tdClass: 'text-center' },
  { key: 'userId', label: lang.value.table2 || '사용자 ID', thStyle: { width: '14rem' }, tdClass: 'text-center' },
  { key: 'userName', label: lang.value.table3 || '사용자 명', thStyle: { width: '14rem' }, tdClass: 'text-center' },
  { key: 'userLevel', label: lang.value.table4 || '사용자 등급', thStyle: { width: '14rem' }, tdClass: 'text-center' },
  { key: 'menuAuth', label: lang.value.table5 || '메뉴권한', thStyle: { width: 'auto' }, tdClass: 'text-start' },
  { key: 'setting', label: lang.value.table6 || '설정', thStyle: { width: '8rem' }, tdClass: 'text-center' }
]);

const modalFields = computed(() => [
  { key: 'userId', label: lang.value.table2 || '사용자 ID', thStyle: { width: '12rem' }, tdClass: 'text-center' },
  { key: 'userName', label: lang.value.table3 || '사용자 명', thStyle: { width: '12rem' }, tdClass: 'text-center' },
  { key: 'userLevel', label: lang.value.table4 || '사용자 등급', thStyle: { width: '12rem' }, tdClass: 'text-center' }
]);

const filterField = ref('');
const filterText = ref('');
const searchField = ref('');
const searchText = ref('');

const filterFieldOptions = computed(() => [
  { value: '', text: lang.value.text12 || '전체' },
  { value: '근무지', text: '근무지' },
  { value: '사용자 등급', text: '사용자 등급' }
]);

const filteredItems = computed(() => {
  return items.value.filter(item => {
    let matchType = true;
    if (searchField.value === '사용자 등급') {
      matchType = item.userLevel && item.userLevel.includes(searchText.value);
    } else if (searchField.value === '근무지') {
      matchType = true;
    }
    const matchText = !searchText.value ||
      item.userId.includes(searchText.value) ||
      item.userName.includes(searchText.value) ||
      item.userLevel.includes(searchText.value) ||
      item.menuAuth.includes(searchText.value);
    return matchType && matchText;
  });
});

const modals = reactive({
  modalName: { show: false },
});



const ko = {
  text1: "메뉴 권한관리",
  text2: "검색구분",
  text3: "검색어",
  text4: "전체",
  text5: "조회",
  text6: "등록",
  text7: "삭제",
  text8: "취소",
  text9: "저장",
  table1: "순번",
  table2: "사용자 ID",
  table3: "사용자 명",
  table4: "사용자 등급",
  table5: "메뉴권한",
  table6: "설정",
};

const en = {
  text1: "Manual Content",
  text2: "Device Type",
  text3: "Device Name",
  text4: "File Name",
  text5: "Download",
  text6: "Upload Date",
  text7: "Register",
  text8: "Delete",
  text9: "Search",
  table1: "순번",
  table2: "사용자 ID",
  table3: "사용자 명",
  table4: "사용자 등급",
  table5: "메뉴권한",
  table6: "설정",
};

const lang = ref({});

const currentPage = ref(1)
const perPage = ref(10)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredItems.value.slice(start, start + perPage.value)
})

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  if (filterFieldOptions.value.length > 0) {
    filterField.value = filterFieldOptions.value[0].value;
  }
});

function onFilter() {
  searchField.value = filterField.value
  searchText.value = filterText.value
  currentPage.value = 1
}

// 라디오 버튼 옵션 및 상태 추가
const radioOptions = [
  { value: '사용', text: '사용' },
  { value: '사용안함', text: '사용안함' }
];
const radioSelected = ref('사용');


// 선택된 행 정보 저장
const selectedRow = ref(null);

function openModal(item) {
  selectedRow.value = item;
  // 사용자별 트리 초기화: 없으면 기본 트리로 생성
  if (!perUserMenuTrees[item.userId]) {
    perUserMenuTrees[item.userId] = createDefaultMenuTree();
  }
  modals.modalName.show = true;
}

// 사용자별 메뉴 트리 저장소
const perUserMenuTrees = reactive({});

// 기본 트리 생성 함수 (딥 클론)
function createDefaultMenuTree() {
  const src = menuTreeData.value;
  const clone = (arr) => arr.map(node => ({
    label: node.label,
    checked: !!node.checked,
    children: node.children ? clone(node.children) : undefined
  }));
  return clone(src);
}

// 저장 버튼 핸들러 (예시: 현재 트리를 문자열 요약으로 items.menuAuth에 저장)
function saveUserMenu() {
  if (!selectedRow.value) return;
  const uid = selectedRow.value.userId;
  const tree = perUserMenuTrees[uid] || [];
  // 선택된 메뉴 라벨만 모아 간단히 저장 (필요 시 API 연동)
  const selectedLabels = [];
  const walk = (nodes) => {
    nodes.forEach(n => {
      if (n.checked) selectedLabels.push(n.label);
      if (n.children && n.children.length) walk(n.children);
    });
  };
  walk(tree);
  // items 테이블의 해당 사용자 menuAuth 필드 업데이트 (예시)
  const idx = items.value.findIndex(i => i.userId === uid);
  if (idx !== -1) {
    items.value[idx].menuAuth = selectedLabels.length ? selectedLabels.join(', ') : '조회';
  }
  modals.modalName.show = false;
}
</script>
