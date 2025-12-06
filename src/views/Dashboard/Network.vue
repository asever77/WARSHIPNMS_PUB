<template>
  <div class="network-wrap">
    <div class="network-dashboard">
      <h3 class="network-title">네트워크 링크 상태</h3>
      <div class="network-legend">
        <div class="network-box">
          사용자단말<br>
          <b class="network-box--normal">정상</b>
          <b>/</b>
          <b class="network-box--abnormal">비정상</b>
          <b>(통화중)</b>
        </div>
        <div class="network-legend-lines">
          <div class="network-legend-item">
            <div class="network-line" data-line="poe"><div></div></div>
            이더넷(PoE)
          </div>
          <div class="network-legend-item">
            <div class="network-line" data-line="sfp"><div></div></div>
            광(SFP)
          </div>
        </div>
      </div>

      <!-- 무선통신운용콘솔 -->
      <NetworkBox
        type="major"
        top="32rem"
        left="30.6rem"
        :img="imgNetwork1"
        text="무선통신운용콘솔"
        :callback="openSwitchModal"
      >
        <NetworkLine line="poe" ps="tr-bl" width="8rem" height="4rem" bottom="100%" left="70%">
          <NetworkBox
            type="blue"
            bottom="100%"
            left="calc(50% - .6rem)"
            text="사용자단말"
            :terminal="[4,0,2]"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
        <NetworkLine line="poe" ps="tr-bl" width="9rem" height="4rem" top="100%" right="70%" >
           <NetworkBox
            type="gray"
            top="100%"
            left="calc(0rem - 50%)"
            text="NMS"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
        <NetworkLine line="poe" ps="tl-br" width="9rem" height="4rem" top="100%" left="70%" >
          <NetworkBox
            type="gray"
            top="100%"
            left="calc(50% - .4rem)"
            text="VoIP 교환기"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
      </NetworkBox>

      <!-- L3 스위치 -->
      <NetworkBox
        type="sub"
        top="calc(50% - 19rem)"
        left="calc(50% - 13.8rem)"
        :img="imgNetwork1"
        text="L3 스위치"
        :callback="openSwitchModal"
      >
        <NetworkLine line="poe" ps="tl-br" width="10rem" height="4rem" bottom="100%" right="70%">
          <NetworkBox
            type="gray"
            bottom="100%"
            left="-4rem"
            text="군위성-II"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
        <NetworkLine line="poe" ps="tb" height="4rem" bottom="100%" left="calc(50% - 0.4rem)">
          <NetworkBox
            type="gray"
            bottom="100%"
            left="calc(100% - 4.6rem)"
            text="CCTV"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
        <NetworkLine line="poe" ps="tr-bl" width="21rem" height="4rem" bottom="100%" left="70%">
          <NetworkBox
            type="gray"
            bottom="100%"
            left="calc(100% - 4.6rem)"
            text="방송 및 경보"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
      </NetworkBox>

      <!-- UTM -->
      <NetworkBox
        type="sub"
        top="calc(50% - 11rem)"
        left="calc(50% - 13.8rem)"
        :img="imgNetwork3"
        text="UTM"
        :callback="openSwitchModal"
      />

      <!-- 무선통신기시스템 -->
      <NetworkBox
        type="sub"
        top="calc(50% - 0.6rem)"
        left="calc(50% - 30rem)"
        :img="imgNetwork2"
        text="무선통신기시스템"
        :callback="openSwitchModal"
      >
        <NetworkLine line="poe" ps="tb" height="4rem" bottom="100%" left="50%">
          <NetworkBox
            type="blue"
            bottom="100%"
            left="-4rem"
            text="사용자단말"
            :terminal="[4,3,2]"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
      </NetworkBox>
      <!-- 비상통신시스템 -->
      <NetworkBox
        type="sub"
        top="calc(50% - 0.6rem)"
        left="calc(50% + 18rem)"
        :img="imgNetwork4"
        text="비상통신시스템"
        :callback="openSwitchModal"
      >
        <NetworkLine line="poe" ps="tb" height="4rem" bottom="100%" left="50%">
          <NetworkBox
            type="blue"
            bottom="100%"
            left="-4rem"
            text="사용자단말"
            :terminal="[4,0,2]"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
      </NetworkBox>

      <!-- 소형통신랙 #1 -->
      <NetworkBox
        type="sub"
        top="calc(50% + 15rem)"
        left="calc(50% - 30rem)"
        :img="imgNetwork1"
        text="소형통신랙 #1"
        :callback="openSwitchModal"
      >
        <NetworkLine line="poe" ps="tb" height="4rem" top="100%" left="50%">
          <NetworkBox
            type="blue"
            top="100%"
            left="-4rem"
            text="사용자단말"
            :terminal="[4,0,2]"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
      </NetworkBox>

      <!-- 소형통신랙 #2 -->
      <NetworkBox
        type="sub"
        top="calc(50% + 15rem)"
        left="calc(50% - 14rem)"
        :img="imgNetwork1"
        text="소형통신랙 #2"
        :callback="openSwitchModal"
      >
        <NetworkLine line="poe" ps="tb" height="4rem" top="100%" left="50%">
          <NetworkBox
            type="blue"
            top="100%"
            left="-4rem"
            text="사용자단말"
            :terminal="[4,0,2]"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
      </NetworkBox>

      <!-- 소형통신랙 #3 -->
      <NetworkBox
        type="sub"
        top="calc(50% + 15rem)"
        left="calc(50% + 2rem)"
        :img="imgNetwork1"
        text="소형통신랙 #3"
        :callback="openSwitchModal"
      >
        <NetworkLine line="poe" ps="tb" height="4rem" top="100%" left="50%">
          <NetworkBox
            type="blue"
            top="100%"
            left="-4rem"
            text="사용자단말"
            :terminal="[4,0,2]"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
      </NetworkBox>

      <!-- 소형통신랙 #4 -->
      <NetworkBox
        type="sub"
        top="calc(50% + 15rem)"
        left="calc(50% + 18rem)"
        :img="imgNetwork1"
        text="소형통신랙 #4"
        :callback="openSwitchModal"
      >
        <NetworkLine line="poe" ps="tb" height="4rem" top="100%" left="50%">
          <NetworkBox
            type="blue"
            top="100%"
            left="-4rem"
            text="사용자단말"
            :terminal="[4,0,2]"
            :callback="openUserTerminalModal"
          />
        </NetworkLine>
      </NetworkBox>

      <!-- 네트워크 라인 -->
      <NetworkLine line="sfp" ps="tl-br" width="6rem" height="4rem" top="calc(50% - 5.8rem)" left="calc(50% - 8rem)"/>
      <NetworkLine line="sfp" ps="tb" height="3rem" top="calc(50% - 13.9rem)" left="calc(50% - 8.2rem)" />
      <NetworkLine line="sfp" ps="lr" width="12.8rem" top="calc(50% + 1.6rem)" left="calc(50% - 18rem)" />
      <NetworkLine line="sfp" ps="lr" width="12.8rem" top="calc(50% + 1.6rem)" left="calc(50% + 5.2rem)" />
      <NetworkLine line="sfp" ps="lr" width="4rem" top="calc(50% + 17.1rem)" left="calc(50% - 18rem)" />
      <NetworkLine line="sfp" ps="lr" width="4rem" top="calc(50% + 17.1rem)" left="calc(50% - 2rem)" />
      <NetworkLine line="sfp" ps="lr" width="4rem" top="calc(50% + 17.1rem)" left="calc(50% + 14rem)" />
      <NetworkLine line="sfp" ps="tr-br" width="3rem" height="16rem" top="calc(50% + 1.8rem)" left="calc(50% - 32.9rem)" />
      <NetworkLine line="sfp" ps="tl-bl" width="3rem" height="16rem" top="calc(50% + 1.8rem)" left="calc(50% + 30rem)" />

    </div>
    <div class="network-side" >
      <div class="network-info">
        <div class="network-info--item">
          <h3>기상 정보</h3>
          <ul>
            <li class="network-info--text">
              <i class="network-info--icon w1-1"></i>
              <em class="network-info--key">현재 온도</em>
              <b class="network-info--value">25.7∘C</b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon w2"></i>
              <em class="network-info--key">습도</em>
              <b class="network-info--value">50%</b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon w3"></i>
              <em class="network-info--key">풍속</em>
              <b class="network-info--value">4.26 m/s</b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon w4"></i>
              <em class="network-info--key">풍량</em>
              <b class="network-info--value">170.17</b>
            </li>
          </ul>
        </div>
        <div class="network-info--item">
          <h3>운항 정보</h3>
          <ul>
            <li class="network-info--text">
              <i class="network-info--icon s1"></i>
              <em class="network-info--key">항속</em>
              <b class="network-info--value">10.7 <span>knots</span></b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon s2"></i>
              <em class="network-info--key">위도</em>
              <b class="network-info--value">33°06'N</b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon s3"></i>
              <em class="network-info--key">경도</em>
              <b class="network-info--value">129°06'425E</b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon s4"></i>
              <em class="network-info--key">방위</em>
              <b class="network-info--value">170.71</b>
            </li>
          </ul>
        </div>
      </div>
      <div class="network-table">
        <h3 class="network-title">무선통신기 (연결장치)</h3>
         <table class="base-table line">
          <colgroup>
            <col style="width:5rem">
            <col style="width:auto">
            <col style="width:auto">
            <col style="width:7rem;">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">구분</th>
              <th scope="col">장비명</th>
              <th scope="col">연결장치</th>
              <th scope="col">동작상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" rowspan="3">HF</th>
              <th scope="row">HF송수신기 #1</th>
              <td>사용자단말 #1</td>
              <td><b class="network-busy">Busy</b></td>
            </tr>
            <tr>
              <th scope="row">HF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td><b class="network-ready">Ready</b></td>
            </tr>
            <tr>
              <th scope="row">HF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td>-</td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th scope="row" rowspan="3">VHF</th>
              <th scope="row">VHF송수신기 #1</th>
              <td>사용자단말 #1</td>
              <td><b class="network-busy">Busy</b></td>
            </tr>
            <tr>
              <th scope="row">VHF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">VHF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td><b class="network-ready">Ready</b></td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th scope="row" rowspan="3">UHF</th>
              <th scope="row">UHF송수신기 #1</th>
              <td>사용자단말 #1</td>
              <td><b class="network-busy">Busy</b></td>
            </tr>
            <tr>
              <th scope="row">UHF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">UHF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td><b class="network-ready">Ready</b></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>


  <!-- modal 무선통신기시스템 -->
  <UiModal
    v-model="modals.modalSwitchDetail.show"
    :title="'무선통신기시스템 L2 스위치'"
    type="modal"
    size="md"
    @close-btn-click="modals.modalSwitchDetail.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      ddddd
    </div>
  </UiModal>

  <!-- modal 사용자단말 -->
  <UiModal
    v-model="modals.modalUserTerminal.show"
    :title="'사용자단말 (무선통신기시스템)'"
    type="modal"
    size="md"
    @close-btn-click="modals.modalUserTerminal.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      ddddd
    </div>
  </UiModal>
