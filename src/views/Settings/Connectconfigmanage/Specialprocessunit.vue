<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "전문처리장치 내용"
}

const en = {
    "title": "전문처리장치 내용"
}

export default {
    name: "SettingsConnectconfigmanageSpecialprocessunitView",
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