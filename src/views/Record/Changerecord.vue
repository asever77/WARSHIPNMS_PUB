<template>
    <div style="margin-left: 151px;width: 1182px;">
        <div style="border: 1px solid #000000;">
            {{ lang.title }}
            <span style="margin-left: 300px;cursor: pointer;" @click="onClickView('/record/callrecord')">{{ lang.callrecord }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/record/alarmrecord')">{{ lang.alarmrecord }}</span>
            <span style="margin-left: 10px;cursor: pointer;" @click="onClickView('/record/changerecord')">{{ lang.changerecord }}</span>
        </div>
        <div>
            변경이력 내용
        </div>
    </div>
</template>

<script>
import router from "@/router";

const ko = {
    "title": "이력",
    "callrecord": "Call이력",
    "alarmrecord": "Alarm이력",
    "changerecord": "변경이력"
}

const en = {
    "title": "이력",
    "callrecord": "Call이력",
    "alarmrecord": "Alarm이력",
    "changerecord": "변경이력"
}

export default {
    name: "RecordChangerecordView",
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