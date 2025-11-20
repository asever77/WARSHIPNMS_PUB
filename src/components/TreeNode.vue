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

<script>
export default {
  name: "TreeNode",
  components: {
    TreeNode: () => import("./TreeNode.vue")
  },
  props: {
    node: Object
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    onCheck(checked) {
      // 현재 노드 체크 상태 변경
      this.node.checked = checked;
      this.node.indeterminate = false;

      // 하위 노드 체크 상태 모두 변경
      if (this.node.children && this.node.children.length) {
        this.node.children.forEach(child => {
          this.setChildChecked(child, checked);
        });
      }

      // 상위 노드 상태 갱신
      this.$emit("update-parent");
      this.$emit("checked-nodes");
    },
    setChildChecked(node, checked) {
      node.checked = checked;
      node.indeterminate = false;
      if (node.children && node.children.length) {
        node.children.forEach(child => this.setChildChecked(child, checked));
      }
    },
    updateParentStatus() {
      if (!this.node.children || !this.node.children.length) return;

      const total = this.node.children.length;
      const checkedCount = this.node.children.filter(c => c.checked).length;
      const indeterminateCount = this.node.children.filter(c => c.indeterminate).length;

      if (checkedCount === total) {
        this.node.checked = true;
        this.node.indeterminate = false;
      } else if (checkedCount === 0 && indeterminateCount === 0) {
        this.node.checked = false;
        this.node.indeterminate = false;
      } else {
        this.node.checked = false;
        this.node.indeterminate = true;
      }

      // 상위로 재귀 호출
      this.$emit("update-parent");
      this.$emit("checked-nodes");
    }
  },
  created() {
    if (this.node.children && this.node.children.length) {
      this.node.children.forEach(child => {
        child.checked = child.checked ?? false;
        child.indeterminate = false;
      });
    }
    this.node.checked = this.node.checked ?? false;
    this.node.indeterminate = false;
  }
};
</script>
