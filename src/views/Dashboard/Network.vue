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
            <div class="network-line" data-line="poe"><div class="network-line--line"></div></div>
            이더넷(PoE)
          </div>
          <div class="network-legend-item">
            <div class="network-line" data-line="sfp"><div class="network-line--line"></div></div>
            광(SFP)
          </div>
        </div>
      </div>

      <div class="network-dashboard--wrap">
        <!-- 무선통신운용콘솔 -->
        <NetworkBox
          type="major"
          top="calc(50% - 1.9rem)"
          left="calc(50% - 5.2rem)"
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
          <NetworkLine line="poe" ps="tr-bl" width="9rem" height="3rem" top="100%" right="70%" >
            <NetworkBox
              type="gray"
              top="100%"
              left="calc(0rem - 50%)"
              text="NMS"
              :callback="openDetailsModal"
            />
          </NetworkLine>
          <NetworkLine line="poe" ps="tl-br" width="9rem" height="3rem" top="100%" left="70%" >
            <NetworkBox
              type="gray"
              top="100%"
              left="calc(50% - .4rem)"
              text="VoIP 교환기"
              :callback="openDetailsModal"
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
              :callback="openDetailsModal"
            />
          </NetworkLine>
          <NetworkLine line="poe" ps="tb" height="4rem" bottom="100%" left="calc(50% - 0.4rem)">
            <NetworkBox
              type="gray"
              bottom="100%"
              left="calc(100% - 4.6rem)"
              text="CCTV"
              :callback="openDetailsModal"
            />
          </NetworkLine>
          <NetworkLine line="poe" ps="tr-bl" width="21rem" height="4rem" bottom="100%" left="70%">
            <NetworkBox
              type="gray"
              bottom="100%"
              left="calc(100% - 4.6rem)"
              text="방송 및 경보"
              :callback="openDetailsModal"
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
        <NetworkLine line="sfp" state="warning" ps="tb" height="3rem" top="calc(50% - 13.9rem)" left="calc(50% - 8.2rem)" />
        <NetworkLine line="sfp" ps="lr" width="12.8rem" top="calc(50% + 1.6rem)" left="calc(50% - 18rem)" />
        <NetworkLine line="sfp" ps="lr" width="12.8rem" top="calc(50% + 1.6rem)" left="calc(50% + 5.2rem)" />
        <NetworkLine line="sfp" state="warning" ps="lr" width="4rem" top="calc(50% + 17.1rem)" left="calc(50% - 18rem)" />
        <NetworkLine line="sfp" ps="lr" width="4rem" top="calc(50% + 17.1rem)" left="calc(50% - 2rem)" />
        <NetworkLine line="sfp" state="warning" ps="lr" width="4rem" top="calc(50% + 17.1rem)" left="calc(50% + 14rem)" />

        <NetworkLine line="sfp" state="abnormal" ps="tr-br" width="3rem" height="16rem" top="calc(50% + 1.8rem)" left="calc(50% - 32.9rem)" />
        <NetworkLine line="sfp" ps="tl-bl" width="3rem" height="16rem" top="calc(50% + 1.8rem)" left="calc(50% + 30rem)" />
      </div>
    </div>
    <div class="network-side" >
      <div class="network-info">
        <div class="network-info--item">
          <h3>{{ lang.info1 }}</h3>
          <ul>
            <li class="network-info--text">
              <i class="network-info--icon w1-1"></i>
              <em class="network-info--key">{{ lang.info1_1 }}</em>
              <b class="network-info--value">25.7∘C</b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon w2"></i>
              <em class="network-info--key">{{ lang.info1_2 }}</em>
              <b class="network-info--value">50%</b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon w3"></i>
              <em class="network-info--key">{{ lang.info1_3 }}</em>
              <b class="network-info--value">4.26 m/s</b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon w4"></i>
              <em class="network-info--key">{{ lang.info1_4 }}</em>
              <b class="network-info--value">170.17</b>
            </li>
          </ul>
        </div>
        <div class="network-info--item">
          <h3>{{ lang.info2 }}</h3>
          <ul>
            <li class="network-info--text">
              <i class="network-info--icon s1"></i>
              <em class="network-info--key">{{ lang.info2_1 }}</em>
              <b class="network-info--value">10.7 <span>knots</span></b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon s2"></i>
              <em class="network-info--key">{{ lang.info2_2 }}</em>
              <b class="network-info--value">33°06'N</b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon s3"></i>
              <em class="network-info--key">{{ lang.info2_3 }}</em>
              <b class="network-info--value">129°06'425E</b>
            </li>
            <li class="network-info--text">
              <i class="network-info--icon s4"></i>
              <em class="network-info--key">{{ lang.info2_4 }}</em>
              <b class="network-info--value">170.71</b>
            </li>
          </ul>
        </div>
      </div>
      <div class="network-table">
        <h3 class="network-title">{{ lang.tbl_1_title }}</h3>
         <table class="base-table line">
          <colgroup>
            <col style="width:5rem">
            <col style="width:auto">
            <col style="width:auto">
            <col style="width:7rem;">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{{ lang.tbl_1_th1 }}</th>
              <th scope="col">{{ lang.tbl_1_th2 }}</th>
              <th scope="col">{{ lang.tbl_1_th3 }}</th>
              <th scope="col">{{ lang.tbl_1_th4 }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" rowspan="3">HF</th>
              <th scope="row">HF송수신기 #1</th>
              <td>사용자단말 #1</td>
              <td class="green-txt">Busy</td>
            </tr>
            <tr>
              <th scope="row">HF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td class="blue-txt">Ready</td>
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
              <td class="green-txt">Busy</td>
            </tr>
            <tr>
              <th scope="row">VHF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">VHF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td class="blue-txt">Ready</td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th scope="row" rowspan="3">UHF</th>
              <th scope="row">UHF송수신기 #1</th>
              <td>사용자단말 #1</td>
              <td class="green-txt">Busy</td>
            </tr>
            <tr>
              <th scope="row">UHF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">UHF송수신기 #2</th>
              <td>사용자단말 #2</td>
              <td class="blue-txt">Ready</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>


  <!-- modal 무선통신기시스템 -->
  <UiModal
    v-model="modals.modalSwitchDetail.show"
    :title="modals.modalSwitchDetail.title"
    type="modal"
    size="lg"
    @close-btn-click="modals.modalSwitchDetail.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
      <table class="table-type-a">
        <colgroup>
          <col style="width:7rem">
          <col style="width:auto">
          <col style="width:7rem">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">{{ lang.tbl_2_th1 }}</th>
            <td>무선통신기시스템 L2 스위치</td>
            <th scope="row">{{ lang.tbl_2_th2 }}</th>
            <td>1.0.1</td>
          </tr>
          <tr>
            <th scope="row">{{ lang.tbl_2_th3 }}</th>
            <td>C9200-24T-4G-E</td>
            <th scope="row">{{ lang.tbl_2_th4 }}</th>
            <td>ZYXELaRTxu10</td>
          </tr>
          <tr>
            <th scope="row">{{ lang.tbl_2_th5 }}</th>
            <td>192.168.1.1</td>
            <th scope="row">{{ lang.tbl_2_th6 }}</th>
            <td>무선통신기시스템</td>
          </tr>
        </tbody>
      </table>

      <div class="ui-flex" data-gap="10">
        <div class="box-round ui-flex-1"></div>
        <table class="table-type-a ui-flex-1">
          <colgroup>
            <col style="width:8rem">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">{{ lang.tbl_3_th1 }}</th>
              <td class="green ta-c">정상</td>
            </tr>
            <tr>
              <th scope="row">{{ lang.tbl_3_th2 }}</th>
              <td>24.5 ℃</td>
            </tr>
            <tr>
              <th scope="row">{{ lang.tbl_3_th3 }}</th>
              <td>20250820 09:00:00</td>
            </tr>
            <tr>
              <th scope="row">{{ lang.tbl_3_th4 }}</th>
              <td>123.45 watt</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="ui-flex box-round p-3" data-bg="gray" data-direction="col">
        <h4 class="ports-status--title">Port Status</h4>
        <PortStatusList />
      </div>

      <table class="table-type-a line">
        <colgroup>
          <col style="width:6rem">
          <col style="width:auto">
          <col style="width:auto">
        </colgroup>
        <colgroup>
          <col style="width:6rem">
          <col style="width:auto">
          <col style="width:auto">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Port #<br>({{ lang.tbl_4_th1 }})</th>
            <th scope="col">Link Speed</th>
            <th scope="col">{{ lang.tbl_4_th2 }}<br>(watt)</th>
            <th scope="col">Port #<br>({{ lang.tbl_4_th1 }})</th>
            <th scope="col">Link Speed</th>
            <th scope="col">{{ lang.tbl_4_th2 }}<br>(watt)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td class="ta-c">1 G/F</td>
            <td class="ta-c">12.34</td>
            <th scope="row">2</th>
            <td class="ta-c">1 G/F</td>
            <td class="ta-c">12.34</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td class="ta-c">1 G/F</td>
            <td class="ta-c">12.34</td>
            <th scope="row">2</th>
            <td class="ta-c">1 G/F</td>
            <td class="ta-c">12.34</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td class="ta-c">1 G/F</td>
            <td class="ta-c">12.34</td>
            <th scope="row">2</th>
            <td class="ta-c">1 G/F</td>
            <td class="ta-c">12.34</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td class="ta-c">1 G/F</td>
            <td class="ta-c">12.34</td>
            <th scope="row">2</th>
            <td class="ta-c">1 G/F</td>
            <td class="ta-c">12.34</td>
          </tr>

        </tbody>
      </table>
    </div>
  </UiModal>

  <!-- modal 사용자단말 -->
  <UiModal
    v-model="modals.modalUserTerminal.show"
    :title="modals.modalUserTerminal.title"
    type="modal"
    size="md"
    @close-btn-click="modals.modalUserTerminal.show = false"
  >
    <div class="ui-flex" data-direction="col" data-gap="16">
       <table class="table-type-a line">
        <colgroup>
          <col style="width:15rem">
          <col style="width:auto">
          <col style="width:auto">
          <col style="width:auto">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">{{ lang.tbl_5_th1 }}</th>
            <th scope="col">{{ lang.tbl_5_th2 }}</th>
            <th scope="col">{{ lang.tbl_5_th3 }}</th>
            <th scope="col">{{ lang.tbl_5_th4 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">사용자단말 #1</th>
            <td class="ta-c">함교실</td>
            <td class="ta-c">1889</td>
            <td class="ta-c">정상(통화중)</td>
          </tr>
          <tr>
            <th scope="row">사용자단말 #1</th>
            <td class="ta-c">함교실</td>
            <td class="ta-c">1889</td>
            <td class="ta-c red">비정상</td>
          </tr>
          <tr>
            <th scope="row">사용자단말 #1</th>
            <td class="ta-c">함교실</td>
            <td class="ta-c">1889</td>
            <td class="ta-c">정상</td>
          </tr>
        </tbody>
      </table>

    </div>
  </UiModal>

  <!-- modal 장치상세 -->
  <UiModal
    v-model="modals.modalDetails.show"
    :title="modals.modalDetails.title"
    type="modal"
    size="md"
    @close-btn-click="modals.modalDetails.show = false"
  >
    <div class="ui-flex network-detail" data-direction="col" data-gap="16">
      <table class="table-type-a line">
        <colgroup>
          <col style="width:5rem">
          <col style="width:6rem">
          <col style="width:auto">
          <col style="width:auto">
        </colgroup>
        <thead>
          <tr>
            <th colspan="2" scope="col">{{ lang.tbl_6_th1 }}</th>
            <th class="ta-c" scope="col">NMS #1 (주)</th>
            <th class="ta-c" scope="col">NMS #3 (부)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" rowspan="2">{{ lang.tbl_6_th2 }}</th>
            <th scope="row">{{ lang.tbl_6_th2_1 }}</th>
            <td class="ta-c">192.168.0.40</td>
            <td class="ta-c">192.168.0.40</td>
          </tr>
          <tr>
            <th scope="row">{{ lang.tbl_6_th2_2 }}</th>
             <td class="ta-c">192.168.0.40</td>
            <td class="ta-c">192.168.0.40</td>
          </tr>

          <!-- NMS -->
          <tr>
            <th scope="row" colspan="2">{{ lang.tbl_6_th3 }}</th>
            <td class="ta-c green">정상</td>
            <td class="ta-c red">비정상</td>
          </tr>

          <!-- VoIP -->
          <tr>
            <th scope="row" colspan="2">{{ lang.tbl_6_th4 }}</th>
            <td class="ta-c">TG2z7ZbBQq</td>
            <td class="ta-c">TG2z7ZbBQq</td>
          </tr>

          <tr>
            <th scope="row" colspan="2">{{ lang.tbl_6_th5 }}</th>
            <td class="ta-c">무선통신운용콘솔</td>
            <td class="ta-c">무선통신운용콘솔</td>
          </tr>
          <tr>
            <th scope="row" colspan="2">{{ lang.tbl_6_th6 }}</th>
            <td class="ta-c">2025-09-10 13:10:22</td>
            <td class="ta-c">2025-09-10 13:10:22</td>
          </tr>

          <tr>
            <th scope="row" colspan="2" rowspan="2">{{ lang.tbl_6_th6 }}</th>
            <td class="ta-c">
              <div class="box-round">
                <img src="@/assets/images/network/sample.png" alt="">
              </div>
            </td>
            <td class="ta-c">
              <div class="box-round">
                <img src="@/assets/images/network/sample.png" alt="">
              </div>
            </td>
          </tr>
          <tr>
            <td class="ta-c">
              <div class="progress-flex">
                <progress
                  max="100"
                  value="80"
                ></progress>
                <b>80%</b>
              </div>
            </td>
            <td class="ta-c">
              <div class="progress-flex">
                <progress
                  max="100"
                  value="80"
                ></progress>
                <b>80%</b>
              </div>
            </td>
          </tr>

          <tr>
            <th scope="row" colspan="2" rowspan="2">{{ lang.tbl_6_th7 }}</th>
            <td class="ta-c">
              <div class="box-round">
                <img src="@/assets/images/network/sample.png" alt="">
              </div>
            </td>
            <td class="ta-c">
              <div class="box-round">
                <img src="@/assets/images/network/sample.png" alt="">
              </div>
            </td>
          </tr>
          <tr>
            <td class="ta-c">
              <div class="progress-flex">
                <progress
                  max="100"
                  value="77"
                ></progress>
                <b>77% / 3.6Gi</b>
              </div>
            </td>
            <td class="ta-c">
              <div class="progress-flex">
                <progress
                  max="100"
                  value="77"
                ></progress>
                <b>77% / 3.6Gi</b>
              </div>
            </td>
          </tr>

          <tr>
            <th scope="row" colspan="2">{{ lang.tbl_6_th8 }}</th>
            <td class="ta-c">
              <div class="progress-flex">
                <progress
                  max="100"
                  value="50"
                ></progress>
                <b>62% / 1014M</b>
              </div>
            </td>
            <td class="ta-c">
              <div class="progress-flex">
                <progress
                  max="100"
                  value="50"
                ></progress>
                <b>62% / 1014M</b>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UiModal>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import NetworkLine from "@/components/NetworkLine.vue";
import NetworkBox from "@/components/NetworkBox.vue";
import UiModal from '@/components/UiModal.vue'
import PortStatusList from '@/components/PortStatusList.vue';

import G from "@/config/global.js";

import imgNetwork1 from '@/assets/images/network/img1.png';
import imgNetwork2 from '@/assets/images/network/img2.png';
import imgNetwork3 from '@/assets/images/network/img3.png';
import imgNetwork4 from '@/assets/images/network/img4.png';

const ko = {
  info1: "기상 정보",
  info1_1: "현재 온도",
  info1_2: "습도",
  info1_3: "풍속",
  info1_4: "풍량",

  info2: "운항 정보",
  info2_1: "항속",
  info2_2: "위도",
  info2_3: "경도",
  info2_4: "방위",

  tbl_1_title: "무선통신기 (연결장치)",
  tbl_1_th1: "구분",
  tbl_1_th2: "장비명",
  tbl_1_th3: "연결장치",
  tbl_1_th4: "동작상태",

  tbl_2_th1: "장치명",
  tbl_2_th2: "펌웨어버전",
  tbl_2_th3: "모델명",
  tbl_2_th4: "시리얼번호",
  tbl_2_th5: "IP",
  tbl_2_th6: "위치",

  tbl_3_th1: "FAN",
  tbl_3_th2: "온도",
  tbl_3_th3: "부팅시간",
  tbl_3_th4: "소모전력(전체)",

  tbl_4_th1: "이름",
  tbl_4_th2: "소모전력",

  tbl_5_th1: "장치명",
  tbl_5_th2: "위치",
  tbl_5_th3: "내선 번호",
  tbl_5_th4: "상태",

  tbl_6_th1: "장치명",
  tbl_6_th2: "IP",
  tbl_6_th2_1: "VIP",
  tbl_6_th2_2: "Real",
  tbl_6_th3: "DB상태",
  tbl_6_th4: "일련번호",
  tbl_6_th5: "L2 스위치",
  tbl_6_th6: "CPU 사용률",
  tbl_6_th7: "메모리",
  tbl_6_th8: "Disk 사용량",
};
const en = {
  info1: "기상 정보",
  info1_1: "현재 온도",
  info1_2: "습도",
  info1_3: "풍속",
  info1_4: "풍량",

  info2: "운항 정보",
  info2_1: "항속",
  info2_2: "위도",
  info2_3: "경도",
  info2_4: "방위",

  tbl_1_title: "무선통신기 (연결장치)",
  tbl_1_th1: "구분",
  tbl_1_th2: "장비명",
  tbl_1_th3: "연결장치",
  tbl_1_th4: "동작상태",

  tbl_2_th1: "장치명",
  tbl_2_th2: "펌웨어버전",
  tbl_2_th3: "모델명",
  tbl_2_th4: "시리얼번호",
  tbl_2_th5: "IP",
  tbl_2_th6: "위치",

  tbl_3_th1: "FAN",
  tbl_3_th2: "온도",
  tbl_3_th3: "부팅시간",
  tbl_3_th4: "소모전력(전체)",

  tbl_4_th1: "이름",
  tbl_4_th2: "소모전력",

  tbl_5_th1: "장치명",
  tbl_5_th2: "위치",
  tbl_5_th3: "내선 번호",
  tbl_5_th4: "상태",

  tbl_6_th1: "장치명",
  tbl_6_th2: "IP",
  tbl_6_th2_1: "VIP",
  tbl_6_th2_2: "Real",
  tbl_6_th3: "DB상태",
  tbl_6_th4: "일련번호",
  tbl_6_th5: "L2 스위치",
  tbl_6_th6: "CPU 사용률",
  tbl_6_th7: "메모리",
  tbl_6_th8: "Disk 사용량",
};
const lang = ref({});

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
});

const modals = reactive({
  modalSwitchDetail: {
    show: false,
    title: ''
  },
  modalUserTerminal: {
    show: false,
    title: ''
  },
  modalDetails: {
    show: false,
    title: ''
  }
});

function openSwitchModal(e) {
  modals.modalSwitchDetail.show = true;
  modals.modalSwitchDetail.title = getTextFromEvent(e);
}
function openUserTerminalModal(e) {
  modals.modalUserTerminal.show = true;
  modals.modalUserTerminal.title = getTextFromEvent(e);
}
function openDetailsModal(e) {
  modals.modalDetails.show = true;
  modals.modalDetails.title = getTextFromEvent(e);
}
function getTextFromEvent(e) {
  let el = e?.target?.closest('.network-item');
  console.log('el', el);

  if (el) {
    if (el.dataset.type === 'blue') {
      const elParent = el.parentElement?.closest('.network-item');

      const name =  `${el.dataset.name} (${elParent?.dataset.name || ''})`;
      return name.trim();
    } else if (el.dataset.type === 'gray') {
      return el.dataset.name;
    } else {
      return `${el.dataset.name} L2 스위치`;
    }
  }
  return '';
}
</script>
