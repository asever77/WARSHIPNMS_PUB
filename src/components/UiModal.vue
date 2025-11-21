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

<script>
import { BModal, BButton } from 'bootstrap-vue-next'

export default {
  name: 'UiModal',
  components: {
    BModal,
    BButton,
  },
  props: {
    // v-model을 통해 부모 컴포넌트에서 모달의 노출 여부를 제어합니다.
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Modal Title',
    },
    // 모달의 스타일과 위치를 결정하는 type prop
    type: {
      type: String,
      default: 'modal', // 'system', 'modal', 'bottom-sheet', 'side-left', 'side-right', 'full-page'
    },
  },
  emits: ['update:modelValue'],
  computed: {
    show: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
    // type prop에 따라 BModal에 적용할 속성들을 계산합니다.
    modalConfig() {
      const config = {
        modalClass: [],
        contentClass: [],
        centered: false,
        fullscreen: false,
        size: 'md', // BModal의 기본 사이즈
        noFade: false, // 애니메이션 효과
      }

      switch (this.type) {
        case 'system':
          config.centered = true
          config.size = 'sm'
          break
        case 'modal':
          config.centered = true
          break
        case 'bottom-sheet':
          config.modalClass.push('modal-bottom-sheet')
          config.centered = false // 위치 충돌 방지
          config.noFade = true // 슬라이드 애니메이션을 위해 기본 fade 효과를 끕니다.
          break
        case 'side-left':
          config.modalClass.push('modal-side-left')
          config.centered = false // 위치 충돌 방지
          config.noFade = true
          break
        case 'side-right':
          config.modalClass.push('modal-side-right')
          config.centered = false // 위치 충돌 방지
          config.noFade = true
          break
        case 'full-page':
          config.fullscreen = true
          break
      }
      return config
    },
  },
  methods: {
    hide() {
      this.show = false
    },
    onHidden() {
      if (this.show) {
        this.show = false
      }
    },
  },
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
</style>
