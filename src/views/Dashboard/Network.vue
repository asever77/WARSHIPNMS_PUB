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

      <NetworkBox
        type="major"
        top="32rem"
        left="30.6rem"
        :img="imgNetwork1"
        text="무선통신운용콘솔"
      >
        <NetworkBox
          type="gray"
          top="13.6rem"
          left="-10.3rem"
          text="NMS"
        />
        <NetworkBox
          type="gray"
          top="13.6rem"
          left="11.3rem"
          text="VoIP 교환기"
        />
        <NetworkBox
          type="blue"
          top="-9.9rem"
          left="10.8rem"
          text="사용자단말"
          :terminal="[4,3,2]"
        />

        <NetworkLine line="poe" ps="tr-bl" width="8rem" height="5rem" bottom="100%" left="70%" />
        <NetworkLine line="sfp" ps="tl-br" width="6rem" height="5rem" bottom="100%" right="70%" />

        <NetworkLine line="poe" ps="tr-bl" width="9rem" height="6rem" top="100%" right="70%" />
        <NetworkLine line="poe" ps="tl-br" width="9rem" height="6rem" top="100%" left="70%" />


      </NetworkBox>

      <NetworkLine line="sfp" ps="lr" width="12rem" top="35.5rem" left="40.7rem" />
      <NetworkLine line="sfp" ps="lr" width="12rem" top="35.5rem" right="40.7rem" />

      <NetworkLine line="poe" ps="lr" width="10rem" top="10rem" left="23rem" />


      <NetworkLine line="poe" ps="tb" height="10rem" top="13rem" left="23rem" />
      <NetworkLine line="sfp" ps="tb" height="10rem" top="13rem" left="34rem" />





      <NetworkLine line="sfp" ps="tr-bl" width="10rem" height="10rem" top="21rem" left="12rem" />

      <NetworkLine line="poe" ps="tr-br" width="2rem" height="6rem" top="32rem" />
      <NetworkLine line="sfp" ps="tl-bl" width="3rem" height="10rem" top="32rem" left="15rem" />




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
</template>

<style scoped lang="scss">


</style>

<script setup>
import { ref, onMounted } from "vue";
import NetworkLine from "@/components/NetworkLine.vue";
import NetworkBox from "@/components/NetworkBox.vue";
import G from "@/config/global.js";
import axios from "axios";
import config from "@/config/config";

import imgNetwork1 from '@/assets/images/network/img1.png';

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
</script>
