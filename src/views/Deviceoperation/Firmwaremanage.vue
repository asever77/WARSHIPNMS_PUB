<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/deviceoperation/firmwaremanage')">{{ lang.firmwaremanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/deviceoperation/firmwareupgrade')">{{ lang.firmwareupgrade }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/deviceoperation/devicecontrol')">{{ lang.devicecontrol }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/deviceoperation/resultinquiry')">{{ lang.resultinquiry }}</span>
        </div>
        <div>
            펌웨어관리 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "장치운영",
    "firmwaremanage": "펌웨어관리",
    "firmwareupgrade": "펌웨어업그레이드",
    "devicecontrol": "장치제어",
    "resultinquiry": "결과조회"
}

const en = {
    "title": "장치운영",
    "firmwaremanage": "펌웨어관리",
    "firmwareupgrade": "펌웨어업그레이드",
    "devicecontrol": "장치제어",
    "resultinquiry": "결과조회"
}

export default {
    name: "DeviceoperationFirmwaremanageView",
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