<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "백업복원 내용"
}

const en = {
    "title": "백업복원 내용"
}

export default {
    name: "SettingsOperationconfigmanageOperationconfigrestoreView",
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