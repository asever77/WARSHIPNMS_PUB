<template>
    <div>
        {{ lang.login }}
        <input type="text" id="login-id" :placeholder="lang.id" v-model.trim="username" />
        <input type="password" id="login-pw" :placeholder="lang.password" v-model.trim="password" @keyup.enter="login" />
        <input type="checkbox" id="check-1" v-model="checked" />{{ lang.idremember }}
        <button type="button" @click="login">
            {{ lang.login }}
        </button>
        <button @click="switchLang">
            {{ lang.changeLang }}
        </button>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "login": "로그인",
    "id": "아이디",
    "password": "비밀번호",
    "idremember": "아이디 저장",
    "changeLang": "언어 변경"
}

const en = {
    "login": "Login",
    "id": "ID",
    "password": "Password",
    "idremember": "Remember ID",
    "changeLang": "Change Language"
}

export default {
    name: "LoginView",
    data() {
        return {
            username: "",
            password: "",
            checked: false,
            lang: {}
        };
    },
    computed: {
        t() {
            return this.$t
        }
    },
    mounted() {
        const savedLang = localStorage.getItem('lang') || 'ko'
        localStorage.setItem('lang', savedLang);

        if(localStorage.getItem('lang') === 'ko') {
            this.lang = ko;
        }else {
            this.lang = en;
        }
    },
    methods: {
        login: function() {
            router.push("/dashboard/network");
        },
        switchLang: function() {
            let langValue = localStorage.getItem('lang') === 'ko' ? 'en' : 'ko';
            localStorage.setItem('lang', langValue);
            
            window.location.reload();
        }
    },
};
</script>