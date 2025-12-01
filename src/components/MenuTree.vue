<template>
  <ul class="tree-check">
    <template v-for="(node, index) in nodes" :key="node.id || index">
      <li class="tree-check--item">
        <BFormCheckbox
          :id="getCheckboxId(node, index)"
          :model-value="node.checked"
          @update:modelValue="val => updateChecked(node, val)"
          :name="getCheckboxId(node, index)"
          :disabled="isDisabled(node)"
        >
          {{ node.label }}
        </BFormCheckbox>
        <ul v-if="node.children && node.children.length" class="tree-check">
          <template v-for="(child, cidx) in node.children" :key="child.id || cidx">
            <MenuTree :nodes="[child]" :parentChecked="node.checked" :parentNode="node" />
          </template>
        </ul>
      </li>
    </template>
  </ul>
</template>

<script setup>
// id 자동 생성 함수
function getCheckboxId(node, index) {
  if (node.id) return node.id;
  // label과 index로 고유값 생성
  return `checkbox-${node.label}-${index}`;
}
const props = defineProps({ nodes: Array, parentChecked: Boolean, parentNode: Object });
import { BFormCheckbox } from 'bootstrap-vue-next';

function isDisabled(node) {
  // 1뎁스는 항상 enabled
  if (!node.__parent) return false;
  // 2뎁스부터는 부모가 체크되어야 enabled
  return !(node.__parent && node.__parent.checked);
}

function updateChecked(node, val) {
  node.checked = val;
  if (val) {
    // 체크 시 모든 부모 체크
    let currentParent = node.__parent;
    while (currentParent) {
      currentParent.checked = true;
      currentParent = currentParent.__parent;
    }
    // 1뎁스 체크 시 하위 disabled 해제
    if (!node.__parent) {
      function enableChildren(n) {
        if (n.children && n.children.length) {
          n.children.forEach(child => {
            // 하위 disabled 해제
            enableChildren(child);
          });
        }
      }
      enableChildren(node);
    }
  } else {
    // 체크 해제 시 모든 하위 자식 체크 해제
    function uncheckChildren(n) {
      if (n.children && n.children.length) {
        n.children.forEach(child => {
          child.checked = false;
          uncheckChildren(child);
        });
      }
    }
    uncheckChildren(node);
  }
}

</script>

<style scoped lang="scss">
.tree-check--item {
  box-sizing: border-box;

  .form-check{
    width: 100%;
    min-height: 2.4rem;
    align-items: center;
    display: flex;
    gap:.4rem;
    border-bottom:1px solid #e0e0e0;
    padding-left: 0;
  }
  .tree-check {
    margin-left: 1rem;
  }

}
.tree-check:deep(.form-check-input) {
  flex-shrink: 0;
  display: flex;
  margin-top:0;
  margin-left: 0;
}
.tree-check:deep(.form-check-label) {
  width: 100%;
  cursor: pointer;
  flex:1;
}
</style>
