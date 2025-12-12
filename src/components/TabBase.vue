<template>
  <div role="tablist" class="tab-base">
    <button
      v-for="tab in tabs"
      :key="tab.path"
      type="button"
      role="tab"
      :aria-selected="tab.path === selected ? 'true' : 'false'"
      @click="$emit('select', tab.path)"
      :class="{ 'is-selected': tab.path === selected }"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'TabBase',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-base {
  display:flex;
  gap:1rem;
  height: 3rem;
  &.sub-tab {
    height:auto;
    padding:.4rem;
    border-radius:99em;
    gap:.4rem;
    justify-content:center;
    background-color:var(--color-secondary-blue);
    [role="tab"] {
      border-radius:99em;
      background-color:transparent;
      color:rgba(255,255,255,.7);
      min-width:auto;
      padding:0 2rem;
      height:3rem;
      font-weight:500;
    }
    .button.is-selected,
    button[aria-selected="true"] {
      background-color:#fff;
      color:var(--color-secondary-blue);
      font-weight:800;
    }
  }
}
.tab-base [role="tab"] {
  box-sizing: border-box;
  height: 100%;
  min-width: 10rem;
  font-size:1.4rem;
  font-weight: 700;
  padding:0.5rem 1rem;
  background-color: #C5C5C5;
  border-radius: .5rem .5rem 0 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-base button.is-selected,
.tab-base button[aria-selected="true"] {
  background-color: #fff;
  color: #000;
}
</style>
