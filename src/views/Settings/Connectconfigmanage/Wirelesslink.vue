<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "무선링크 내용"
}

const en = {
    "title": "무선링크 내용"
}

export default {
    name: "SettingsConnectconfigmanageWirelesslinkView",
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