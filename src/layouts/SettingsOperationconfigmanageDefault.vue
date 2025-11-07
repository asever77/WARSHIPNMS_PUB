<template>
    <div>
        <div style="margin-left: 150px;width: 1200px;">
            <div style="border: 1px solid #000000;">
                {{ lang.title }}
                <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/settings/operationconfigmanage/operationconfigbackup')">{{ lang.operationconfigbackup }}</span>
                <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/settings/operationconfigmanage/operationconfigrestore')">{{ lang.operationconfigrestore }}</span>
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
    "title": "설정/운영정보관리",
    "operationconfigbackup": "운영정보백업",
    "operationconfigrestore": "백업복원"
}

const en = {
    "title": "설정/운영정보관리",
    "operationconfigbackup": "운영정보백업",
    "operationconfigrestore": "백업복원"
}

export default {
    name: "SettingsOperationconfigmanageDefaultLayout",
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