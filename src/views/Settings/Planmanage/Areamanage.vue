<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/settings/planmanage/drawingmanage')">{{ lang.drawingmanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/planmanage/areamanage')">{{ lang.areamanage }}</span>
        </div>
        <div>
            구역관리 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "설정/도면관리",
    "drawingmanage": "도면관리",
    "areamanage": "구역관리"
}

const en = {
    "title": "설정/도면관리",
    "drawingmanage": "도면관리",
    "areamanage": "구역관리"
}

export default {
    name: "SettingsPlanmanageAreamanageView",
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