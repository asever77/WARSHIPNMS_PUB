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

<script>
import { BTabs } from 'bootstrap-vue-next'

export default {
  name: 'UiTabs',
  components: {
    BTabs,
  },
  computed: {
    wrapperClass() {
      switch (this.type) {
        case 'line':
          return 'tabs-line'
        case 'base':
          return '' // 'base' 타입일 때는 추가 클래스 없음
        default:
          return '' // 그 외의 경우에도 추가 클래스 없음
      }
    },
  },
  props: {
    // 탭 콘텐츠 영역에 적용할 CSS 클래스를 props로 받습니다.
    contentClass: {
      type: String,
      default: 'mt-3', // 기본값으로 'mt-3'을 설정합니다.
    },
    // 탭 스타일을 구분하기 위한 type prop
    type: {
      type: String,
      default: 'base', // 'base', 'line'
    },
  },
}
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
