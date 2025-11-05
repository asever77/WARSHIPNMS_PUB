<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "유무선통합중계기 내용"
}

const en = {
    "title": "유무선통합중계기 내용"
}

export default {
    name: "SettingsConnectconfigmanageRepeaterView",
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