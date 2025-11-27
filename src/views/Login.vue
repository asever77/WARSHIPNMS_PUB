<template>
  <div class="login-area">
    <div class="login-content">
      <img src="/images/common/login-logo.svg" alt="대한민국해군 REPUBLIC OF KOREA NAVY" class="login-img" />
      <div class="login-content-form">
        <input class="login-form" type="text" id="login-id" :placeholder="lang.id" v-model.trim="username" />
        <input
          class="login-form"
          type="password"
          id="login-pw"
          :placeholder="lang.password"
          v-model.trim="password"
          @keyup.enter="login"
        />
        <div class="login-id-save">
          <BFormCheckbox
            id="checkbox-1"
            v-model="statusCheck1"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
          >
            {{ lang.idremember }}
          </BFormCheckbox>
        </div>
        <button type="button" class="btn-login" @click="login">
          {{ lang.login }}
        </button>
      </div>
      <img src="/images/login/login-text.png" alt="국민이 신뢰하고 적이 두려워하는 강한해군, 해양강국!!" class="login-text" />
    </div>
    <p class="login-copy">Copyright(c)NAVY.MIL.KR. All Rights Reserved.</p>
    <!--
    <button type="button" @click="basicfunctions">기본기능</button>
    -->
  </div>
</template>

<style lang="scss" scoped>
.login-area {
  width:100%;
  height:100vh;
  background:url("/images/login/login-bg.png") no-repeat 50% 50% /cover;
  display:flex;
  align-items:center;
  justify-content:center;
  min-width:135rem;
}
.login-content {
  display:flex;
  align-items:center;
  img {
    display:block;
  }
  &-form {
    display:flex;
    width:25rem;
    margin:0 13.8rem 0 7.2rem;
    flex-direction:column;
  }
  .login-form {
    width:100%;
    height:4rem;
    border-radius:99em;
    box-shadow:0 0 1rem 0 #00000040;
    border:1px solid #6EA0D7;
    padding:0 1rem;
    color:#002745;
    font-size:1.4rem;
    &::placeholder {
      color:#002745;
    }
    ~ .login-form {
      margin-top:1rem;
    }
  }
}
.login-text {
  height:18rem
}
.login-id-save {
  border-top:1px solid #65BBF3;
  margin-top:1.5rem;
  padding-top:1.2rem;
  margin-bottom:2.4rem;
  label {
    font-size:1.4rem;
    color:#000;
  }
}
.btn-login {
  height:4rem;
  border-radius:99em;
  background-color:#001B30;
  font-size:1.4rem;
  font-weight:700;
  color:#D6EEFF;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 0 1rem 0 #00000040;
}
.login-copy {position:fixed;bottom:2rem;text-align:center;left:0;right:0;font-size:1rem;color:#AFAFAF}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from 'axios';
import G from '@/config/global.js';
import config from '@/config/config';
import { BFormCheckbox } from 'bootstrap-vue-next'

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
const statusCheck1 = ref(false)

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

  router.push('/dashboard/network');

  /*
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
    */
};

// 기본 기능 페이지 이동
const basicfunctions = () => {
  router.push('/basicfunctions');
};
</script>
<script setup lang="ts">
</script>
