<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "연결단자함관리 내용"
}

const en = {
    "title": "연결단자함관리 내용"
}

export default {
    name: "SettingsEquipmanageTerminalboxmanageView",
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