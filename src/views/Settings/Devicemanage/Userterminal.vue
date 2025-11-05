<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/settings/devicemanage/userterminal')">{{ lang.userterminal }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/devicemanage/receptacleunit')">{{ lang.receptacleunit }}</span>
        </div>
        <div>
            사용자단말 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "설정/단말관리",
    "userterminal": "사용자단말",
    "receptacleunit": "리셉터클유닛"
}

const en = {
    "title": "설정/단말관리",
    "userterminal": "사용자단말",
    "receptacleunit": "리셉터클유닛"
}

export default {
    name: "SettingsDevicemanageUserterminalView",
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