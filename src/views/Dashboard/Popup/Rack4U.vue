<template>
  <div class="popup-modal">
    <header class="popup-modal-header">
      <h5 class="popup-modal-title">무선링크연동장치</h5>
    </header>
    <main class="popup-modal-content">
      <div class="rack-item">
        <img src="@/assets/images/network/4u-managed_ups.png" alt="">
      </div>
      <table class="table-type-a">
        <colgroup>
          <col style="width:7rem">
          <col style="width:auto">
          <col style="width:7rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">장치명</th>
            <td>무선통신기시스템 L2 스위치</td>
            <th scope="row">모델명</th>
            <td>RLIU-MN-001</td>
          </tr>
          <tr>
            <th scope="row">시리얼번호</th>
            <td>ZYXELaRTxu10</td>
            <th scope="row">펌웨어버전</th>
            <td>1.0.1</td>
          </tr>
          <tr>
            <th scope="row">IP</th>
            <td>192.168.0.112</td>
            <th scope="row">위치</th>
            <td>무선통신기시스템랙</td>
          </tr>
          <tr>
            <th scope="row">전원</th>
            <td class="ta-c green">NORMAL</td>
            <th scope="row">온도</th>
            <td>43°C</td>
          </tr>
          <tr>
            <th scope="row">FAN</th>
            <td class="ta-c green">ON ( NORMAL)</td>
            <th scope="row"></th>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table class="table-type-a line">
        <colgroup>
          <col style="width:auto">
          <col style="width:auto">
          <col style="width:auto">
        </colgroup>
        <colgroup>
          <col style="width:auto">
          <col style="width:auto">
          <col style="width:auto">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">카드명</th>
            <th scope="col">카드유형</th>
            <th scope="col">상태</th>
            <th scope="col">카드명</th>
            <th scope="col">카드유형</th>
            <th scope="col">상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ta-c">B7</td>
            <td class="ta-c">범용사운드카드</td>
            <td class="ta-c green">NORMAL</td>
            <td class="ta-c">B8</td>
            <td class="ta-c">범용사운드카드</td>
            <td class="ta-c green">NORMAL</td>
          </tr>
          <tr>
            <td class="ta-c">B5</td>
            <td class="ta-c">범용사운드카드</td>
            <td class="ta-c green">NORMAL</td>
            <td class="ta-c">B6</td>
            <td class="ta-c">범용사운드카드</td>
            <td class="ta-c green">NORMAL</td>
          </tr>
          <tr>
            <td class="ta-c">B3</td>
            <td class="ta-c">범용사운드카드</td>
            <td class="ta-c green">NORMAL</td>
            <td class="ta-c">B4</td>
            <td class="ta-c">범용사운드카드</td>
            <td class="ta-c green">NORMAL</td>
          </tr>
          <tr>
            <td class="ta-c">A1</td>
            <td class="ta-c">범용사운드카드</td>
            <td class="ta-c green">NORMAL</td>
            <td class="ta-c">B2</td>
            <td class="ta-c">범용사운드카드</td>
            <td class="ta-c green">NORMAL</td>
          </tr>
        </tbody>
      </table>

      <table class="table-type-a line">
        <colgroup>
          <col style="width:auto">
          <col style="width:auto">
          <col style="width:auto">
          <col style="width:auto">
          <col style="width:auto">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">알람코드</th>
            <th scope="col">알람명</th>
            <th scope="col">심각도</th>
            <th scope="col">산세정보</th>
            <th scope="col">발생일시</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="ta-c">d342</td>
            <td class="ta-c">비상알람</td>
            <td class="ta-c">심각</td>
            <td class="ta-c">전력에 문제있음</td>
            <td class="ta-c">2026.01.01 12:00:00</td>
          </tr>
        </tbody>
      </table>

    </main>
    <footer class="popup-modal-footer">
      <BButton class="blue28" @click="openRackBIT">진단요청</BButton>
    </footer>
  </div>
</template>

<script setup>
import { BButton } from 'bootstrap-vue-next/components'

function openRackBIT() {
  window.open('/dashboard/popup/RackBIT', 'RackBIT', 'width=300,height=320,scrollbars=yes');
}
</script>

<style scoped>
.rack-item{
  width: 100%;
}
.rack-item img {
  width: 100%;
}
.popup-modal {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.popup-modal-header {
  background-color: #001B30;
  border-bottom: .5rem solid #2B77A9;
  border-radius: 0;
  justify-content: center;
  display: flex;
  position: relative;
  height: 4.9rem;
  align-items: center;
}
.popup-modal-title {
  font-size: 1.6rem;
  color: #fff;
}
.popup-modal-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 2.6rem 2rem;
  overflow-y: auto;
}
.popup-modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem 2.6rem 1.9rem;
  gap: 1rem;
}
</style>
