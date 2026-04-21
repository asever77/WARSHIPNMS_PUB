<template>
  <div class="popup-modal">
    <header class="popup-modal-header">
      <h5 class="popup-modal-title">UPS</h5>
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
        </tbody>
      </table>

      <table class="table-type-a">
        <colgroup>
          <col style="width:15rem">
          <col style="width:auto">
          <col style="width:15rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">배터리상태</th>
            <td>정상</td>
            <th scope="row">배터리 사용시간(초)</th>
            <td>전원 미사용</td>
          </tr>
          <tr>
            <th scope="row">배터리 잔여시간(분)</th>
            <td>68</td>
            <th scope="row">잔여 배터리 충전량(%)</th>
            <td>50</td>
          </tr>
          <tr>
            <th scope="row">배터리 전압(Volt/DC)</th>
            <td>34</td>
            <th scope="row">배터리 전류(Ampere/DC)</th>
            <td>65</td>
          </tr>
          <tr>
            <th scope="row">배터리 주변온도(섭씨)</th>
            <td>24</td>
            <th scope="row">입력 라인 수</th>
            <td>10</td>
          </tr>
          <tr>
            <th scope="row">입력라인 이상 발생 횟수</th>
            <td>0</td>
            <th scope="row">출력전원 소스</th>
            <td>정상</td>
          </tr>
          <tr>
            <th scope="row">출력 주파수(Hz)</th>
            <td>23</td>
            <th scope="row">출력 라인 수</th>
            <td>2</td>
          </tr>
          <tr>
            <th scope="row">바이패스 주파수(Hz)</th>
            <td>43</td>
            <th scope="row">바이패스 라인 수</th>
            <td>10</td>
          </tr>
        </tbody>
      </table>



      <div class="ui-thead-sticky" data-max-h="160">
        <table class="table-type-a line">
          <col style="width:auto">
          <colgroup>
            <col style="width:auto">
            <col style="width:auto">
            <col style="width:auto">
          </colgroup>
          <colgroup>
            <col style="width:auto">
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
              <th scope="col" rowspan="2">index</th>
              <th scope="col" colspan="3">입력라인</th>
              <th scope="col" colspan="4">출력라인</th>
              <th scope="col" colspan="3">바이패스</th>
            </tr>
            <tr>
              <th scope="col" class="l-line">주파수(Hz)</th>
              <th scope="col">전압(V)</th>
              <th scope="col">전류(A)</th>
              <th scope="col">전압(V)</th>
              <th scope="col">전류(A)</th>
              <th scope="col">전력(W)</th>
              <th scope="col">부하율(%)</th>
              <th scope="col">전압(V)</th>
              <th scope="col">전류(A)</th>
              <th scope="col">전력(W)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
              <td class="ta-c">20</td>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
              <td class="ta-c">20</td>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
              <td class="ta-c">20</td>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
              <td class="ta-c">20</td>
              <td class="ta-c">30.2</td>
              <td class="ta-c">42</td>
              <td class="ta-c">20</td>
            </tr>

          </tbody>
        </table>
      </div>

    </main>
  </div>
</template>

<script setup>

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
.ui-thead-sticky {
  min-height:15.8rem
}
</style>
