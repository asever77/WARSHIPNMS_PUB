<template>
    <div>
        {{ lang.title }}
        <br/>
        권한 테스트

        <br/>
        <button type="button" @click="adminTest">
            ADMIN
        </button>
        <br/>
        <button type="button" @click="managerTest">
            MANAGER
        </button>
        <br/>
        <button type="button" @click="userTest">
            USER
        </button>
    </div>
</template>

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
