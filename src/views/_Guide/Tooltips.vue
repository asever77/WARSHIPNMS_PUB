<template>
  <div class="container mt-4">
    <h3 class="mb-4">Tooltips Guide</h3>
    <p><code>v-bs-tooltip</code> 커스텀 디렉티브를 사용하여 툴팁을 쉽게 추가할 수 있습니다.</p>

    <h4>1. 위치 (Placement)</h4>
    <div class="d-flex flex-wrap gap-2 mb-5">
      <BButton v-bs-tooltip data-bs-placement="top" title="위쪽 툴팁입니다."> Top </BButton>
      <BButton v-bs-tooltip data-bs-placement="right" title="오른쪽 툴팁입니다."> Right </BButton>
      <BButton v-bs-tooltip data-bs-placement="bottom" title="아래쪽 툴팁입니다."> Bottom </BButton>
      <BButton v-bs-tooltip data-bs-placement="left" title="왼쪽 툴팁입니다."> Left </BButton>
    </div>

    <h4>2. 트리거 (Triggers)</h4>
    <p>툴팁이 나타나는 이벤트를 지정할 수 있습니다.</p>
    <div class="d-flex flex-wrap gap-2 mb-5">
      <BButton v-bs-tooltip data-bs-trigger="hover" title="마우스를 올리면 나타납니다.">
        Hover (기본값)
      </BButton>
      <BButton v-bs-tooltip data-bs-trigger="focus" title="포커스되면 나타납니다."> Focus </BButton>
      <BButton v-bs-tooltip data-bs-trigger="click" title="클릭하면 나타납니다."> Click </BButton>
    </div>

    <h4>3. HTML 컨텐츠</h4>
    <p>툴팁 내부에 HTML 태그를 포함할 수 있습니다.</p>
    <div class="d-flex flex-wrap gap-2 mb-5">
      <BButton
        v-bs-tooltip
        data-bs-html="true"
        title="<strong>굵은 글씨</strong>와 <em>기울임꼴</em>을 포함한 툴팁"
      >
        HTML 툴팁
      </BButton>
    </div>

    <h4>4. 커스텀 스타일</h4>
    <p>CSS 변수를 사용하여 툴팁의 스타일을 직접 지정할 수 있습니다.</p>
    <div class="d-flex flex-wrap gap-2 mb-5">
      <BButton
        v-bs-tooltip
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        title="이 툴팁은 CSS 변수로 스타일이 적용되었습니다."
      >
        Custom Tooltip
      </BButton>
    </div>
  </div>
</template>

<script setup>
import { BButton } from 'bootstrap-vue-next'

</script>

<style>
.custom-tooltip {
  --bs-tooltip-bg: var(--bs-primary);
  --bs-tooltip-color: var(--bs-white);
  --bs-tooltip-arrow-color: var(--bs-primary);
}
</style>
