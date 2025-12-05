<template>
  <div
    class="network-line"
    :data-line="line"
    :data-ps="ps"
    :style="styleObject"
  >
    <div></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  line: {
    type: String,
    required: true
  },
  ps: {
    type: String,
    required: true
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  },
  top: {
    type: String,
    default: ''
  },
  left: {
    type: String,
    default: ''
  },
  bottom: {
    type: String,
    default: ''
  },
  right: {
    type: String,
    default: ''
  }
});

const styleObject = computed(() => {
  const style = {};
  if (props.width) style.width = props.width;
  if (props.height) style.height = props.height;
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

<style lang="scss">

.network-line {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.network-line > div {
  width: 100%;
  height: .4rem;
}
.network-line[data-ps="tl-bl"] > div{width: .4rem;height: 100%;}
.network-line[data-ps="tl-bl"]{flex-direction: column;align-items: flex-end;}
.network-line[data-ps="tl-bl"]::before{top:0;left:0;z-index: 1;transform: translate(-.4rem,-.2rem);}
.network-line[data-ps="tl-bl"]::after{bottom:0;left:0;z-index: 1;transform: translate(-.4rem,.2rem);}
.network-line[data-ps="tl-bl"] > div::after {bottom:0;right:0}
.network-line[data-ps="tl-bl"] > div::before {right:0}

.network-line[data-ps="tr-br"] > div{width: .4rem;height: 100%;}
.network-line[data-ps="tr-br"]{flex-direction: column;align-items: flex-start;}
.network-line[data-ps="tr-br"]::before{top:0;right:0;z-index: 1;transform: translate(.4rem,-.2rem);}
.network-line[data-ps="tr-br"]::after{bottom:0;right:0;z-index: 1;transform: translate(.4rem,.2rem);}
.network-line[data-ps="tr-br"] > div::after {bottom:0;}

.network-line[data-ps="tl-bl"] > div::after,
.network-line[data-ps="tl-bl"] > div::before,
.network-line[data-ps="tr-br"] > div::after,
.network-line[data-ps="tr-br"] > div::before {content:"";display: block;border-top:.4rem solid #ccc;width: 100%; height:0; position: absolute;}


.network-line[data-ps="tb"] > div{width: .4rem;height: 100%;}
.network-line[data-ps="tb"]{flex-direction: column;}
.network-line[data-ps="tb"]::before,
.network-line[data-ps="tb"]::after{position: relative;}
.network-line[data-ps="lr"]::before,
.network-line[data-ps="lr"]::after{position: relative;}
.network-line[data-ps="tl-br"]::before{top:0;left:0;z-index: 1;transform: translate(-.2rem,-.4rem);}
.network-line[data-ps="tl-br"]::after{bottom:0;right:0;z-index: 1;transform: translate(.2rem,.4rem);}
.network-line[data-ps="tl-br"] > div::after,
.network-line[data-ps="tl-br"] > div::before {content:"";display: block;border-left:.4rem solid #ccc;height: 50%;width: 1px;position: absolute;}
.network-line[data-ps="tl-br"] > div::after {bottom:0;right: 0;}
.network-line[data-ps="tl-br"] > div::before {top:0;left: 0;}
.network-line[data-ps="tl-br"][data-line="poe"] > div::after,
.network-line[data-ps="tl-br"][data-line="poe"] > div::before{border-color:#65BBF3;}
.network-line[data-ps="tl-br"][data-line="sfp"] > div::after,
.network-line[data-ps="tl-br"][data-line="sfp"] > div::before{border-color:#4BC43D;}

.network-line[data-ps="tr-bl"]::before{top:0;right:0;z-index: 1;transform: translate(.2rem,-.4rem);}
.network-line[data-ps="tr-bl"]::after{bottom:0;left:0;z-index: 1;transform: translate(-.2rem,.4rem);}
.network-line[data-ps="tr-bl"] > div::after,
.network-line[data-ps="tr-bl"] > div::before {content:"";display: block;border-left:.4rem solid #ccc;height: 50%;width: 1px;position: absolute;}
.network-line[data-ps="tr-bl"] > div::after {bottom:0;left: 0;}
.network-line[data-ps="tr-bl"] > div::before {top:0;right: 0;}

.network-line[data-line="poe"] > div::after,
.network-line[data-line="poe"] > div::before{border-color:#65BBF3;}
.network-line[data-line="sfp"] > div::after,
.network-line[data-line="sfp"] > div::before{border-color:#4BC43D;}


.network-line[data-line="poe"] > div{background-color: #65BBF3;}
.network-line[data-line="sfp"] > div{background-color: #4BC43D;}

.network-line[data-line="poe"]::before,
.network-line[data-line="poe"]::after{
  background-color: #65BBF3;
  border: 1px solid #002745;
}
.network-line[data-line="sfp"]::before,
.network-line[data-line="sfp"]::after{
  background-color: #4BC43D;
  border: 1px solid #235B11;
}
.network-line::before,
.network-line::after{
  content: '';
  position: absolute;
  display: block;
  width: .8rem;
  height: .8rem;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
