<template>
    <div>
        <div style="margin-left: 150px;width: 1200px;">
            <div style="border: 1px solid #000000;">
                {{ lang.title }}
                <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/callconnectconfig/pointtopoint')">{{ lang.pointtopoint }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/callconnectconfig/meetingcall')">{{ lang.meetingcall }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/callconnectconfig/groupcall')">{{ lang.groupcall }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/callconnectconfig/wirelessequip')">{{ lang.wirelessequip }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/callconnectconfig/broadcastequip')">{{ lang.broadcastequip }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/callconnectconfig/alarm')">{{ lang.alarm }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/callconnectconfig/wireless')">{{ lang.wireless }}</span>
            </div>
            <div>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import G from '@/config/global.js'
import router from "@/router";

const ko = {
    "title": "통화연결설정",
    "pointtopoint": "점대점",
    "meetingcall": "회의통화",
    "groupcall": "그룹통화",
    "wirelessequip": "무선장비",
    "broadcastequip": "방송장비",
    "alarm": "경보",
    "wireless": "무선"
}

const en = {
    "title": "통화연결설정",
    "pointtopoint": "점대점",
    "meetingcall": "회의통화",
    "groupcall": "그룹통화",
    "wirelessequip": "무선장비",
    "broadcastequip": "방송장비",
    "alarm": "경보",
    "wireless": "무선"
}

export default {
    name: "CallconnectconfigDefaultLayout",
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
    },
    methods: {
        onClickView(item) {
            router.push("/default").catch(() => {});
            router.push(item);
        }
    },
};
</script>