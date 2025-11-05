<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/usermanage/accountmanage')">{{ lang.accountmanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/usermanage/permissionmanage')">{{ lang.permissionmanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/usermanage/changepassword')">{{ lang.changepassword }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/usermanage/shortcutconfig')">{{ lang.shortcutconfig }}</span>
        </div>
        <div>
            계정관리 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "사용자관리",
    "accountmanage": "계정관리",
    "permissionmanage": "권한관리",
    "changepassword": "비밀번호변경",
    "shortcutconfig": "바로가기설정"
}

const en = {
    "title": "사용자관리",
    "accountmanage": "계정관리",
    "permissionmanage": "권한관리",
    "changepassword": "비밀번호변경",
    "shortcutconfig": "바로가기설정"
}

export default {
    name: "UsermanageAccountmanageView",
    data() {
        return {
            lang: {}
        };
    },
    mounted() {
        if(localStorage.getItem('lang') === 'ko') {
            this.lang = ko;
        }else {
            this.lang = en;
        }
    },
    methods: {
        onClickView(item) {
            router.push("/default").catch(() => {});
            router.push(item);
        }
    },
};
</script>