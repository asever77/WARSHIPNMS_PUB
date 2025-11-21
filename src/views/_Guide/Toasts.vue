<template>
  <div class="container mt-4">
    <h3 class="mb-4">Toasts Guide</h3>
    <p>
      <code>useToast()</code> 기능을 사용하여 애플리케이션 어디서든 토스트 메시지를 생성할 수
      있습니다.
    </p>

    <div class="d-flex flex-wrap gap-2">
      <!-- 1. 기본 토스트 -->
      <BButton @click="showBasicToast">기본 토스트</BButton>

      <!-- 2. 색상(variant) 토스트 -->
      <BButton variant="success" @click="showVariantToast('success', '성공')">
        Success 토스트
      </BButton>
      <BButton variant="danger" @click="showVariantToast('danger', '실패')">
        Danger 토스트
      </BButton>
      <BButton variant="warning" @click="showVariantToast('warning', '경고')">
        Warning 토스트
      </BButton>

      <!-- 3. 복잡한 컨텐츠 토스트 -->
      <BButton variant="info" @click="showComplexToast">복잡한 컨텐츠 토스트</BButton>

      <!-- 4. 자동으로 사라지지 않는 토스트 -->
      <BButton variant="secondary" @click="showNoAutoHideToast">사라지지 않는 토스트</BButton>

      <!-- 5. 위치 지정 토스트 -->
      <BButton variant="dark" @click="showPositionedToast">위치 지정 토스트 (하단 중앙)</BButton>

      <!-- 6. 단색 배경 토스트 -->
      <BButton variant="primary" @click="showSolidToast">단색 배경 토스트</BButton>
    </div>
  </div>
</template>

<script>
import { h } from 'vue'
import { BButton, useToast } from 'bootstrap-vue-next'

export default {
  name: 'ToastsGuide',
  components: { BButton },
  setup() {
    const toast = useToast()

    const showBasicToast = () => {
      toast.show({
        title: '기본 토스트',
        body: '이것은 기본 토스트 메시지입니다.',
      })
    }

    const showVariantToast = (variant, title) => {
      toast.show({
        title: `${title} 메시지`,
        body: `이것은 ${variant} 토스트입니다.`,
        variant: variant,
      })
    }

    const showComplexToast = () => {
      toast.show({
        title: '알림',
        body: h('div', {}, [h('strong', 'HTML'), ' 컨텐츠를 포함할 수 있습니다.']),
      })
    }

    const showNoAutoHideToast = () => {
      toast.show({
        title: '사라지지 않는 토스트',
        body: '우측 상단의 닫기 버튼을 눌러야 사라집니다.',
        value: 0, // 0으로 설정하여 자동으로 사라지지 않게 합니다.
        noProgress: true, // 진행 표시줄을 숨깁니다.
      })
    }

    const showPositionedToast = () => {
      toast.show({
        title: '위치 지정',
        body: '이 토스트는 화면 하단 중앙에 나타납니다.',
        pos: 'bottom-center', // 토스트 위치 지정
      })
    }

    const showSolidToast = () => {
      toast.show({
        title: '단색 배경 토스트',
        body: 'solid: true 옵션이 적용되었습니다.',
        variant: 'primary',
        solid: true,
      })
    }

    return {
      showBasicToast,
      showVariantToast,
      showComplexToast,
      showNoAutoHideToast,
      showPositionedToast,
      showSolidToast,
    }
  },
}
</script>
