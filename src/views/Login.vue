<template>
  <div>
    {{ lang.login }}
    <input type="text" id="login-id" :placeholder="lang.id" v-model.trim="username" />
    <input
      type="password"
      id="login-pw"
      :placeholder="lang.password"
      v-model.trim="password"
      @keyup.enter="login"
    />
    <input type="checkbox" id="check-1" v-model="checked" />{{ lang.idremember }}
    <button type="button" @click="login">
      {{ lang.login }}
    </button>
    <button type="button" @click="basicfunctions">기본기능</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from 'axios';
import G from '@/config/global.js';
import config from '@/config/config';

const ko = {
  login: '로그인',
  id: '아이디',
  password: '비밀번호',
  idremember: '아이디 저장',
  changeLang: '언어 변경',
};

const en = {
  login: 'Login',
  id: 'ID',
  password: 'Password',
  idremember: 'Remember ID',
  changeLang: 'Change Language',
};

// reactive 변수 선언
const username = ref('');
const password = ref('');
const checked = ref(false);
const lang = ref({});

// 언어 초기화
onMounted(() => {
  lang.value = (G.lang === 'ko') ? ko : en;
});

// 로그인 함수
const login = () => {
  localStorage.clear();

  if (!username.value) {
    alert('아이디를 입력해주세요.');
    return;
  }

  if (!password.value) {
    alert('비밀번호를 입력해주세요.');
    return;
  }

  const url = config.getHost() + '/login';
  const data = {
    loginId: username.value,
    userPassword: password.value,
  };

  axios.post(url, data)
    .then(response => {
      const user = response.data;
      if (user.userStatus === 0) {
        alert('사용 중지된 계정입니다.');
        return;
      }
      if (!user.loginId) {
        alert('로그인 실패');
        return;
      }
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard/network');
    })
    .catch(error => {
      httpUtils.errorHandler(error);
    });
};

// 기본 기능 페이지 이동
const basicfunctions = () => {
  router.push('/basicfunctions');
};
</script>