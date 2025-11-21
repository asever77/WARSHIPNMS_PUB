<template>
  <BDropdown :text="text" v-bind="$attrs">
    <template v-for="(item, index) in items" :key="index">
      <!-- item.divider가 true이면 구분선을 렌더링합니다. -->
      <BDropdownHeader v-if="item.content">
        <div v-html="item.text" style="white-space: break-spaces"></div>
      </BDropdownHeader>

      <!-- item.divider가 true이면 구분선을 렌더링합니다. -->
      <BDropdownDivider v-else-if="item.divider" />

      <!-- 일반 아이템을 렌더링합니다. -->
      <BDropdownItem v-else :disabled="item.disabled" @click="onItemClick(item)">
        <!-- item.html이 true이면 HTML로, 아니면 일반 텍스트로 렌더링합니다. -->
        <span v-html="item.text"></span>
      </BDropdownItem>
    </template>
  </BDropdown>
</template>

<script>
import { BDropdown, BDropdownItem, BDropdownDivider, BDropdownHeader } from 'bootstrap-vue-next'

export default {
  name: 'UiDropdowns',
  components: { BDropdown, BDropdownItem, BDropdownDivider, BDropdownHeader },
  props: {
    text: {
      type: String,
      default: 'Dropdown',
    },
    items: {
      type: Array,
      required: true,
    },
  },
  emits: ['select'],
  methods: {
    onItemClick(item) {
      if (!item.disabled) {
        this.$emit('select', item)
      }
    },
  },
}
</script>
