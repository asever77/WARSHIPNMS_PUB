<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/settings/connectconfigmanage/specialprocessunit')">{{ lang.specialprocessunit }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/connectconfigmanage/interlockdevice')">{{ lang.interlockdevice }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/connectconfigmanage/wirelesslink')">{{ lang.wirelesslink }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/connectconfigmanage/repeater')">{{ lang.repeater }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/connectconfigmanage/etc')">{{ lang.etc }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/connectconfigmanage/wirelesschannelbond')">{{ lang.wirelesschannelbond }}</span>
        </div>
        <div>
            전문처리장치 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "설정/연결설정관리",
    "specialprocessunit": "전문처리장치",
    "interlockdevice": "보안장비연동장치",
    "wirelesslink": "무선링크",
    "repeater": "유무선통합중계기",
    "etc": "기타",
    "wirelesschannelbond": "무선채널조합"
}

const en = {
    "title": "설정/연결설정관리",
    "specialprocessunit": "전문처리장치",
    "interlockdevice": "보안장비연동장치",
    "wirelesslink": "무선링크",
    "repeater": "유무선통합중계기",
    "etc": "기타",
    "wirelesschannelbond": "무선채널조합"
}

export default {
    name: "SettingsConnectconfigmanageSpecialprocessunitView",
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