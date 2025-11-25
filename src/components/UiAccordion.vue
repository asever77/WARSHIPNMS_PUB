<template>
  <div :class="wrapperClass">
    <BAccordion v-bind="$attrs">
      <BAccordionItem
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :visible="item.visible === true"
      >
        <!-- 슬롯을 사용하여 부모로부터 컨텐츠를 전달받을 수 있도록 합니다. -->
        <slot :name="`item-${index}`">
          <!-- 슬롯이 없을 경우 기본 텍스트 컨텐츠를 표시합니다. -->
          <p>{{ item.content }}</p>
        </slot>
      </BAccordionItem>
    </BAccordion>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { BAccordion, BAccordionItem } from 'bootstrap-vue-next'

// props
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    default: 'box', // 'box', 'line'
  },
})

// computed
const wrapperClass = computed(() => {
  switch (props.type) {
    case 'line':
      return 'accordion-line'
    case 'box':
    default:
      return ''
  }
})
</script>

<style scoped>
/* 
  :deep() 선택자를 사용하여 자식 컴포넌트의 내부 요소에 스타일을 적용합니다.
  .accordion-line 클래스가 있을 때만 이 스타일이 적용됩니다.
*/

/* 기본 테두리와 배경 제거 */
.accordion-line:deep(.accordion-item) {
  background-color: transparent;
  border: none;
}

.accordion-line:deep(.accordion-header) {
  border-bottom: 1px solid #dee2e6;
}

/* 버튼 스타일 조정 */
.accordion-line:deep(.accordion-button) {
  background-color: transparent;
  box-shadow: none;
  padding-left: 0;
  padding-right: 0;
}

/* 열렸을 때 버튼 스타일 */
.accordion-line:deep(.accordion-button:not(.collapsed)) {
  color: var(--bs-primary);
}

/* 열렸을 때 아이콘 색상 변경 */
.accordion-line:deep(.accordion-button:not(.collapsed)::after) {
  background-image: var(--bs-accordion-active-icon);
}
</style>
