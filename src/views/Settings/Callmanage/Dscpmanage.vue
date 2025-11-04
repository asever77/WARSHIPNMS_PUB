<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/settings/callmanage/membermanage')">{{ lang.membermanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/callmanage/meetingcallmanage')">{{ lang.meetingcallmanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/callmanage/groupcallmanage')">{{ lang.groupcallmanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/callmanage/dscpmanage')">{{ lang.dscpmanage }}</span>
        </div>
        <div>
            DSCP관리 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "설정/통화관리",
    "membermanage": "가입자관리",
    "meetingcallmanage": "회의통화관리",
    "groupcallmanage": "그룹통화관리",
    "dscpmanage": "DSCP관리"
}

const en = {
    "title": "설정/통화관리",
    "membermanage": "가입자관리",
    "meetingcallmanage": "회의통화관리",
    "groupcallmanage": "그룹통화관리",
    "dscpmanage": "DSCP관리"
}

export default {
    name: "SettingsCallmanageDscpmanageView",
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