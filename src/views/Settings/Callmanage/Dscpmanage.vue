<template>
  <table class="table-type-a">
    <colgroup>
      <col style="width: 16rem" />
      <col style="width: auto" />
      <col style="width: auto" />
      <col style="width: auto" />
      <col style="width: auto" />
    </colgroup>
    <thead>
      <tr>
        <th scope="col">{{ lang.th1 }}</th>
        <th scope="col">{{ lang.th2 }}</th>
        <th scope="col">{{ lang.th3 }}</th>
        <th scope="col">{{ lang.th4 }}</th>
        <th scope="col">{{ lang.th5 }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">{{ lang.th6 }}</th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.th7 }}</th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.th8 }}</th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.th9 }}</th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>
      <tr>
        <th scope="row">{{ lang.th10 }}</th>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
        <td>
          <BFormInput class="ui-input" placeholder=""></BFormInput>
        </td>
      </tr>

    </tbody>
  </table>

  <div class="ui-btn-group">
    <BButton class="blue28">{{ lang.btn1 }}</BButton>
  </div>

</template>

<script setup>
// =========================
// [IMPORTS]
// =========================
// NOTE: 컴포넌트 이름은 multi-word로 권장됨. 실제 이름 변경 시 파일명, 라우터 등 전체 영향 주의
import { ref, onMounted, computed, reactive } from 'vue'
import G from '@/config/global.js'
import { BFormInput, BButton } from 'bootstrap-vue-next/components'



// =========================
// [언어/라벨 관리]
// =========================
const ko = {
  btn1: '적용',

  th1: '가입자등급',
  th2: '점대점 통화',
  th3: '회의통화',
  th4: '그룹통화',
  th5: '방송',

  th6: '1등급',
  th7: '2등급',
  th8: '3등급',
  th9: '4등급',
  th10: '5등급',

}
const en = {}
const lang = ref({})

onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en
})
</script>
