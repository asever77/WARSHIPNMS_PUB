<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "회의통화관리 내용"
}

const en = {
    "title": "회의통화관리 내용"
}

export default {
    name: "SettingsCallmanageMeetingcallmanageView",
    data() {
        return {
            lang: {}
        };
    },
    mounted() {
        if(G.lang === 'ko') {
            this.lang = ko;
        }else {
            this.lang = en;
        }
    }
};
</script>