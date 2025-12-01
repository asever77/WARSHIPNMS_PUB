<template>
  <BModal
    :modal-class="modalConfig.modalClass"
    :content-class="modalConfig.contentClass"
    :centered="modalConfig.centered"
    :fullscreen="modalConfig.fullscreen"
    :size="modalConfig.size"
    :no-fade="modalConfig.noFade"
    v-model="show"
    :title="title"
    v-bind="$attrs"
    @hidden="onHidden"
  >
    <!-- 모달의 본문 내용이 들어갈 기본 슬롯 -->
    <slot></slot>

    <!-- 모달의 푸터(footer) 내용이 들어갈 네임드 슬롯 -->
    <template #footer>
      <slot name="footer">
        <!-- 기본 푸터: 닫기 버튼 -->
        <BButton variant="secondary" @click="hide">닫기</BButton>
      </slot>
    </template>
  </BModal>
</template>

<script setup>
import { computed } from 'vue'
import { BModal, BButton } from 'bootstrap-vue-next'

// props 정의
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Modal Title',
  },
  type: {
    type: String,
    default: 'modal',
    // 'system', 'modal', 'bottom-sheet', 'side-left', 'side-right', 'full-page'
  },
})

// emits 정의
const emit = defineEmits(['update:modelValue'])

// v-model 역할
const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// type에 따라 modal 속성 계산
const modalConfig = computed(() => {
  const config = {
    modalClass: [],
    contentClass: [],
    centered: false,
    fullscreen: false,
    size: 'md',
    noFade: false,
  }

  switch (props.type) {
    case 'system':
      config.centered = true
      config.size = 'sm'
      break

    case 'modal':
      config.modalClass.push('base-modal')
      config.centered = true
      break

    case 'bottom-sheet':
      config.modalClass.push('modal-bottom-sheet')
      config.centered = false
      config.noFade = true
      break

    case 'side-left':
      config.modalClass.push('modal-side-left')
      config.centered = false
      config.noFade = true
      break

    case 'side-right':
      config.modalClass.push('modal-side-right')
      config.centered = false
      config.noFade = true
      break

    case 'full-page':
      config.fullscreen = true
      break
  }

  return config
})

// 모달 닫기
const hide = () => {
  show.value = false
}

// BModal hidden 이벤트 처리
const onHidden = () => {
  if (show.value) {
    show.value = false
  }
}
</script>

<style>
/*
  사이드 및 바텀시트 모달의 애니메이션과 위치를 정의합니다.
  scoped가 아닌 일반 style 태그를 사용하여 BModal이 생성하는 최상위 클래스에 접근합니다.
*/

/* Side-Left Modal */
.modal-side-left .modal-dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  margin: 0;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
}
.modal.show .modal-side-left .modal-dialog {
  transform: translateX(0);
}
.modal-side-left .modal-content {
  height: 100%;
  border-radius: 0;
  border: none;
}

/* Side-Right Modal */
.modal-side-right .modal-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
}
.modal.show .modal-side-right .modal-dialog {
  transform: translateX(0);
}
.modal-side-right .modal-content {
  height: 100%;
  border-radius: 0;
  border: none;
}

/* Bottom-Sheet Modal */
.modal-bottom-sheet .modal-dialog {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  max-width: 100%;
  transform: translateY(100%);
  transition: transform 0.3s ease-out;
}
.modal.show .modal-bottom-sheet .modal-dialog {
  transform: translateY(0);
}
.modal-bottom-sheet .modal-content {
  border-radius: 1rem 1rem 0 0;
  border: none;
}

.base-modal .modal-content {
  border-radius: 0;
}
.base-modal .modal-content .modal-header{
  background-color: #001B30;
  border-bottom: .5rem solid #2B77A9;
  border-radius: 0;
  justify-content: center;
  display: flex;
  position: relative;
}
.base-modal .modal-content .modal-title {
  font-size: 1.6rem;
  font-weight: 700;
  color:#fff;
}
.base-modal .modal-content .modal-header .btn-close{
  position: absolute;
  padding:0;
  margin:0;
  right: 1rem;
  top: calc(50% - 1.5rem);
  opacity: 1;
  width: 3rem;
  height: 3rem;
  background-size: 1.9rem 1.9rem;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url("data:image/svg+xml,%3Csvg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.5 6.5L12.5 12.5M12.5 6.5L6.5 12.5M0.5 2.5C0.5 1.96957 0.710714 1.46086 1.08579 1.08579C1.46086 0.710714 1.96957 0.5 2.5 0.5H16.5C17.0304 0.5 17.5391 0.710714 17.9142 1.08579C18.2893 1.46086 18.5 1.96957 18.5 2.5V16.5C18.5 17.0304 18.2893 17.5391 17.9142 17.9142C17.5391 18.2893 17.0304 18.5 16.5 18.5H2.5C1.96957 18.5 1.46086 18.2893 1.08579 17.9142C0.710714 17.5391 0.5 17.0304 0.5 16.5V2.5Z' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
}
.base-modal .modal-footer > * {
  margin: 0;
  min-width: 8rem;
}
.base-modal .modal-footer {
  justify-content: center;
  border: 0;
  padding: 1rem 0 1.9rem;
  gap:1rem;
}
.base-modal .modal-body {
  padding: 2rem 2.6rem 0;
}
.base-modal .modal-sm {
  max-width: 32rem;
}
</style>
