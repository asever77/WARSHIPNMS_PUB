import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import G from './config/global.js'

// Bootstrap 및 BootstrapVueNext import
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // 이 라인을 추가합니다.
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/global.css';

// Custom directives
import BsTooltip from './directives/v-bs-tooltip'

// bootstrap-vue-next 플러그인 (컴포넌트만 사용)
import { createBootstrap } from 'bootstrap-vue-next'

// html과 body에 디바이스 클래스 추가
const htmlEl = document.documentElement

if (G.isMobile) {
  htmlEl.classList.add('is-mobile')
} else if (G.isTablet) {
  htmlEl.classList.add('is-tablet')
} else if (G.isDesktop) {
  htmlEl.classList.add('is-desktop')
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createBootstrap()) // bootstrap-vue-next의 컴포넌트만 등록 (디렉티브는 우리가 직접 관리)
app.directive('bs-tooltip', BsTooltip) // 커스텀 툴팁 디렉티브 등록

app.mount('#app')
