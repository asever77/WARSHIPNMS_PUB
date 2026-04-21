<template>
  <div class="popup-modal">
    <header class="popup-modal-header">
      <h5 class="popup-modal-title">장치 자체진단 요청</h5>
    </header>
    <main class="popup-modal-content">
      <div class="ta-c">
        <p>선택한 장치에 자체진단을 요청합니다.</p>
        <p>계속 진행하시려면 로그인 패스워드를 입력하여 작업을 승인해야 합니다</p>
      </div>
      <table class="table-type-a">
        <colgroup>
          <col style="width:10rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">로그인 패스워드</th>
            <td><BFormInput type="password" placeholder="비밀번호를 입력하세요" /></td>
          </tr>
          <tr>
            <th scope="row">진단레벨</th>
            <td><BFormInput type="password" placeholder="기본-레벨1" value="기본-레벨1" /></td>
          </tr>
        </tbody>
      </table>
    </main>
    <footer class="popup-modal-footer">
      <BButton class="gray28" @click="closePopup">취소</BButton>
      <BButton class="blue28" @click="openRackBIT">요청</BButton>
    </footer>
  </div>
</template>

<script setup>
import { BButton, BFormInput } from 'bootstrap-vue-next/components'
function openRackBIT() {
  window.open('/dashboard/popup/rackbitdetail', 'RackBITDetail', 'width=500,height=500,scrollbars=yes');
}
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
.popup-modal-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 2.6rem 2rem;
  overflow-y: auto;
  font-size: 1.4rem;
  word-break: keep-all;
}
.popup-modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem 2.6rem 1.9rem;
  gap: 1rem;
}
</style>
