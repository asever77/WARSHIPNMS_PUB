<template>
  <div class="network-wrap">
    <div class="network-map">

    </div>
    <div class="network-info">
      <div class="info-table">
        <table>
          <thead>
            <tr>
              <th scope="col">기상 정보</th>
              <th scope="col">운항 정보</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <i></i>
                <em>온도</em>
                <b>25.7∘C</b>
              </td>
              <td>
                <i></i>
                <em>항속</em>
                <b>10.7 <span>knots</span></b>
              </td>
            </tr>
             <tr>
              <td>
                <i></i>
                <em>습도</em>
                <b>50%</b>
              </td>
              <td>
                <i></i>
                <em>위도</em>
                <b>33°06'N</b>
              </td>
            </tr>
             <tr>
              <td>
                <i></i>
                <em>풍속</em>
                <b>4.26 m/s</b>
              </td>
              <td>
                <i></i>
                <em>경도</em>
                <b>129°06'425E</b>
              </td>
            </tr>
             <tr>
              <td>
                <i></i>
                <em>풍량</em>
                <b>170.17</b>
              </td>
              <td>
                <i></i>
                <em>방위</em>
                <b>170.71</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.network-wrap {
  display: flex;
  height: 100%;
  gap:1rem;
  width: 100%;
}
.network-map {
  width: 72rem;
  position: relative;
  height: 68rem;
  background-color: #f4f4f4;
  border: 1px solid #C5C5C5;
  border-radius: .5rem;
}
.network-info {
  flex:1;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import axios from "axios";
import config from "@/config/config";

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
