<template>
  <div class="rack-wrap" ref="rootEl">
    <div class="rack-item">
      <h2 class="table-title-box">무선통신기시스템</h2>
      <NetworkRack
        :dataU="38"
        :wraps="[
          [
            { dataU: 1, dataSp: 1, imgSrc: '@/assets/images/network/1u-apple_xserve.png', alt: '1u apple xserve' },
            { dataU: 3.5, dataSp: 9, imgSrc: '@/assets/images/network/2u-ethernet_switchhub.png', alt: '3u raid array', link: '/dashboard/popup/rack2u' },
            { dataU: 4, dataSp: 13, imgSrc: '@/assets/images/network/4u-managed_ups.png', alt: '4u managed ups', link: '/dashboard/popup/rack4u' },
            { dataU: 1, dataSp: 23, imgSrc: '@/assets/images/network/1u-apple_xserve.png', alt: '1u apple xserve' , link: '/dashboard/popup/rack1u'},
          ],
          [
            { dataU: 3.5, dataSp: 9, imgSrc: '@/assets/images/network/3u-raid_array.png', alt: '3u raid array', link: '/dashboard/popup/rackUPS' },
          ],
          [
            { dataU: 3, dataSp: 13, imgSrc: '@/assets/images/network/3u-ups.png', alt: '4u managed ups' },
          ]
        ]"
      />
    </div>

    <div class="rack-item">
      <h2 class="table-title-box">무선통신운용콘솔</h2>
      <NetworkRack
        :dataU="38"
        :wraps="[
          [
            { dataU: 1, dataSp: 1, imgSrc: '@/assets/images/network/1u-apple_xserve.png', alt: '1u apple xserve', link: '/dashboard/popup/rack4u' },
            { dataU: 3.5, dataSp: 9, imgSrc: '@/assets/images/network/3u-raid_array.png', alt: '3u raid array' },
            { dataU: 4, dataSp: 13, imgSrc: '@/assets/images/network/4u-managed_ups.png', alt: '4u managed ups' },
            { dataU: 8, dataSp: 23, imgSrc: '@/assets/images/network/8u-rackmount_lcd.png', alt: '8u rackmount lcd' },
          ],
          [
            { dataU: 3.5, dataSp: 9, imgSrc: '@/assets/images/network/3u-raid_array.png', alt: '3u raid array' },
          ],
          [
            { dataU: 4, dataSp: 13, imgSrc: '@/assets/images/network/4u-managed_ups.png', alt: '4u managed ups' },
          ],
          [
            { dataU: 4, dataSp: 13, imgSrc: '@/assets/images/network/4u-managed_ups.png', alt: '4u managed ups' },
          ]
        ]"
      />
    </div>

    <div class="rack-item">
      <h2 class="table-title-box">비상통신기시스템</h2>
      <NetworkRack
        :dataU="38"
        :wraps="[
          [
            { dataU: 1, dataSp: 1, imgSrc: '@/assets/images/network/1u-apple_xserve.png', alt: '1u apple xserve', link: '/dashboard/popup/rack4u' },
            { dataU: 3.5, dataSp: 9, imgSrc: '@/assets/images/network/3u-raid_array.png', alt: '3u raid array' },
            { dataU: 4, dataSp: 13, imgSrc: '@/assets/images/network/4u-managed_ups.png', alt: '4u managed ups' },
            { dataU: 8, dataSp: 23, imgSrc: '@/assets/images/network/8u-rackmount_lcd.png', alt: '8u rackmount lcd' },
          ],
          [
            { dataU: 3.5, dataSp: 9, imgSrc: '@/assets/images/network/3u-raid_array.png', alt: '3u raid array' },
          ],
        ]"
      />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import G from "@/config/global.js";
import NetworkRack from '@/components/NetworkRack.vue';

const ko = {
  "title": "랙 내용",
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
