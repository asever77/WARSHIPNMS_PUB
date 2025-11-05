<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "보안장비연동장치 내용"
}

const en = {
    "title": "보안장비연동장치 내용"
}

export default {
    name: "SettingsConnectconfigmanageInterlockingdeviceView",
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