import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const BsTooltipDirective = {
  // 엘리먼트가 DOM에 마운트될 때 호출됩니다.
  mounted(el, binding) {
    // data-bs-* 속성에서 툴팁 옵션을 가져옵니다.
    // binding.value가 있다면 그것을 title로 사용하거나 옵션으로 병합합니다.
    const options = {
      placement: el.dataset.bsPlacement || 'top',
      title: el.dataset.bsTitle || el.getAttribute('title') || binding.value,
      html: el.dataset.bsHtml === 'true',
      trigger: el.dataset.bsTrigger || 'hover focus', // 기본 부트스트랩 트리거
      delay: el.dataset.bsDelay ? JSON.parse(el.dataset.bsDelay) : 0,
    }

    // data-bs-custom-class 속성이 있을 때만 customClass 옵션을 추가합니다.
    if (el.dataset.bsCustomClass) {
      options.customClass = el.dataset.bsCustomClass
    }

    // binding.value가 객체인 경우, data 속성보다 우선하여 옵션을 병합합니다.
    if (typeof binding.value === 'object') {
      Object.assign(options, binding.value)
    }

    // 툴팁 인스턴스를 엘리먼트에 저장하여 나중에 접근할 수 있도록 합니다.
    el._bs_tooltip = new bootstrap.Tooltip(el, options)
  },
  // 엘리먼트가 업데이트될 때 호출됩니다. (예: title이 변경될 때)
  updated(el, binding) {
    if (el._bs_tooltip && binding.value !== binding.oldValue) {
      el._bs_tooltip.setContent({ '.tooltip-inner': binding.value })
    }
  },
  // 엘리먼트가 DOM에서 제거되기 전에 호출됩니다.
  beforeUnmount(el) {
    if (el._bs_tooltip) {
      el._bs_tooltip.dispose() // 툴팁 인스턴스 제거
      delete el._bs_tooltip
    }
  },
}

export default BsTooltipDirective
