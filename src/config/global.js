// 디바이스 감지
const ua = navigator.userAgent
const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua)
const isDesktop = !isMobile && !isTablet

export default {
  lang: 'ko',
  isMobile,
  isTablet,
  isDesktop,
}
