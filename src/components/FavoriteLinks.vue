<template>
  <ul class="favorites-links">
    <li v-for="link in sortedLinks" :key="link.order" class="favorites-links--item">
      <BLink
        :href="link.url"
        target="_blank"
        rel="noopener"
        class="favorites-links--link"
      >
        <span>{{ link.name }}</span>
      </BLink>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { BLink } from 'bootstrap-vue-next';

const props = defineProps({
  links: {
    type: Array,
    required: true,
    default: () => []
  }
});

const sortedLinks = computed(() => {
  return [...props.links].sort((a, b) => a.order - b.order);
});
</script>

<style lang="scss" scoped>
  .favorites-links {
    width: 100%;
    list-style: none;
    padding: 0 2.5rem;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    &--item {
      position: relative;
      flex: 1;
    }

    &--link {
      background-color: #fff;
      display: flex;
      align-items: center;
      border-radius: .4rem;
      overflow: hidden;
      width: 100%;
      height: 2.2rem;
      text-decoration: none;
      color: #002745;
      font-size: 1.2rem;

      span {
        flex: 1;
        display: block;
        padding:0 0.4rem;
        text-align: center;
      }
      &::after {
        content: "";
        display: block;
        background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_13_1902)'%3E%3Cpath d='M7.00003 10.3542L3.39969 12.2471L4.08744 8.23785L1.17078 5.39876L5.19578 4.81543L6.99594 1.16785L8.79611 4.81543L12.8211 5.39876L9.90444 8.23785L10.5922 12.2471L7.00003 10.3542Z' stroke='%23A10000' stroke-opacity='0.7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_13_1902'%3E%3Crect width='14' height='14' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
        width: 2.2rem;
        height: 100%;
        background-size: 1.4rem 1.4rem;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-color: #FF9F55;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
