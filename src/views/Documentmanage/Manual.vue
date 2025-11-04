<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/documentmanage/manual')">{{ lang.manual }}</span>
        </div>
        <div>
            매뉴얼 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "문서관리",
    "manual": "매뉴얼"
}

const en = {
    "title": "문서관리",
    "manual": "매뉴얼"
}

export default {
    name: "DocumentmanageManualView",
    data() {
        return {
            lang: {}
        };
    },
    mounted() {
        if(localStorage.getItem('lang') === 'ko') {
            this.lang = ko;
        }else {
            this.lang = en;
        }
    },
    methods: {
        onClickView(item) {
            router.push("/default").catch(() => {});
            router.push(item);
        }
    },
};
</script>