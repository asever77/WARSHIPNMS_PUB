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

<script>
import { BTable, BButton, BFormCheckbox, BFormRadio, BFormInput, BFormSelect, BPagination } from 'bootstrap-vue-next'

export default {
  name: 'BasicFunctionsView',
  components: {
    BTable,
    BButton,
    BFormCheckbox,
    BFormRadio,
    BFormInput,
    BFormSelect,
    BPagination,
  },
  data() {
    return {
      sortBy: ['name'],
      sortDesc: false,
      perPage: 5,
      currentPage: 1,
      fieldsNoSort: [
        { key: 'select', label: '', class: 'text-center' },
        { key: 'select2', label: '', class: 'text-center' },
        { key: 'id', label: 'ID' },
        { key: 'name', label: '이름' },
        { key: 'email', label: '이메일' },
        { key: 'status', label: '상태' },
        { key: 'actions', label: '작업' },
      ],
      fields: [
        { key: 'select', label: '', class: 'text-center', sortable: false },
        { key: 'select2', label: '', class: 'text-center', sortable: false },
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: '이름', sortable: true },
        { key: 'email', label: '이메일', sortable: true },
        { key: 'status', label: '상태', sortable: true },
        { key: 'actions', label: '작업', sortable: false },
      ],
      items: [
        { id: 1, name: '홍길동', email: 'hong@example.com', status: 'active' },
        { id: 2, name: '김철수', email: 'kim@example.com', status: 'pending' },
        { id: 3, name: '이영희', email: 'lee@example.com', status: 'inactive' },
        { id: 4, name: '박보검', email: 'park@example.com', status: 'active' },
      ],
      selectedIds: [],
      selectedId: null,
      statusOptions: [
        { value: 'active', text: '활성' },
        { value: 'pending', text: '대기' },
        { value: 'inactive', text: '비활성' },
      ],
      filterField: 'name',
      filterFieldOptions: [
        { value: 'name', text: '이름' },
        { value: 'email', text: '이메일' },
      ],
      filterText: '',
      filteredItems: [],
    }
  },

  computed: {
    rows() {
      return 12
    },
    pagedItems() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.items.slice(start, end)
    },
  },

  mounted() {
    this.filteredItems = this.items
  },

  methods: {
    onPageChange(page) {
      this.currentPage = page;
    },
    onSelectChange() {
      console.log('선택된 항목:', this.selectedIds)
    },
    handleDelete(item) {
      if (confirm(`${item.name}님을 삭제하시겠습니까?`)) {
        this.items = this.items.filter((i) => i.id !== item.id)
        this.selectedIds = this.selectedIds.filter((id) => id !== item.id)
      }
    },
    onRadioChange(item) {
      console.log('선택된 사용자:', item)
    },
    onStatusChange(item) {
      console.log(`행 ${item.id}의 상태 변경 →`, item.status)
    },
    onInputChange(item, field) {
      console.log(`입력 변경됨: ${field} (${item.id}) →`, item[field])
    },
    onSortChanged(ctx) {
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
    },
    onFilter() {
      const keyword = this.filterText.trim().toLowerCase()
      if (!keyword) {
        this.filteredItems = this.items
        return
      }
      this.filteredItems = this.items.filter((item) => {
        const value = String(item[this.filterField]).toLowerCase()
        return value.includes(keyword)
      })
    },
    onReset() {
      this.filterText = ''
      this.filteredItems = this.items
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>