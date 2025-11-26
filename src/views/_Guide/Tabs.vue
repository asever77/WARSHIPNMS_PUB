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

<script setup>
import { BTab } from 'bootstrap-vue-next'
import UiTabs from '@/components/UiTabs.vue'

// `<script setup>`에서는 components 등록이 필요 없음
// import 된 컴포넌트는 자동으로 템플릿에서 사용 가능
</script>