<template>
  <ul class="port-status">
    <li v-for="port in ports" :key="port.number" :data-status="port.status">
      <b>{{ port.number }}</b>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';

// ports: Array<{ number: number, status: 'normal' | 'abnormal' | null }>
const props = defineProps({
  ports: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<style scoped>
.port-status{
  display: inline-flex;
  flex-direction: column-reverse;
  height: 4.4rem;
  flex-wrap: wrap;
  gap:.2rem;
  margin: 2rem auto;
  width: auto;

}
.port-status li{
  position: relative;
  width: 2rem;
  height:2rem;
  background-color: #C5C5C5;
}
.port-status li b{
  font-size: 1.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  transform: translateY(2rem);
}
.port-status li:nth-child(even) b{
   transform: translateY(-2rem);
}
.port-status li:nth-child(25),
.port-status li:nth-child(26){
  margin-left: 2rem;
}
.port-status li[data-status="normal"]{background-color: #4BC43D;}
.port-status li[data-status="abnormal"]{background-color: #F27322;}
</style>
