<template>
  <div class="container mt-4">
    <h3 class="mb-4">UI Component Guides</h3>
    <div class="list-group">
      <a
        href="https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs.html"
        target="_blank"
        rel="noopener noreferrer"
        class="list-group-item list-group-item-action"
      >
        bootstrap-vue-next 공식 문서
      </a>
      <a
        href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
        target="_blank"
        rel="noopener noreferrer"
        class="list-group-item list-group-item-action"
      >
        bootstrap v5.3 공식 문서
      </a>
      <router-link to="/guide/tabs" class="list-group-item list-group-item-action">
        Tabs Guide(next)
      </router-link>
      <router-link to="/guide/modal" class="list-group-item list-group-item-action">
        Modal Guide(next)
      </router-link>
      <router-link to="/guide/accordion" class="list-group-item list-group-item-action">
        Accordion Guide(next)
      </router-link>
      <router-link to="/guide/dropdowns" class="list-group-item list-group-item-action">
        Dropdowns Guide(next)
      </router-link>
      <router-link to="/guide/toasts" class="list-group-item list-group-item-action">
        Toasts Guide
      </router-link>
      <router-link to="/guide/tooltips" class="list-group-item list-group-item-action">
        Tooltips Guide
      </router-link>
      <router-link to="/guide/form" class="list-group-item list-group-item-action">
        Form Components Guide(next)<br />
        (Input, Select, Checkbox, Radio)
      </router-link>
      <router-link to="/guide/table" class="list-group-item list-group-item-action">
        Table Guide(next)
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuideIndex',
}
</script>
