<template>
  <div class="base-wrap">
    <div class="search-base">
      <div class="search-base--form">
        <div class="search-base-desc">무선침묵시간 : 22:00 ~ 02:00</div>
        <BButton class="blue24 min-w-0" @click="openTimeSetting">{{ lang.btn1 }}</BButton>
      </div>
      <div>
        <BFormSelect
          id="search-target"
          class="ui-select-28"
          v-model="searchTarget"
          :options="searchTargetOptions"
        ></BFormSelect>
      </div>
    </div>
    <table class="base-table line">
      <colgroup>
        <col style="width: 8rem" />
        <col style="width: 12rem" />
        <col style="width: 12rem" />
        <col style="width: 10rem" />
        <col style="width: 10rem" />
        <col style="width: 8rem" />
        <col style="width: 10rem" />
        <col style="width: auto" v-if="showDetailColumns" />
        <col style="width: auto" v-if="showDetailColumns" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" rowspan="2">{{ lang.thead1 }}</th>
          <th scope="col" rowspan="2">{{ lang.thead2 }}</th>
          <th scope="col" rowspan="2">{{ lang.thead3 }}</th>
          <th scope="col" colspan="2">{{ lang.thead4 }}</th>
          <th scope="col" rowspan="2">{{ lang.thead5 }}</th>
          <th scope="col" rowspan="2">{{ lang.thead6 }}</th>
          <th scope="col" rowspan="2" v-if="showDetailColumns">{{ lang.thead7 }}</th>
          <th scope="col" rowspan="2" v-if="showDetailColumns">{{ lang.thead8 }}</th>
        </tr>
        <tr>
          <th scope="row" class="l-line">{{ lang.thead9 }}</th>
          <th scope="row">
            <div class="ui-flex" data-gap="4" data-item-align="center" data-justify-align="center">
              <BFormCheckbox value="all" />{{ lang.thead10 }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowspan="3">HF</th>
          <th scope="row">HF송수신기 #1</th>
          <td>사용자단말 #1</td>
          <td class="green-txt">Busy</td>
          <td><BFormCheckbox value="1" /></td>
          <td>0821</td>
          <td>21.0MHz</td>
          <td v-if="showDetailColumns">4CH 확장지 #1 TX1</td>
          <td v-if="showDetailColumns">4CH 확장지 #1 RX1</td>
        </tr>
        <tr>
          <th scope="row">HF송수신기 #2</th>
          <td>사용자단말 #2</td>
          <td class="blue-txt">Ready</td>
          <td><BFormCheckbox value="2" /></td>
          <td>0821</td>
          <td>21.0MHz</td>
          <td v-if="showDetailColumns">4CH 확장지 #1 TX1</td>
          <td v-if="showDetailColumns">4CH 확장지 #1 RX1</td>
        </tr>
        <tr>
          <th scope="row">HF송수신기 #2</th>
          <td>사용자단말 #2</td>
          <td>-</td>
          <td><BFormCheckbox value="3" /></td>
          <td>0821</td>
          <td>21.0MHz</td>
          <td v-if="showDetailColumns">4CH 확장지 #1 TX1</td>
          <td v-if="showDetailColumns">4CH 확장지 #1 RX1</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="ui-btn-group">
    <BButton class="navy28">{{ lang.btn2 }}</BButton>
    <div class="ui-flex ml-auto" data-gap="8">
      <BButton class="blue28">{{ lang.btn3 }}</BButton>
      <BButton class="blue28">{{ lang.btn4 }}</BButton>
      <BButton class="gray28">{{ lang.btn5 }}</BButton>
    </div>
  </div>

  <UiModal
    v-model="modals.modalTimeSetting.show"
    :title="lang.modalTitle"
    type="modal"
    size="md"
    @close-btn-click="modals.modalTimeSetting.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width: 18rem" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.tbody1 }}</th>
            <td>
              <BFormInput
                v-model="timeValue1"
                class="ui-input-28"
                type="time"
                placeholder=""
              />
            </td>
          </tr>
          <tr>
            <th scope="row">{{ lang.tbody2 }}</th>
            <td>
              <BFormInput
                v-model="timeValue2"
                class="ui-input-28"
                type="time"
                placeholder=""
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template #footer>
      <div class="ui-flex ui-w-full" data-justify-align="between">
        <BButton class="gray28" @click="modals.modalTimeSetting.show = false">
          {{ lang.btn6 }}
        </BButton>
        <div class="ui-flex" data-gap="8">
          <BButton class="blue28">{{ lang.btn7 }}</BButton>
          <BButton class="gray28">{{ lang.btn8 }}</BButton>
        </div>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import { BButton, BFormCheckbox, BFormInput } from 'bootstrap-vue-next'
import { BFormSelect } from 'bootstrap-vue-next/components'
import UiModal from '@/components/UiModal.vue'

const modals = reactive({
  modalTimeSetting: { show: false },
})

const timeValue1 = ref('')
const timeValue2 = ref('')

const searchTarget = ref('a')
const showDetailColumns = computed(() => searchTarget.value === 'b')

const searchTargetOptions = computed(() => [
  { value: 'a', text: lang.value.option1 ?? '' },
  { value: 'b', text: lang.value.option2 ?? '' },
])

const ko = {
  title: '무선 내용',
  thead1: '구분',
  thead2: '장치명',
  thead3: '연결장치',
  thead4: '상태',
  thead5: '내선번호',
  thead6: '주파수',
  thead7: 'TX',
  thead8: 'RX',
  thead9: '동작상태',
  thead10: '무선침묵',
  tbody1: '시작시간',
  tbody2: '종료시간',
  btn1: '설정',
  btn2: '무선채널 조합',
  btn3: '전체 무선침묵',
  btn4: '전체 무선침묵 해제',
  btn5: '무선침묵 적용',
  btn6: '취소',
  btn7: '저장',
  btn8: '설정안함',
  optionSelect: '선택하세요',
  option1: '기본정보',
  option2: '상세정보',
  modalTitle: '무선침묵시간 설정',
}

const en = {
  title: '무선 내용',
  thead1: '구분',
  thead2: '장치명',
  thead3: '연결장치',
  thead4: '상태',
  thead5: '내선번호',
  thead6: '주파수',
  thead7: 'TX',
  thead8: 'RX',
  thead9: '동작상태',
  thead10: '무선침묵',
  tbody1: '시작시간',
  tbody2: '종료시간',
  btn1: '설정',
  btn2: '무선채널 조합',
  btn3: '전체 무선침묵',
  btn4: '전체 무선침묵 해제',
  btn5: '무선침묵 적용',
  btn6: '취소',
  btn7: '저장',
  btn8: '설정안함',
  optionSelect: '선택하세요',
  option1: '기본정보',
  option2: '상세정보',
  modalTitle: '무선침묵시간 설정',
}

const lang = ref({})

onMounted(() => {
  lang.value = G.lang === 'ko' ? ko : en
})

function openTimeSetting() {
  modals.modalTimeSetting.show = true;
}
</script>