</template>

<style scoped lang="scss">


</style>

<script setup>
import { ref, onMounted, reactive } from "vue";
import NetworkLine from "@/components/NetworkLine.vue";
import NetworkBox from "@/components/NetworkBox.vue";
import UiModal from '@/components/UiModal.vue'

import G from "@/config/global.js";
import axios from "axios";
import config from "@/config/config";

import imgNetwork1 from '@/assets/images/network/img1.png';
import imgNetwork2 from '@/assets/images/network/img2.png';
import imgNetwork3 from '@/assets/images/network/img3.png';
import imgNetwork4 from '@/assets/images/network/img4.png';

const ko = {
  "title": "네트워크 내용"
};

const en = {
  "title": "네트워크 내용"
};

const lang = ref({});

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
});

const adminTest = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  console.log(user.loginId);

  const url = config.getHost() + "/test/adminmenu";
  const data = {
    loginId: user.loginId,
    menuId: "MNU1100"
  };

  axios.post(url, data)
    .then(response => {
      if (response.data === "AUTH") {
        alert("권한이 없습니다.");
        return;
      }
      alert("권한이 있습니다. " + response.data);
    })
    .catch(error => {
      httpUtils.errorHandler(error);
    });
};

const managerTest = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const url = config.getHost() + "/test/managermenu";
  const data = {
    loginId: user.loginId,
    menuId: "MNU1200"
  };

  axios.post(url, data)
    .then(response => {
      if (response.data === "AUTH") {
        alert("권한이 없습니다.");
        return;
      }
      alert("권한이 있습니다. " + response.data);
    })
    .catch(error => {
      httpUtils.errorHandler(error);
    });
};

const userTest = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const url = config.getHost() + "/test/usermenu";
  const data = {
    loginId: user.loginId,
    menuId: "MNU1300"
  };

  axios.post(url, data)
    .then(response => {
      if (response.data === "AUTH") {
        alert("권한이 없습니다.");
        return;
      }
      alert("권한이 있습니다. " + response.data);
    })
    .catch(error => {
      httpUtils.errorHandler(error);
    });
};

const modals = reactive({
  modalSwitchDetail: {
    show: false
  },
  modalUserTerminal: {
    show: false
  },
});

function openSwitchModal() {
  modals.modalSwitchDetail.show = true;
}
function openUserTerminalModal() {
  modals.modalUserTerminal.show = true;
}
</script>
