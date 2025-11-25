<template>
  <div class="container mt-5">
    <BTable
      :items="items"
      :fields="fieldsNoSort"
      bordered
      hover
      small
      responsive
    >
      <template #cell(select)="data">
        <BFormCheckbox
          v-model="selectedIds"
          :value="data.item.id"
          @change="onSelectChange"
        />
      </template>

      <template #cell(select2)="data">
        <BFormRadio
          v-model="selectedId"
          :value="data.item.id"
          name="user-select"
          @change="onRadioChange(data.item)"
        />
      </template>

      <template #cell(name)="data">
        <BFormInput
          v-model="data.item.name"
          size="sm"
          @change="onInputChange(data.item, 'name')"
          placeholder="이름 입력"
        />
      </template>
      
      <template #cell(status)="data">
        <BFormSelect
          v-model="data.item.status"
          :options="statusOptions"
          size="sm"
          @change="onStatusChange(data.item)"
        />
      </template>

      <template #cell(actions)="data">
        <BButton
          size="sm"
          variant="danger"
          @click="handleDelete(data.item)"
        >
          삭제
        </BButton>
      </template>
    </BTable>

    <div class="d-flex justify-content-center mt-4">
      <BPagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="user-table"
        @change="onPageChange"
      />
    </div>

    <p class="text-center mt-2">현재 페이지: {{ currentPage }}</p>
    
    
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>하단 테이블 필터 조회</h5>
      <div class="d-flex align-items-center w-50">
        <!-- 필터 기준 선택 -->
        <BFormSelect
          v-model="filterField"
          :options="filterFieldOptions"
          size="sm"
          class="me-2"
        />
        <!-- 검색어 입력 -->
        <BFormInput
          v-model="filterText"
          size="sm"
          placeholder="검색어 입력"
          class="me-2"
        />
        <BButton size="sm" variant="primary" @click="onFilter">
          조회
        </BButton>
        <BButton size="sm" variant="secondary" class="ms-2" @click="onReset">
          초기화
        </BButton>
      </div>
    </div>

    <BTable
      :items="filteredItems"
      :fields="fields"
      bordered
      hover
      small
      responsive
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      @sort-changed="onSortChanged"
    >
      <template #cell(select)="data">
        <BFormCheckbox
          v-model="selectedIds"
          :value="data.item.id"
          @change="onSelectChange"
        />
      </template>

      <template #cell(select2)="data">
        <BFormRadio
          v-model="selectedId"
          :value="data.item.id"
          name="user-select2"
          @change="onRadioChange(data.item)"
        />
      </template>

      <template #cell(name)="data">
        <BFormInput
          v-model="data.item.name"
          size="sm"
          @change="onInputChange(data.item, 'name')"
          placeholder="이름 입력"
        />
      </template>
      
      <template #cell(status)="data">
        <BFormSelect
          v-model="data.item.status"
          :options="statusOptions"
          size="sm"
          @change="onStatusChange(data.item)"
        />
      </template>

      <template #cell(actions)="data">
        <BButton
          size="sm"
          variant="danger"
          @click="handleDelete(data.item)"
        >
          삭제
        </BButton>
      </template>
    </BTable>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { BTable, BButton, BFormCheckbox, BFormRadio, BFormInput, BFormSelect, BPagination } from 'bootstrap-vue-next'

// --- 데이터 ---
const sortBy = ref(['name'])
const sortDesc = ref(false)
const perPage = ref(5)
const currentPage = ref(1)

const fields = [
  { key: 'select', label: '', class: 'text-center', sortable: false },
  { key: 'select2', label: '', class: 'text-center', sortable: false },
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: '이름', sortable: true },
  { key: 'email', label: '이메일', sortable: true },
  { key: 'status', label: '상태', sortable: true },
  { key: 'actions', label: '작업', sortable: false },
]

const items = ref([
  { id: 1, name: '홍길동', email: 'hong@example.com', status: 'active' },
  { id: 2, name: '김철수', email: 'kim@example.com', status: 'pending' },
  { id: 3, name: '이영희', email: 'lee@example.com', status: 'inactive' },
  { id: 4, name: '박보검', email: 'park@example.com', status: 'active' },
])

const selectedIds = ref([])
const selectedId = ref(null)

const statusOptions = [
  { value: 'active', text: '활성' },
  { value: 'pending', text: '대기' },
  { value: 'inactive', text: '비활성' },
]

const filterField = ref('name')
const filterFieldOptions = [
  { value: 'name', text: '이름' },
  { value: 'email', text: '이메일' },
]
const filterText = ref('')

// --- 필터링 / 정렬 ---
const filteredItems = ref([...items.value])

const sortedItems = computed(() => {
  let list = [...filteredItems.value]
  if (sortBy.value.length) {
    const key = sortBy.value[0]
    list.sort((a, b) => {
      if (a[key] < b[key]) return sortDesc.value ? 1 : -1
      if (a[key] > b[key]) return sortDesc.value ? -1 : 1
      return 0
    })
  }
  return list
})

const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return sortedItems.value.slice(start, end)
})

// --- 메서드 ---
const onPageChange = (page) => {
  currentPage.value = page
}

const onSelectChange = () => {
  console.log('선택된 항목:', selectedIds.value)
}

const handleDelete = (item) => {
  if (confirm(`${item.name}님을 삭제하시겠습니까?`)) {
    items.value = items.value.filter(i => i.id !== item.id)
    selectedIds.value = selectedIds.value.filter(id => id !== item.id)
    filteredItems.value = filteredItems.value.filter(i => i.id !== item.id)
  }
}

const onRadioChange = (item) => {
  console.log('선택된 사용자:', item)
}

const onStatusChange = (item) => {
  console.log(`행 ${item.id}의 상태 변경 →`, item.status)
}

const onInputChange = (item, field) => {
  console.log(`입력 변경됨: ${field} (${item.id}) →`, item[field])
}

const onSortChanged = (ctx) => {
  sortBy.value = ctx.sortBy
  sortDesc.value = ctx.sortDesc
}

const onFilter = () => {
  const keyword = filterText.value.trim().toLowerCase()
  if (!keyword) {
    filteredItems.value = [...items.value]
    return
  }
  filteredItems.value = items.value.filter(item => {
    const value = String(item[filterField.value]).toLowerCase()
    return value.includes(keyword)
  })
  currentPage.value = 1
}

const onReset = () => {
  filterText.value = ''
  filteredItems.value = [...items.value]
  currentPage.value = 1
}

// --- watch items 변경시 filteredItems 초기화 ---
watch(items, () => {
  filteredItems.value = [...items.value]
})
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>