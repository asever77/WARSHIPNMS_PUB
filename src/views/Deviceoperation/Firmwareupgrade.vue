<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "펌웨어업그레이드 내용"
}

const en = {
    "title": "펌웨어업그레이드 내용"
}

export default {
    name: "DeviceoperationFirmwareupgradeView",
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