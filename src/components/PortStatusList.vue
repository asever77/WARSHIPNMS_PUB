<template>
  <div class="port-status-wrap">
    <ul class="port-status">
      <li data-status="normal"><b>01</b></li>
      <li data-status="abnormal"><b>02</b></li>
      <li><b>03</b></li>
      <li><b>04</b></li>
      <li><b>05</b></li>
      <li><b>06</b></li>
      <li><b>07</b></li>
      <li><b>08</b></li>
      <li><b>09</b></li>
      <li><b>10</b></li>
      <li><b>11</b></li>
      <li><b>12</b></li>
      <li><b>13</b></li>
      <li><b>14</b></li>
      <li><b>15</b></li>
      <li><b>16</b></li>
      <li><b>17</b></li>
      <li><b>18</b></li>
      <li><b>19</b></li>
      <li><b>20</b></li>
      <li><b>21</b></li>
      <li><b>22</b></li>
      <li><b>23</b></li>
      <li><b>24</b></li>
    </ul>

    <ul class="port-status group-port">
      <li data-status="normal"><b>G1</b></li>
      <li data-status="abnormal"><b>G2</b></li>
      <li><b>G3</b></li>
      <li><b>G4</b></li>
    </ul>
  </div>
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
.port-status-wrap {
  display: flex;
  justify-content: center;
  align-items:end;
  gap: 4rem;
  margin: 2rem auto;
}
.group-port.port-status {
  flex-direction: row;
  height: 2rem;
}
.group-port.port-status li b{
  transform: translateY(2rem);
}
.port-status{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap:.2rem;
  width: auto;
  height: 4.2rem;
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
  transform: translateY(-2rem);
}
.port-status li:nth-child(even) b{
   transform: translateY(2rem);
}

.port-status li[data-status="normal"]{background-color: #4BC43D;}
.port-status li[data-status="abnormal"]{background-color: #F27322;}
</style>
