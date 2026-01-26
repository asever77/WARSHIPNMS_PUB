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
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import G from '@/config/global.js'
import { BFormSelect } from 'bootstrap-vue-next/components'
import { BButton, BFormGroup } from 'bootstrap-vue-next'

const ko = {
  btn1: '적용',
  label1: '템플릿 운영모드',
}

const en = {}

const lang = ref({})
onMounted(() => {
  lang.value = G.lang === 'ko' ? ko : en
})
</script>
