<template>
  <div
    class="network-line"
    :data-line="line"
    :data-ps="ps"
    :data-state="state"
    :style="styleObject"
  >
    <div class="network-line--line">
      <BButton
        v-if="line === 'sfp'"
        v-bs-tooltip="tooltipMsg"
        class="network-line--tooltip"
        :data-bs-custom-class="tooltipClass"
        :data-bs-placement="tooltipPlacement"
      ></BButton>
    </div>
    <slot />
  </div>
</template>

<script setup>
import {
  BButton,
} from 'bootstrap-vue-next/components'
import { computed } from 'vue';

const {
  line,
  ps,
  width,
  height,
  top,
  left,
  bottom,
  right,
  state
} = defineProps({
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
  },
  state: {
    type: String,
    default: 'normal',
    validator: v => ['normal', 'warning', 'abnormal', null].includes(v)
  }
});

const styleObject = computed(() => {
  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;
  // top/bottom 중 하나만 적용 (top 우선)
  if (top) {
    style.top = top;
  } else if (bottom) {
    style.bottom = bottom;
  }
  // left/right 중 하나만 적용 (left 우선)
  if (left) {
    style.left = left;
  } else if (right) {
    style.right = right;
  }
  return style;
});

const tooltipMsg = computed(() => {
  if (state === 'normal') return '양방향정상';
  if (state === 'warning') return '1개만 정상';
  if (state === 'abnormal') return '양방향 비정상';
  return '';
});

// Tooltip class changes by state
const tooltipClass = computed(() => {
  if (state === 'normal') return 'custom-tooltip tooltip-normal';
  if (state === 'warning') return 'custom-tooltip tooltip-warning';
  if (state === 'abnormal') return 'custom-tooltip tooltip-abnormal';
  return 'custom-tooltip';
});

// Tooltip placement changes by ps
const tooltipPlacement = computed(() => {
  switch (ps) {
    case 'tl-bl':
       return 'left';
    case 'tr-br':
    case 'tb':
      return 'right';
    case 'lr':
      return 'top';
    default:
      return 'top';
  }
});
</script>

<style lang="scss">

