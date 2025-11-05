<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "운영정보백업 내용"
}

const en = {
    "title": "운영정보백업 내용"
}

export default {
    name: "SettingsOperationconfigmanageOperationconfigbackupView",
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