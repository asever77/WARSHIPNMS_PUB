<template>
  <div class="base-wrap">
    <div class="search-base">
      <div class="search-base--btns ml-auto">
        <BFormSelect
          id="search-target"
          class="ui-select-28 min-w-200"
          :options="[{ value: '1', text: '보안장비연동장치' }]"
        ></BFormSelect>
        <!--        <BFormGroup :label="lang.label1" label-for="search-deviceType">
          <BFormSelect
            id="search-deviceType"
            class="ui-select-28 min-w-400"
            :options="[{ value: '1', text: '사용자단말 <-> MRU-09  <-> UHF NB' }]"
          />
        </BFormGroup>-->
      </div>
    </div>
  </div>
  <div class="ui-drag-area1">
    <div class="ui-drag-section">
      <div class="ui-drag-section-select">
        <BFormSelect
          id="search-deviceType"
          class="ui-select-28"
          :options="[{ value: '1', text: '사용자단말 <-> MRU-09  <-> UHF NB' }]"
        />
      </div>
      <div class="ui-drag-section-item" data-bg="sky">
        <div class="ui-drag-item" data-bg="sky">사용자단말</div>
      </div>
      <i class="icon-connection-status" data-connection="true"></i>
      <div class="ui-drag-section-item" data-bg="yellow"></div>
      <i class="icon-connection-status" data-connection="false"></i>
      <div class="ui-drag-section-item" data-bg="pink">UHF(T) #1</div>
    </div>

    <div class="ui-drag-section">
      <div class="ui-drag-section-select">
        <BFormSelect
          id="search-deviceType2"
          class="ui-select-28"
          :options="[{ value: '1', text: '사용자단말 <-> MRU-09  <-> UHF NB' }]"
        />
      </div>
      <div class="ui-drag-section-item" data-bg="sky">
        <div class="ui-drag-item" data-bg="sky">사용자단말</div>
      </div>
      <i class="icon-connection-status" data-connection="true"></i>
      <div class="ui-drag-section-item" data-bg="yellow"></div>
      <i class="icon-connection-status" data-connection="false"></i>
      <div class="ui-drag-section-item" data-bg="pink">UHF(T) #1</div>
    </div>

    <div class="ui-drag-item-section">
      <div class="ui-drag-item-group">
        <div class="ui-drag-item-grid">
          <div class="ui-drag-item" data-bg="sky" v-for="n in 16" :key="n">사용자단말</div>
        </div>
      </div>
      <div class="ui-drag-item-group">
        <div class="ui-drag-item-grid">
          <div class="ui-drag-item" data-bg="yellow" v-for="n in 6" :key="n">사용자단말</div>
        </div>
      </div>
      <div class="ui-drag-item-group">
        <div class="ui-drag-item-grid">
          <div class="ui-drag-item" data-bg="pink" v-for="n in 6" :key="n">사용자단말</div>
        </div>
      </div>
    </div>
  </div>
  <div class="ui-btn-group">
    <BButton class="blue28" @click="modals.systemName.show = true">{{ lang.btn1 }}</BButton>
  </div>


  <!--
    알림: data-icon="info"
    위험: data-icon="danger"
    경고: data-icon="warning"
  -->
  <UiModal
    v-model="modals.systemName.show"
    title="무선링크연동장치 연계설정 필요"
    type="system"
  >
    <div class="base-system-content" data-icon="info">
      <p class="ta-c text-12-400">무선링크연동장치 연계 설정 정보가 없습니다.
      <br />무선링크연동장치와의 연결을 선행해야 합니다.</p>
    </div>
    <div class="base-system-content" data-icon="danger">
      <p class="ta-c text-12-400">무선링크연동장치 연계 설정 정보가 없습니다.
      <br />무선링크연동장치와의 연결을 선행해야 합니다.</p>
    </div>
    <div class="base-system-content" data-icon="warning">
      <p class="ta-c text-12-400">무선링크연동장치 연계 설정 정보가 없습니다.
      <br />무선링크연동장치와의 연결을 선행해야 합니다.</p>
    </div>

    <template #footer>
      <div class="ui-flex ui-w-full" data-item-align="center" data-justify-align="center" data-gap="10">
        <BButton class="gray28" @click="modals.systemName.show = false">{{ lang.btn2 }}</BButton>
        <BButton class="blue28">{{ lang.btn3 }}</BButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormSelect } from 'bootstrap-vue-next/components'
import { BButton } from 'bootstrap-vue-next'
import UiModal from '@/components/UiModal.vue'

const ko = {
  btn1: '적용',
  btn2: '취소',
  btn3: '확인',
  label1: '템플릿 운영모드',
}

const en = {}

const lang = ref({})
onMounted(() => {
  lang.value = G.lang === 'ko' ? ko : en
})

const modals = reactive({
  systemName: { show: false },
})

</script>