.network-line {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.network-line .network-line--line {
  width: 100%;
  height: .4rem;
}
.network-line--tooltip{
  position: absolute;
  cursor: pointer;
  background: transparent !important;
  border: 0 !important;
  padding: 0 !important;
  margin: 0 !important
}
[data-ps="tr-br"] .network-line--tooltip{
  width: 1.2rem;
  height: 100%;
  top:0;
  left:-.4rem;
}
[data-ps="tl-bl"] .network-line--tooltip{
  width: 1.2rem;
  height: 100%;
  top:0;
  right:-.4rem;
}
[data-ps="tb"] .network-line--tooltip{
  width: 1.2rem;
  height: 100%;
  top:0;
  left:-.4rem;
}
[data-ps="tb"] .tooltip-arrow {
  transform: translateX(4rem);
}
[data-ps="lr"] .network-line--tooltip{
  width: 100%;
  height: 1.2rem;
  top:-.4rem;
  left:0;
}
[data-ps="tr-bl"] .network-line--tooltip,
[data-ps="tl-br"] .network-line--tooltip{
  width: 100%;
  height: 1.2rem;
  top:calc(50% - .6rem);
  left:0;
}

.network-line[data-ps="tl-bl"] .network-line--line{width: .4rem;height: 100%;}
.network-line[data-ps="tl-bl"]{flex-direction: column;align-items: flex-end;}
.network-line[data-ps="tl-bl"]::before{top:0;left:0;z-index: 1;transform: translate(-.4rem,-.2rem);}
.network-line[data-ps="tl-bl"]::after{bottom:0;left:0;z-index: 1;transform: translate(-.4rem,.2rem);}
.network-line[data-ps="tl-bl"] .network-line--line::after {bottom:0;right:0}
.network-line[data-ps="tl-bl"] .network-line--line::before {right:0}
.network-line[data-ps="tr-br"] .network-line--line{width: .4rem;height: 100%;}
.network-line[data-ps="tr-br"]{flex-direction: column;align-items: flex-start;}
.network-line[data-ps="tr-br"]::before{top:0;right:0;z-index: 1;transform: translate(.4rem,-.2rem);}
.network-line[data-ps="tr-br"]::after{bottom:0;right:0;z-index: 1;transform: translate(.4rem,.2rem);}
.network-line[data-ps="tr-br"] .network-line--line::after {bottom:0;}

.network-line[data-ps="tl-bl"] .network-line--line::after,
.network-line[data-ps="tl-bl"] .network-line--line::before,
.network-line[data-ps="tr-br"] .network-line--line::after,
.network-line[data-ps="tr-br"] .network-line--line::before {content:"";display: block;border-top:.4rem solid #ccc;width: 100%; height:0; position: absolute;}


.network-line[data-ps="tb"] .network-line--line{width: .4rem;height: 100%;}
.network-line[data-ps="tb"]{flex-direction: column;}
.network-line[data-ps="tb"]::before{position: absolute;top:0;z-index:1;transform: translateY(-.4rem);}
.network-line[data-ps="tb"]::after{position: absolute;bottom:0;z-index:1;transform: translateY(.4rem);}
.network-line[data-ps="lr"]::before{position: absolute; z-index: 1; left:-.4rem;}
.network-line[data-ps="lr"]::after{position: absolute; z-index: 1; right:-.4rem;}

.network-line[data-ps="tl-br"]::before{top:0;left:0;z-index: 1;transform: translate(-.2rem,-.4rem);}
.network-line[data-ps="tl-br"]::after{bottom:0;right:0;z-index: 1;transform: translate(.2rem,.4rem);}
.network-line[data-ps="tl-br"] .network-line--line::after,
.network-line[data-ps="tl-br"] .network-line--line::before {content:"";display: block;border-left:.4rem solid #ccc;height: 50%;width: 1px;position: absolute;}
.network-line[data-ps="tl-br"] .network-line--line::after {bottom:0;right: 0;}
.network-line[data-ps="tl-br"] .network-line--line::before {top:0;left: 0;}

.network-line[data-ps="tr-bl"]::before{top:0;right:0;z-index: 1;transform: translate(.2rem,-.4rem);}
.network-line[data-ps="tr-bl"]::after{bottom:0;left:0;z-index: 1;transform: translate(-.2rem,.4rem);}
.network-line[data-ps="tr-bl"] .network-line--line::after,
.network-line[data-ps="tr-bl"] .network-line--line::before {content:"";display: block;border-left:.4rem solid #ccc;height: 50%;width: 1px;position: absolute;}
.network-line[data-ps="tr-bl"] .network-line--line::after {bottom:0;left: 0;}
.network-line[data-ps="tr-bl"] .network-line--line::before {top:0;right: 0;}

.network-line[data-ps="tl-br"][data-line="poe"] .network-line--line::after,
.network-line[data-ps="tl-br"][data-line="poe"] .network-line--line::before{border-color:#65BBF3;}
.network-line[data-line="poe"] .network-line--line::after,
.network-line[data-line="poe"] .network-line--line::before{border-color:#65BBF3;}
.network-line[data-line="poe"] .network-line--line{background-color: #65BBF3;}

.network-line[data-ps="tl-br"][data-line="sfp"] .network-line--line::after,
.network-line[data-ps="tl-br"][data-line="sfp"] .network-line--line::before{border-color:#4BC43D;}
.network-line[data-line="sfp"] .network-line--line::after,
.network-line[data-line="sfp"] .network-line--line::before{border-color:#4BC43D;}
.network-line[data-line="sfp"] .network-line--line{background-color: #4BC43D;}

.network-line[data-ps="tl-br"][data-line="sfp"][data-state="warning"] .network-line--line::after,
.network-line[data-ps="tl-br"][data-line="sfp"][data-state="warning"] .network-line--line::before{border-color:#efb43c;}
.network-line[data-line="sfp"][data-state="warning"] .network-line--line::after,
.network-line[data-line="sfp"][data-state="warning"] .network-line--line::before{border-color:#efb43c;}
.network-line[data-line="sfp"][data-state="warning"] .network-line--line{background-color: #efb43c;}
.network-line[data-line="sfp"][data-state="warning"]::before,
.network-line[data-line="sfp"][data-state="warning"]::after{
  background-color: #efb43c;
  border: 1px solid #e29700;
}
.network-line[data-ps="tl-br"][data-line="sfp"][data-state="abnormal"] .network-line--line::after,
.network-line[data-ps="tl-br"][data-line="sfp"][data-state="abnormal"] .network-line--line::before{border-color:#f22d2d;}
.network-line[data-line="sfp"][data-state="abnormal"] .network-line--line::after,
.network-line[data-line="sfp"][data-state="abnormal"] .network-line--line::before{border-color:#f22d2d;}
.network-line[data-line="sfp"][data-state="abnormal"] .network-line--line{background-color: #f22d2d;}
.network-line[data-line="sfp"][data-state="abnormal"]::before,
.network-line[data-line="sfp"][data-state="abnormal"]::after{
  background-color: #f22d2d;
  border: 1px solid #d30202;
}

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

/* Tooltip state classes */
.custom-tooltip {
  padding: 0.2rem 0.4rem;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  white-space: nowrap;
  z-index: 10;
}

/* Tooltip state color classes */
.custom-tooltip.tooltip-normal{
  background-color: #4BC43D !important;
  font-size: 1.1rem;
}
.custom-tooltip.tooltip-warning{
  background-color: #efb43c !important;
  font-size: 1.1rem;
}
.custom-tooltip.tooltip-abnormal{
  background-color: #f22d2d !important;
  font-size: 1.1rem;
}
.tooltip-normal {
  --bs-tooltip-bg: #4BC43D;
  --bs-tooltip-color: #fff;
}
.tooltip-warning {
  --bs-tooltip-bg: #efb43c;
  --bs-tooltip-color: #222;
}
.tooltip-abnormal {
  --bs-tooltip-bg: #f22d2d;
  --bs-tooltip-color: #fff;
}

/* Fix Bootstrap tooltip arrow gap */

</style>
