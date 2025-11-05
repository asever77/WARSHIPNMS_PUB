<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/settings/equipmanage/devicemanage')">{{ lang.devicemanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/equipmanage/terminalboxmanage')">{{ lang.terminalboxmanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/equipmanage/rackmanage')">{{ lang.rackmanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/equipmanage/modelmanage')">{{ lang.modelmanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/equipmanage/frequencymanage')">{{ lang.frequencymanage }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/equipmanage/wirelesscommunicatebond')">{{ lang.wirelesscommunicatebond }}</span>
        </div>
        <div>
            모델관리 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "설정/장치관리",
    "devicemanage": "장치관리",
    "terminalboxmanage": "연결단자함관리",
    "rackmanage": "랙관리",
    "modelmanage": "모델관리",
    "frequencymanage": "주파수관리",
    "wirelesscommunicatebond": "무선통신기조합"
}

const en = {
    "title": "설정/장치관리",
    "devicemanage": "장치관리",
    "terminalboxmanage": "연결단자함관리",
    "rackmanage": "랙관리",
    "modelmanage": "모델관리",
    "frequencymanage": "주파수관리",
    "wirelesscommunicatebond": "무선통신기조합"
}

export default {
    name: "SettingsEquipmanageModelmanageView",
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