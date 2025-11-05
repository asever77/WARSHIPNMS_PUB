<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "경보장치관리 내용"
}

const en = {
    "title": "경보장치관리 내용"
}

export default {
    name: "SettingsExternallinkagemanageAlarmdevicemanageView",
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