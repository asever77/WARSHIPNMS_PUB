<template>
  <div class="popup-modal">
    <header class="popup-modal-header">
      <h5 class="popup-modal-title">자제 진단 보고(BIT) 상세 조회</h5>
    </header>
    <main class="popup-modal-content">
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
            <td>음력전화연동장치 #1</td>
            <th scope="row">장치유형</th>
            <td>음력전화연동장치</td>
          </tr>
          <tr>
            <th scope="row">진단유형</th>
            <td>운영자요청(I-BIT)</td>
            <th scope="row">시리얼번호</th>
            <td>ZYXELaRTxu12</td>
          </tr>
          <tr>
            <th scope="row">진단레멜</th>
            <td>기본-레벨1</td>
            <th scope="row">진단결과</th>
            <td>Success</td>
          </tr>
          <tr>
            <th scope="row">보고일시</th>
            <td colspan="3">2025-04-04 11:23:10</td>
          </tr>
          <tr>
            <th scope="row">상세결과</th>
            <td colspan="3">
<pre><code>ibitReport : {
  “cpuUsage” :“38”,
  “memUsage”:“38” ,
  “diskUsage”:“38” ,
  “devicePower”:“5” ,
  “vccPower” :“3”,
  “temp”:“40”,
  “ethernet”:“connect”,
  “nms” :“connect”,
  “voip” :“disconnect”,
  “lcdCurrent”:“210”
 }</code></pre>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
    <footer class="popup-modal-footer">
      <BButton class="gray28" @click="closePopup">닫기</BButton>
    </footer>
  </div>
</template>

<script setup>
import { BButton } from 'bootstrap-vue-next/components';

function closePopup() {
  window.close();
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
.popup-modal-content code {
  font-size: 1.3rem;
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
.ui-thead-sticky {
  min-height:15.8rem
}
</style>
