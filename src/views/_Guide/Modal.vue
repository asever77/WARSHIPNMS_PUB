<template>
  <div class="container mt-4">
    <h3 class="mb-4">Modal Guide (UiModal)</h3>

    <div class="d-flex flex-wrap gap-2">
      <!-- 1. 기본 모달 (type="modal") -->
      <BButton @click="modals.modalName.show = true">기본 모달 (modal)</BButton>

      <!-- 2. 시스템 모달 (type="system") -->
      <BButton @click="modals.systemName.show = true" variant="secondary"
        >시스템 모달 (system)</BButton
      >

      <!-- 3. 풀페이지 모달 (type="full-page") -->
      <BButton @click="modals.fullPageName.show = true" variant="success"
        >풀페이지 모달 (full-page)</BButton
      >

      <!-- 4. 바텀 시트 (type="bottom-sheet") -->
      <BButton @click="modals.bottomSheetName.show = true" variant="info"
        >바텀 시트 (bottom-sheet)</BButton
      >

      <!-- 5. 사이드-레프트 (type="side-left") -->
      <BButton @click="modals.sideLeftName.show = true" variant="danger">사이드 (Left)</BButton>

      <!-- 6. 사이드-라이트 (type="side-right") -->
      <BButton @click="modals.sideRightName.show = true" variant="warning">사이드 (Right)</BButton>
    </div>

    <!-- Modal Components -->
    <div>
      <UiModal v-model="modals.modalName.show" title="기본 모달" type="modal">
        <p>가장 일반적인 중앙 정렬 모달입니다.</p>
      </UiModal>

      <UiModal v-model="modals.systemName.show" title="시스템 알림" type="system">
        <p>간단한 확인이나 알림에 사용되는 작은 모달입니다.</p>
        <template #footer>
          <BButton variant="secondary" @click="modals.systemName.show = false">취소</BButton>
          <BButton variant="primary" @click="handleConfirm">확인</BButton>
        </template>
      </UiModal>

      <UiModal v-model="modals.fullPageName.show" title="풀페이지 모달" type="full-page">
        <p>화면 전체를 차지하는 모달입니다.</p>
      </UiModal>

      <UiModal v-model="modals.bottomSheetName.show" title="바텀 시트" type="bottom-sheet">
        <p>화면 하단에서 올라오는 모달입니다. 모바일 환경에서 주로 사용됩니다.</p>
      </UiModal>

      <UiModal
        v-model="modals.sideRightName.show"
        title="오른쪽 사이드 패널"
        type="side-right"
        size="sm"
      >
        <p>화면 오른쪽에서 나타나는 패널 형태의 모달입니다.</p>
        <p>size 속성을 함께 사용할 수 있습니다.</p>
      </UiModal>

      <UiModal
        v-model="modals.sideLeftName.show"
        title="왼쪽 사이드 패널"
        type="side-left"
        size="sm"
      >
        <p>화면 왼쪽에서 나타나는 패널 형태의 모달입니다.</p>
      </UiModal>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import UiModal from '@/components/UiModal.vue'
import { BButton } from 'bootstrap-vue-next'

export default {
  name: 'ModalGuide',
  components: { UiModal, BButton },
  setup() {
    // reactive를 사용하여 여러 모달의 상태를 하나의 객체로 관리합니다.
    const modals = reactive({
      modalName: { show: false },
      systemName: { show: false },
      fullPageName: { show: false },
      bottomSheetName: { show: false },
      sideRightName: { show: false },
      sideLeftName: { show: false },
    })

    const handleConfirm = () => {
      alert('확인 버튼을 클릭했습니다.')
      modals.systemName.show = false
    }

    return { modals, handleConfirm }
  },
}
</script>
