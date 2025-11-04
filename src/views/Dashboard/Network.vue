<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/dashboard/network')">{{ lang.network }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/dashboard/userterminal')">{{ lang.userterminal }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/dashboard/receptacleunit')">{{ lang.receptacleunit }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/dashboard/rack')">{{ lang.rack }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/dashboard/activealarm')">{{ lang.activealarm }}</span>
        </div>
        <div>
            네트워크 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "대시보드",
    "network": "네트워크",
    "userterminal": "사용자단말",
    "receptacleunit": "리셉터클유닛",
    "rack": "랙",
    "activealarm": "활성경보"
}

const en = {
    "title": "대시보드",
    "network": "네트워크",
    "userterminal": "사용자단말",
    "receptacleunit": "리셉터클유닛",
    "rack": "랙",
    "activealarm": "활성경보"
}

export default {
    name: "DashboardNetworkView",
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