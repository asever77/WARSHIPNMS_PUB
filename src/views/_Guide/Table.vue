<template>
  <div class="container mt-4">
    <h3 class="mb-4">Table Guide (BTable)</h3>

    <h4>1. 기본 테이블</h4>
    <p>
      <code>items</code>와 <code>fields</code> props를 사용하여 간단하게 테이블을 생성할 수
      있습니다.
    </p>
    <div class="mb-5 p-3 border rounded">
      <BTable :items="basicItems" :fields="basicFields" striped hover></BTable>
    </div>

    <h4>2. 커스텀 필드 렌더링</h4>
    <p>슬롯(slot)을 사용하여 특정 필드의 표시 형식을 직접 지정할 수 있습니다.</p>
    <div class="mb-5 p-3 border rounded">
      <BTable :items="basicItems" :fields="customFields" striped>
        <template #cell(age)="data">
          <span class="text-success">{{ data.value }} 세</span>
        </template>
        <template #cell(isActive)="data">
          <span :class="data.value ? 'text-success' : 'text-danger'">
            {{ data.value ? '활성' : '비활성' }}
          </span>
        </template>
      </BTable>
    </div>

    <h4>3. 정렬, 필터링, 페이지네이션</h4>
    <p>BTable은 정렬, 필터링, 페이지네이션 기능을 쉽게 추가할 수 있습니다.</p>
    <div class="mb-5 p-3 border rounded">
      <BFormGroup label="필터:" label-for="filter-input" label-cols-sm="1" class="mb-3">
        <BInputGroup>
          <BFormInput
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="검색어를 입력하세요..."
          ></BFormInput>
          <BButton :disabled="!filter" @click="filter = ''">지우기</BButton>
        </BInputGroup>
      </BFormGroup>

      <BTable
        :items="pagedItems"
        :fields="pagedFields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        @filtered="onFiltered"
        responsive
        striped
        hover
        sort-icon-left
      ></BTable>

      <div class="d-flex justify-content-center">
        <BPagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
        ></BPagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BTable, BPagination, BButton, BInputGroup } from 'bootstrap-vue-next'
import { BFormGroup, BFormInput } from 'bootstrap-vue-next/components'

// 1. 기본 테이블 데이터
const basicFields = ref(['first_name', 'last_name', 'age'])
const basicItems = ref([
  { age: 40, first_name: 'Dickerson', last_name: 'Macdonald', isActive: true },
  { age: 21, first_name: 'Larsen', last_name: 'Shaw', isActive: false },
  { age: 89, first_name: 'Geneva', last_name: 'Wilson', isActive: true },
])

// 2. 커스텀 필드 데이터
const customFields = ref([
  { key: 'first_name', label: '이름' },
  { key: 'last_name', label: '성' },
  { key: 'age', label: '나이' },
  { key: 'isActive', label: '활성 상태' },
])

// 3. 페이지네이션 테이블 데이터
const pagedFields = ref([
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: '이름', sortable: true },
  { key: 'category', label: '카테고리', sortable: true },
])

const pagedItems = ref(
  Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `아이템 ${i + 1}`,
    category: `카테고리 ${String.fromCharCode(65 + (i % 5))}`,
  })),
)

const filter = ref('')
const currentPage = ref(1)
const perPage = ref(5)
const totalRows = computed(() => pagedItems.value.length)

const onFiltered = (filteredItems) => {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}
</script>