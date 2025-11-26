<template>
  <!-- 최상위 div에 동적으로 클래스를 바인딩합니다. -->
  <div :class="wrapperClass">
    <!-- BTabs 컴포넌트를 사용하여 탭의 기본 구조를 정의합니다. -->
    <BTabs :content-class="contentClass" v-bind="$attrs">
      <!-- 
        <slot>을 통해 부모 컴포넌트에서 전달하는 
        <BTab> 컴포넌트들을 이 위치에 렌더링합니다.
      -->
      <slot></slot>
    </BTabs>
  </div>
</template>

<script setup>
import { BTabs } from 'bootstrap-vue-next'
import { computed } from 'vue'

// Props 정의
const props = defineProps({
  contentClass: {
    type: String,
    default: 'mt-3',
  },
  type: {
    type: String,
    default: 'base', // 'base', 'line'
  },
})

// computed 변환
const wrapperClass = computed(() => {
  switch (props.type) {
    case 'line':
      return 'tabs-line'
    case 'base':
      return ''
    default:
      return ''
  }
})
</script>

<style scoped>
/* 
  :deep() 선택자를 사용하여 자식 컴포넌트인 BTabs의 내부 요소(nav-link)에 스타일을 적용합니다.
  .tabs-line 클래스가 있을 때만 이 스타일이 적용됩니다.
*/
.tabs-line:deep(.nav-link) {
  border: none;
  border-bottom: 2px solid transparent;
}

.tabs-line:deep(.nav-link.active) {
  border-bottom: 2px solid var(--bs-primary); /* 부트스트랩 기본 primary 색상 사용 */
  color: var(--bs-primary);
}

.tabs-line:deep(.nav-tabs) {
  border-bottom: 1px solid #dee2e6;
}
</style>
