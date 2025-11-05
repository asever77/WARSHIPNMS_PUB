<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "무선채널조합 내용"
}

const en = {
    "title": "무선채널조합 내용"
}

export default {
    name: "SettingsConnectconfigmanageWirelesschannelbondView",
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