<template>
  <div
    :class="['network-item', (terminal && terminal[1] > 0) ? 'error' : '']"
    :data-type="type"
    :style="boxStyle"
    :data-name="text"
  >
    <button type="button" class="network-item--btn" @click="onClick"></button>
    <img v-if="img" :src="img" alt="" />
    <slot></slot>
    <div v-if="text" class="network-item--tit">{{ text }}</div>
    <div v-if="terminal" class="network-item--terminal">
      <b>{{ terminal[0] }}</b>/
      <b>{{ terminal[1] }}</b>
      <b>({{ terminal[2] }})</b>
    </div>
  </div>
</template>

<script setup>

import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  top: {
    type: String,
    default: ''
  },
  bottom: {
    type: String,
    default: ''
  },
  left: {
    type: String,
    default: ''
  },
  right: {
    type: String,
    default: ''
  },
  img: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  terminal: {
    type: Array,
    default: null
  },
  callback: {
    type: Function,
    default: null
  }
});

const onClick = (e) => {
  if (props.callback) {
    props.callback(e);
  }
};

const boxStyle = computed(() => {
  const style = { position: 'absolute' };
  // top/bottom 중 하나만 적용 (top 우선)
  if (props.top) {
    style.top = props.top;
  } else if (props.bottom) {
    style.bottom = props.bottom;
  }
  // left/right 중 하나만 적용 (left 우선)
  if (props.left) {
    style.left = props.left;
  } else if (props.right) {
    style.right = props.right;
  }
  return style;
});
</script>

<style scoped>
.network-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: .5rem;
  font-size: 1rem;
  position: absolute;
}
.network-item--btn {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: transparent;
  border: none;
  cursor: pointer;
}
.network-item--btn:focus,
.network-item--btn:hover {
  box-shadow: 0 0 .8rem rgba(0,0,0,.25);
}
.network-item[data-type="sub"] {
  border:1px solid #CDCBCB;
  color:#3E3E3E;
  background-color: #fff;
  padding:0.4rem .8rem;
  min-width: 12rem;
  min-height: 5.2rem;
}
.network-item[data-type="major"] {
  border:1px solid #CDCBCB;
  color:#3E3E3E;
  background-color: #fff;
  padding:1.8rem .8rem;
}
.network-item[data-type="gray"] {
  color:#fff;
  background-color: #545454;
  padding:.6rem .8rem;
  min-width:9rem;
}
.network-item[data-type="blue"] {
  color:#000;
  background-color: #BFDBED;
  border:1px solid #007BFF;
  padding:.6rem .8rem;
  min-width:9rem;
}
.network-item--terminal{
  display: flex;
  justify-content: center;
  gap:.1rem;
  font-weight: 700;
  font-size: 1.3rem;
}
.network-item--terminal b{color:#1F8A13}
.network-item--terminal b:nth-of-type(2){color:#E31F1F}
.network-item--terminal b:nth-of-type(3){color:#002745}

.network-item.error {
  border-color: #E31F1F;
  background-color: #ffe0e0;
}
</style>
