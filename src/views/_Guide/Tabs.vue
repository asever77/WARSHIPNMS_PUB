<template>
  <div class="container mt-4">
    <!-- type="base" 또는 props를 생략하여 기본 스타일을 사용합니다. -->
    <UiTabs id="tabs-group-1" class="mb-5" type="base">
      <!-- 슬롯을 통해 BTab 컴포넌트들을 전달합니다. -->
      <BTab title="첫 번째 탭" active>
        <p>첫 번째 탭 그룹의 내용입니다.</p>
      </BTab>
      <BTab title="두 번째 탭">
        <p>두 번째 탭 그룹의 내용입니다.</p>
      </BTab>
      <BTab title="세 번째 탭">
        <p>세 번째 탭 그룹의 내용입니다.</p>
      </BTab>
    </UiTabs>

    <!-- type="line"을 전달하여 라인 스타일을 적용합니다. -->
    <UiTabs id="tabs-group-2" type="line">
      <!-- 슬롯을 통해 BTab 컴포넌트들을 전달합니다. -->
      <BTab title="1첫 번째 탭" active>
        <p>두 번째 탭 그룹의 내용입니다.</p>
      </BTab>
      <BTab title="2두 번째 탭">
        <p>두 번째 탭 그룹의 내용입니다.</p>
      </BTab>
      <BTab title="3세 번째 탭">
        <p>세 번째 탭에는 다른 컴포넌트나 복잡한 HTML을 넣을 수도 있습니다.</p>
      </BTab>
    </UiTabs>
  </div>
</template>

<script>
import { BTab } from 'bootstrap-vue-next' // BTab은 여전히 이 파일에서 직접 사용되므로 import합니다.
import UiTabs from '@/components/UiTabs.vue' // 새로 만든 컴포넌트를 import합니다.

export default {
  name: 'TabsView',
  components: {
    UiTabs, // 컴포넌트를 등록합니다.
    BTab,
  },
}
</script>
