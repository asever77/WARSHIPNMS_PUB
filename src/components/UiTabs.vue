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
    case 'userDevice':
      return 'tabs-iconbox'
    case 'base':
      return ''
    default:
      return ''
  }
})
</script>

<style scoped lang="scss">
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


.tabs-iconbox {
  width: 100%;
  height: 100%;

  .tab-content {
    height: 100%;
  }
}
.tabs-iconbox:deep(.tabs) {
  display: flex;
  width: 100%;
  .tab-content {
    flex:1;
    padding:1rem;
    margin-top: 0 !important;
  }
  & > div:first-child {
    background-color: #F2F2F2;
    padding: 1rem;
    width: 18rem;
    flex-shrink: 0;
  }
  .nav {
    display: flex;
    flex-direction: column;
    gap:.8rem;
  }
  .nav-link {
    display: flex;
    align-items: center;
    border-radius: .6rem;
    gap: 1rem;
    width:100%;
    min-height: 6rem;
    border:1px solid #D3D3D3;
    padding: 0.4rem 1rem;
    color: #333;
    background-color: #fff;
    transition: background-color 0.3s, color 0.3s;

    img {
      width: 2.6rem;
      height: 2.6rem;
      opacity: 0.6;
    }

    span {
      font-size: 1.2rem;
      color: #3D3D3D;
      font-weight: 500;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
      img {
        opacity: 0.3;
      }
    }
    &.active {
      border-color:#004173;
      background-color: #F6FBFF;
      box-shadow: 0 .3rem .4rem #006FFF0A;
      img {
        opacity: 1;
      }
      span {
        color: #001B30;
        font-weight: 700;
      }
    }
  }
}

</style>
