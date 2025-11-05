<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "방송장비관리 내용"
}

const en = {
    "title": "방송장비관리 내용"
}

export default {
    name: "SettingsExternallinkagemanageBroadcastequipmanageView",
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