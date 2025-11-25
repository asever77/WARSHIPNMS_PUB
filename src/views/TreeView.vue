<template>
  <div class="container mt-5">
    <h3>체크박스 트리 (상위 ↔ 하위 동기화)</h3>

    <ul class="list-group mt-3">
      <TreeNode
        v-for="item in treeData"
        :key="item.id"
        :node="item"
        @checked-nodes="updateChecked"
        @update-parent="updateChecked"
      />
    </ul>

    <div class="mt-4 p-3 bg-light border">
      <h5>선택된 노드 ID 목록:</h5>
      <pre>{{ checkedIds }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TreeNode from "@/components/TreeNode.vue";

// --- 상태 ---
const checkedIds = ref([])

const treeData = ref([
  {
    id: "1",
    label: "1단계 A",
    leaf: false,
    children: [
      { id: "1-1", label: "2단계 Leaf A-1", leaf: true },
      {
        id: "1-2",
        label: "2단계 A-2",
        leaf: false,
        children: [
          { id: "1-2-1", label: "3단계 Leaf A-2-1", leaf: true },
          {
            id: "1-2-2",
            label: "3단계 A-2-2",
            leaf: false,
            children: [
              { id: "1-2-2-1", label: "4단계 Leaf A-2-2-1", leaf: true },
              { id: "1-2-2-2", label: "4단계 Leaf A-2-2-2", leaf: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "2",
    label: "1단계 B",
    leaf: false,
    children: [
      { id: "2-1", label: "2단계 Leaf B-1", leaf: true },
      {
        id: "2-2",
        label: "2단계 B-2",
        leaf: false,
        children: [
          { id: "2-2-1", label: "3단계 B-2-1", leaf: true }
        ]
      }
    ]
  },
  { id: "3", label: "1단계 Leaf C", leaf: true }
]);

// --- 체크된 노드 업데이트 ---
const updateChecked = () => {
  const result = [];
  const traverse = (node) => {
    if (node.checked) result.push(node.id);
    if (node.children) node.children.forEach(traverse);
  };
  treeData.value.forEach(traverse);
  checkedIds.value = result;
};
</script>
