<template>
  <div class="container mt-4">
    <h3 class="mb-4">Form Components Guide</h3>

    <!-- BFormInput -->
    <h4>1. Input (BFormInput)</h4>
    <div class="mb-5 p-3 border rounded">
      <BFormGroup label="기본 텍스트 입력:" label-for="input-1">
        <BFormInput id="input-1" v-model="text" placeholder="텍스트를 입력하세요..."></BFormInput>
      </BFormGroup>
      <p class="mt-2">입력된 값: {{ text }}</p>

      <BFormGroup label="비활성화된 입력:" label-for="input-disabled">
        <BFormInput id="input-disabled" disabled value="비활성화됨"></BFormInput>
      </BFormGroup>

      <BFormGroup label="입력 타입 (Number):" label-for="input-number">
        <BFormInput id="input-number" v-model.number="number" type="number"></BFormInput>
      </BFormGroup>
      <p class="mt-2">입력된 숫자: {{ number }}</p>
    </div>

    <!-- BFormSelect -->
    <h4>2. Select (BFormSelect)</h4>
    <div class="mb-5 p-3 border rounded">
      <BFormGroup label="기본 선택:" label-for="select-1">
        <BFormSelect id="select-1" v-model="selected" :options="options"></BFormSelect>
      </BFormGroup>
      <p class="mt-2">선택된 값: {{ selected }}</p>

      <BFormGroup label="객체 배열을 사용한 선택:" label-for="select-2">
        <BFormSelect
          id="select-2"
          v-model="selectedObject"
          :options="objectOptions"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></BFormSelect>
      </BFormGroup>
      <p class="mt-2">선택된 객체의 item: {{ selectedObject }}</p>
    </div>

    <!-- BFormCheckbox -->
    <h4>3. Checkbox (BFormCheckbox)</h4>
    <div class="mb-5 p-3 border rounded">
      <p>단일 체크박스:</p>
      <BFormCheckbox
        id="checkbox-1"
        v-model="statusCheck1"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        I accept the terms and use
      </BFormCheckbox>
      <div>
        State: <strong>{{ statusCheck1 }}</strong>
      </div>
      <hr />

      <p>여러 체크박스 (배열에 바인딩):</p>
      <b-form-group v-slot="{ ariaDescribedby }" label="Using options array:">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="statusCheck2"
          :options="optionsCheck"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        />
      </b-form-group>
      <div>
        State: <strong>{{ statusCheck2 }}</strong>
      </div>
      <hr />
      <b-form-group v-slot="{ ariaDescribedby }" label="Using sub-components:">
        <b-form-checkbox-group
          id="checkbox-group-2"
          v-model="statusCheck3"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <b-form-checkbox value="orange">Orange</b-form-checkbox>
          <b-form-checkbox value="apple">Apple</b-form-checkbox>
          <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
          <b-form-checkbox value="grape">Grape</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <div>
        State: <strong>{{ statusCheck3 }}</strong>
      </div>
    </div>

    <!-- BFormRadio -->
    <h4>4. Radio (BFormRadio)</h4>
    <div class="mb-5 p-3 border rounded">
      <BFormRadio v-model="radioSelected" name="some-radios" value="A">Option A </BFormRadio>
      <BFormRadio v-model="radioSelected" name="some-radios" value="B">Option B </BFormRadio>
      <p class="mt-2">선택된 라디오: {{ radioSelected }}</p>
      <hr />

      <BFormRadioGroup v-model="radioSelected2" :options="radioOptions" name="radio-group-1" />
      <p class="mt-2">선택된 라디오: {{ radioSelected2 }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// BForm* 컴포넌트들은 'bootstrap-vue-next/components'에서 가져와야 합니다.
import {
  BFormCheckbox,
  BFormRadio,
  BFormInput,
  BFormSelect,
  BFormGroup,
  BFormCheckboxGroup,
  BFormRadioGroup,
} from 'bootstrap-vue-next/components'

// BFormInput
const text = ref('')
const number = ref(0)

// BFormSelect
const selected = ref(null)
const options = ref([
  { value: null, text: '선택해주세요' },
  { value: 'a', text: '옵션 A' },
  { value: 'b', text: '옵션 B' },
  { value: 'c', text: '옵션 C (비활성화)', disabled: true },
])

const selectedObject = ref('C')
const objectOptions = ref([
  { item: 'A', name: '아이템 A' },
  { item: 'B', name: '아이템 B' },
  { item: 'C', name: '아이템 C' },
  { item: 'D', name: '아이템 D (비활성화)', notEnabled: true },
])

// BFormCheckbox
const statusCheck1 = ref(false)
const statusCheck2 = ref([])
const statusCheck3 = ref([])

const optionsCheck = [
  { text: 'Orange', value: 'orange' },
  { text: 'Apple', value: 'apple' },
  { text: 'Pineapple', value: 'pineapple' },
  { text: 'Grape', value: 'grape' },
]

// BFormRadio
const radioSelected = ref('A')
const radioSelected2 = ref('one')
const radioOptions = ref([
  { text: '옵션 One', value: 'one' },
  { text: '옵션 Two', value: 'two' },
  { text: '옵션 Three (비활성화)', value: 'three', disabled: true },
])
</script>