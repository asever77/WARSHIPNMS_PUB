<template>
  <li class="list-group-item">
    <div class="d-flex align-items-center">
      <!-- 펼치기 버튼 -->
      <span
        v-if="node.children && node.children.length"
        class="me-2"
        @click="toggle"
        style="cursor:pointer; user-select:none;"
      >
        {{ isOpen ? '▼' : '▶' }}
      </span>

      <!-- 체크박스 -->
      <input
        type="checkbox"
        class="form-check-input me-2"
        :checked="node.checked"
        :indeterminate.prop="node.indeterminate"
        @change="onCheck($event.target.checked)"
      />

      <span :class="{ 'text-muted': node.leaf }">{{ node.label }}</span>
    </div>

    <!-- 자식 노드 -->
    <ul v-if="isOpen && node.children && node.children.length" class="list-group ms-4 mt-2">
      <tree-node
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @update-parent="updateParentStatus"
      />
    </ul>
  </li>
</template>

<script setup>
import { ref, reactive, watch, toRefs } from "vue";

// 재귀 컴포넌트 정의
const props = defineProps({
  node: Object
});

const emit = defineEmits(["update-parent", "checked-nodes"]);

const isOpen = ref(false);

// --- 초기 체크 상태 설정 ---
if (props.node.children && props.node.children.length) {
  props.node.children.forEach(child => {
    child.checked = child.checked ?? false;
    child.indeterminate = false;
  });
}
props.node.checked = props.node.checked ?? false;
props.node.indeterminate = false;

// --- 토글 ---
const toggle = () => {
  isOpen.value = !isOpen.value;
};

// --- 자식 체크 상태 변경 ---
const setChildChecked = (node, checked) => {
  node.checked = checked;
  node.indeterminate = false;
  if (node.children && node.children.length) {
    node.children.forEach(child => setChildChecked(child, checked));
  }
};

// --- 체크박스 클릭 처리 ---
const onCheck = (checked) => {
  props.node.checked = checked;
  props.node.indeterminate = false;

  if (props.node.children && props.node.children.length) {
    props.node.children.forEach(child => setChildChecked(child, checked));
  }

  emit("update-parent");
  emit("checked-nodes");
};

// --- 부모 상태 업데이트 (재귀 호출) ---
const updateParentStatus = () => {
  if (!props.node.children || !props.node.children.length) return;

  const total = props.node.children.length;
  const checkedCount = props.node.children.filter(c => c.checked).length;
  const indeterminateCount = props.node.children.filter(c => c.indeterminate).length;

  if (checkedCount === total) {
    props.node.checked = true;
    props.node.indeterminate = false;
  } else if (checkedCount === 0 && indeterminateCount === 0) {
    props.node.checked = false;
    props.node.indeterminate = false;
  } else {
    props.node.checked = false;
    props.node.indeterminate = true;
  }

  emit("update-parent");
  emit("checked-nodes");
};
</script>
