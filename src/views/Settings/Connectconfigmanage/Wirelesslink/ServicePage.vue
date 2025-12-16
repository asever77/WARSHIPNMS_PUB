<template>
  <div class="base-wrap">
    <div class="search-base">
      <div class="search-base--btns ml-auto">
        <BFormGroup>
          <div class="ui-search-with-btn">
            <BFormInput
              id="search-word-2"
              class="ui-input-28"
            />
            <button type="button" class="btn-search-icon" aria-label="검색" />
          </div>
        </BFormGroup>
        <BFormSelect
          id="search-deviceType"
          class="ui-select-28 min-w-200"
          :options="[{ value: '1', text: '무선연동링크장치' }]"
        />
      </div>
    </div>
  </div>
  <div class="ui-drag-area2">
    <div class="ui-drag-area2-col">
      <div class="ui-drag-item-list-area">
        <div class="ui-drag-item" data-bg="sky" data-type="clone">사용자단말</div>
        <div class="ui-drag-item" data-bg="sky" v-for="n in 16" :key="n">C4I #1</div>
      </div>
      <BFormGroup>
        <div class="ui-search-with-btn">
          <BFormInput
            id="search-word-2"
            class="ui-input-28"
          />
          <button type="button" class="btn-search-icon" aria-label="검색" />
        </div>
      </BFormGroup>
    </div>
    <div class="ui-drag-area2-section">
      <div class="ui-drag-area2-section-group" data-bg="sky">
        <div class="ui-drag-in-box">
          <div class="ui-drag-item" data-bg="sky">사용자단말</div>
          <i class="icon-connection-status" data-connection="true"></i>
        </div>
        <div class="ui-drag-in-box" v-for="n in 7" :key="n">
          <i class="icon-connection-status" data-connection="false"></i>
        </div>
      </div>
      <div class="ui-drag-area2-section-group" data-bg="yellow">
        <div class="ui-drag-in-box">
          <div class="ui-drag-item" data-bg="yellow">HF송수신기 #1</div>
        </div>
        <div class="ui-drag-in-box">
          <div class="ui-drag-item" data-bg="yellow">HF송수신기 #1</div>
        </div>
        <div class="ui-drag-in-box" v-for="n in 6" :key="n">
        </div>
      </div>
    </div>
    <div class="ui-drag-area2-section">
      <div class="ui-drag-area2-section-group" data-bg="sky">
        <div class="ui-drag-in-box" v-for="n in 8" :key="n">
          <i class="icon-connection-status" data-connection="false"></i>
        </div>
      </div>
      <div class="ui-drag-area2-section-group" data-bg="yellow">
        <div class="ui-drag-in-box" v-for="n in 8" :key="n">
        </div>
      </div>
    </div>
    <div class="ui-drag-area2-col">
      <div class="ui-drag-item-list-area">
        <div class="ui-drag-item" data-bg="yellow" v-for="n in 6" :key="n">HF송수신기 #1</div>
      </div>
      <BFormGroup>
        <div class="ui-search-with-btn">
          <BFormInput
            id="search-word-2"
            class="ui-input-28"
          />
          <button type="button" class="btn-search-icon" aria-label="검색" />
        </div>
      </BFormGroup>
    </div>
  </div>
  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BFormSelect } from 'bootstrap-vue-next/components'
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
