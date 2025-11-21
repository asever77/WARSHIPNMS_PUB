<template>
  <div class="container mt-4">
    <h3 class="mb-4">Dropdowns Guide (UiDropdowns)</h3>

    <div class="d-flex flex-wrap gap-2">
      <!-- 1. 기본 드롭다운 -->
      <UiDropdowns :items="basicItems" text="기본 드롭다운" @select="onSelect" />

      <!-- 2. 색상(variant) 및 크기(size) -->
      <UiDropdowns
        :items="basicItems"
        text="Success, Large"
        variant="success"
        size="lg"
        @select="onSelect"
      />
      <UiDropdowns
        :items="basicItems"
        text="Info, Small"
        variant="info"
        size="sm"
        @select="onSelect"
      />

      <!-- 3. 분할(split) 버튼 드롭다운 -->
      <UiDropdowns
        :items="basicItems"
        text="분할 버튼"
        split
        variant="secondary"
        @select="onSelect"
      />

      <!-- 4. 위로 펼치기(dropup) -->
      <UiDropdowns :items="basicItems" text="Dropup" dropup variant="dark" @select="onSelect" />

      <!-- 6. 컨텐츠내용 포함 드롭다운 -->
      <UiDropdowns
        :items="contentItems"
        text="컨텐츠내용"
        variant="outline-secondary"
        @select="onSelect"
      />
    </div>

    <div v-if="selectedItem" class="alert alert-primary mt-4">
      선택된 아이템: <strong>{{ selectedItem.text }}</strong> (value: {{ selectedItem.value }})
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import UiDropdowns from '@/components/UiDropdowns.vue'

export default {
  name: 'DropdownsGuide',
  components: { UiDropdowns },
  setup() {
    const basicItems = ref([
      { text: '첫 번째 액션', value: 'action-1' },
      { text: '두 번째 액션', value: 'action-2' },
      { divider: true },
      { text: '비활성화된 액션', value: 'action-3', disabled: true },
      { text: '세 번째 액션', value: 'action-4' },
    ])

    const contentItems = ref([
      {
        text: '<p style="width:30rem">As options can be passed via data attributes or JavaScript, you can append an option name to <code>data-bs-</code>, as in <code>data-bs-animation="{value}"</code>. Make sure to change the case type of the option name from “<em>camelCase</em>” to “<em>kebab-case</em>” when passing the options via data attributes. For example, use <code>data-bs-custom-class="beautifier"</code> instead of <code>data-bs-customClass="beautifier"</code>.</p>',
        content: true,
      },
    ])

    const selectedItem = ref(null)

    const onSelect = (item) => {
      console.log('Selected:', item)
      selectedItem.value = item
    }

    return {
      basicItems,
      contentItems,
      selectedItem,
      onSelect,
    }
  },
}
</script>
