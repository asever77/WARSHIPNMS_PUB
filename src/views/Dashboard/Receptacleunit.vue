<template>
    <div>
        {{ lang.title }}
    </div>
</template>

<script>
import G from '@/config/global.js'

const ko = {
    "title": "리셉터클유닛 내용"
}

const en = {
    "title": "리셉터클유닛 내용"
}

export default {
    name: "DashboardReceptacleunitView",
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