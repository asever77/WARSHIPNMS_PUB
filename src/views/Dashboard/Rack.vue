<template>
  <div class="rack-wrap" ref="rootEl">
    <div class="rack-item">
      <h2 class="table-title-box">무선통신기시스템</h2>
      <div class="network-rack" data-u="38">
        <div class="network-rack-u">
          <div class="network-rack-u-item" v-for="n in 38" :key="n">{{ n }}</div>
        </div>
        <div class="network-rack-wrap" v-for="n in 3" :key="n">
          <div class="network-rack-item" data-u="1" data-sp="1">
            <img src="@/assets/images/network/1u-apple_xserve.png" alt="1u apple xserve" />
          </div>
          <div class="network-rack-item" data-u="3.5" data-sp="9">
            <img src="@/assets/images/network/3u-raid_array.png" alt="3u raid array" />
          </div>

          <div class="network-rack-item" data-u="8" data-sp="23">
            <img src="@/assets/images/network/8u-rackmount_lcd.png" alt="8u rackmount lcd" />
          </div>
        </div>
      </div>
    </div>

    <div class="rack-item">
      <h2 class="table-title-box">무선통신운용콘솔</h2>
      <div class="network-rack" data-u="38">
        <div class="network-rack-u">
          <div class="network-rack-u-item" v-for="n in 38" :key="n">{{ n }}</div>
        </div>
        <div class="network-rack-wrap" v-for="n in 4" :key="n">
          <div class="network-rack-item" data-u="1" data-sp="1">
            <img src="@/assets/images/network/1u-apple_xserve.png" alt="1u apple xserve" />
          </div>
          <div class="network-rack-item" data-u="3.5" data-sp="9">
            <img src="@/assets/images/network/3u-raid_array.png" alt="3u raid array" />
          </div>

          <div class="network-rack-item" data-u="8" data-sp="23">
            <img src="@/assets/images/network/8u-rackmount_lcd.png" alt="8u rackmount lcd" />
          </div>
        </div>

      </div>
    </div>

    <div class="rack-item">
      <h2 class="table-title-box">비상통신시스템</h2>
      <div class="network-rack" data-u="38">
        <div class="network-rack-u">
          <div class="network-rack-u-item" v-for="n in 38" :key="n">{{ n }}</div>
        </div>
        <div class="network-rack-wrap" v-for="n in 2" :key="n">
          <div class="network-rack-item" data-u="1" data-sp="1">
            <img src="@/assets/images/network/1u-apple_xserve.png" alt="1u apple xserve" />
          </div>
          <div class="network-rack-item" data-u="3.5" data-sp="9">
            <img src="@/assets/images/network/3u-raid_array.png" alt="3u raid array" />
          </div>

          <div class="network-rack-item" data-u="8" data-sp="23">
            <img src="@/assets/images/network/8u-rackmount_lcd.png" alt="8u rackmount lcd" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";

const ko = {
  "title": "랙 내용"
};

const en = {
  "title": "랙 내용"
};

const lang = ref({});
const rootEl = ref(null);
const careText = (G.lang === 'ko') ? '점검 필요' : 'Care required';

onMounted(() => {
  lang.value = (G.lang === "ko") ? ko : en;
  const container = rootEl.value;
  if (!container) return;

  const imgs = container.querySelectorAll('img');
  imgs.forEach((img) => {
    if (!img.getAttribute('title')) {
      const alt = img.getAttribute('alt');
      let title = (alt && alt.trim() !== '') ? alt.trim() : '';
      if (!title) {
        try {
          const srcAttr = img.getAttribute('src') || '';
          const url = new URL(srcAttr, window.location.origin);
          const path = url.pathname || srcAttr;
          title = (path.split('/')?.pop()) || '';
        } catch (e) {
          const srcAttr = img.getAttribute('src') || '';
          title = (srcAttr.split('/')?.pop()) || '';
        }
      }
      if (title) img.setAttribute('title', title);
    }

    try {
      // Initialize Bootstrap Tooltip if available
      if (window.bootstrap && window.bootstrap.Tooltip) {
        // Assign role for accessibility when tooltip is present
        if (!img.getAttribute('role')) img.setAttribute('role', 'img');
        new window.bootstrap.Tooltip(img);
      }
    } catch (_) {
      // No-op if bootstrap isn't present
    }
  });

  // no-op: care-state tooltips handled via v-bs-tooltip directive
});
</script>
