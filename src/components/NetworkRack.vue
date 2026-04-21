<template>
  <div class="network-rack" :data-u="dataU">
    <div class="network-rack-u">
      <div class="network-rack-u-item" v-for="n in dataU" :key="n">{{ n }}</div>
    </div>
    <div class="network-rack-wrap" v-for="(wrap, i) in wraps" :key="i">
      <div
        class="network-rack-item"
        v-for="(item, j) in wrap"
        :key="j"
        :data-u="item.dataU"
        :data-sp="item.dataSp"
      >
        <a
          v-if="item.link"
          href="#"
          @click.prevent="openPopup(item.link)"
        >
          <img :src="resolveImg(item.imgSrc)" :alt="item.alt" />
        </a>
        <img
          v-else
          :src="resolveImg(item.imgSrc)"
          :alt="item.alt"
        />

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dataU: {
    type: Number,
    default: 38
  },
  wraps: {
    type: Array,
    required: true
  }
});
function openPopup(link) {
  let height = 600;
  if (link.includes('rack2u')) height = 630;
  else if (link.includes('rack4u')) height = 780;
  else if (link.includes('rack1u')) height = 540;
  window.open(link, 'popup', `width=600,height=${height},scrollbars=yes`);
}
function resolveImg(src) {
  // '@/assets/...' → '/src/assets/...' 또는 '/assets/...'로 변환
  if (src.startsWith('@/assets/')) {
    return src.replace('@/assets', '/src/assets');
  }
  if (src.startsWith('/assets/')) {
    return src;
  }
  // fallback
  return src;
}
</script>

<style scoped>
</style>
