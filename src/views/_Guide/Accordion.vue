<template>
  <div class="container mt-4">
    <h3 class="mb-4">Accordion Guide (UiAccordion)</h3>

    <h4>1. 기본 아코디언</h4>
    <p><code>type="box"</code> 또는 type prop을 생략하면 기본 부트스트랩 스타일이 적용됩니다.</p>
    <UiAccordion :items="basicItems" type="box" class="mb-5" />

    <h4>2. 라인 스타일 아코디언</h4>
    <p><code>type="line"</code>을 전달하면 각 아이템이 선으로 구분되는 스타일이 적용됩니다.</p>
    <UiAccordion :items="lineItems" type="line" class="mb-5" />

    <h4>3. 항상 하나만 열려있는 아코디언 (Flush)</h4>
    <p>
      <code>flush</code> 속성을 전달하면 경계선이 없는 아코디언이 되며, 하나를 열면 다른 하나는
      자동으로 닫힙니다.
    </p>
    <UiAccordion :items="flushItems" flush type="line" class="mb-5" />

    <h4>4. 여러 개를 동시에 열 수 있는 아코디언 (Free)</h4>
    <p><code>free</code> 속성을 전달하면 여러 아이템을 동시에 열어둘 수 있습니다.</p>
    <UiAccordion :items="freeItems" free type="line" class="mb-5" />

    <h4>5. 슬롯을 이용한 커스텀 컨텐츠</h4>
    <p>단순 텍스트가 아닌 복잡한 HTML이나 다른 컴포넌트를 내용으로 넣을 수 있습니다.</p>
    <UiAccordion :items="customContentItems" type="box">
      <template #item-1>
        <div class="alert alert-info mb-0">
          이 내용은 <strong>#item-1</strong> 슬롯을 통해 전달된 커스텀 컨텐츠입니다.
        </div>
      </template>
    </UiAccordion>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UiAccordion from '@/components/UiAccordion.vue'

defineOptions({
  name: 'AccordionGuide',
})

const basicItems = ref([
  { title: '첫 번째 아이템', content: '첫 번째 아이템의 내용입니다.' },
  { title: '두 번째 아이템', content: '두 번째 아이템의 내용입니다.' },
])

const lineItems = ref([
  { title: 'Line 스타일 아이템 #1', content: '이것은 라인 스타일의 첫 번째 아이템입니다.' },
  { title: 'Line 스타일 아이템 #2', content: '이것은 라인 스타일의 두 번째 아이템입니다.' },
])

const flushItems = ref([
  { title: 'Flush 아이템 #1', content: '이것은 첫 번째 아이템입니다.' },
  { title: 'Flush 아이템 #2', content: '이것은 두 번째 아이템입니다.', visible: true },
  { title: 'Flush 아이템 #3', content: '이것은 세 번째 아이템입니다.' },
])

const freeItems = ref([
  { title: 'Free 아이템 #1', content: '이 아이템은 다른 아이템과 함께 열려있을 수 있습니다.' },
  { title: 'Free 아이템 #2', content: '이 아이템도 마찬가지입니다.' },
])

const customContentItems = ref([
  { title: '기본 컨텐츠 아이템', content: '이 내용은 items prop을 통해 전달되었습니다.' },
  { title: '슬롯 컨텐츠 아이템' },
])
</script>