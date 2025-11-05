<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/settings/externallinkagemanage/broadcastequipmanage')">{{ lang.broadcastequipmanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/externallinkagemanage/alarmdevicemanage')">{{ lang.alarmdevicemanage }}</span>
        </div>
        <div>
            경보장치관리 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "설정/외부연계관리",
    "broadcastequipmanage": "방송장비관리",
    "alarmdevicemanage": "경보장치관리"
}

const en = {
    "title": "설정/외부연계관리",
    "broadcastequipmanage": "방송장비관리",
    "alarmdevicemanage": "경보장치관리"
}

export default {
    name: "SettingsExternallinkagemanageAlarmdevicemanageView",
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