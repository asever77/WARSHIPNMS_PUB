<template>
	<nav aria-label="Main menu" class="base-nav" :data-style="dataStyle">
		<ul class="tree-menu">
			<li v-for="item in menu" :key="item.id" :class="{ 'has-children': item.children }" :data-state="item.id === selectedId ? 'selected' : null">
				<button
					v-if="item.children"
					type="button"
					@click="toggleMenu(item.id)"
					:aria-expanded="isOpen(item.id)"
					class="tree-toggle"
					:data-state="item.id === selectedId ? 'selected' : null"
					v-bind="item.icon ? { 'data-icon': item.icon } : {}"
				>
					{{ item.label }}
				</button>
				<a
					v-else-if="item.popup"
					:href="item.popup"
					target="_blank"
					rel="noopener"
					@click.prevent="openExternal(item.popup)"
					class="tree-link"
					:data-state="item.id === selectedId ? 'selected' : null"
					v-bind="item.icon ? { 'data-icon': item.icon } : {}"
				>
					{{ item.label }}
				</a>
				<router-link
					v-else-if="item.path"
					:to="item.path"
					@click="goToPage(item.path)"
					class="tree-page"
					:data-state="item.id === selectedId ? 'selected' : null"
					v-bind="item.icon ? { 'data-icon': item.icon } : {}"
				>
					{{ item.label }}
				</router-link>
				<span v-else>{{ item.label }}</span>
				<ul v-if="item.children && isOpen(item.id)" class="tree-submenu">
					<li v-for="child in item.children" :key="child.id" :data-state="child.id === selectedId ? 'selected' : null">
						<button
							v-if="child.children"
							type="button"
							@click="toggleMenu(child.id)"
							:aria-expanded="isOpen(child.id)"
							class="tree-toggle"
							:data-state="child.id === selectedId ? 'selected' : null"
							v-bind="child.icon ? { 'data-icon': child.icon } : {}"
						>
							{{ child.label }}
						</button>
						<a
							v-else-if="child.popup"
							:href="child.popup"
							target="_blank"
							rel="noopener"
							@click.prevent="openExternal(child.popup)"
							class="tree-link"
							:data-state="child.id === selectedId ? 'selected' : null"
							v-bind="child.icon ? { 'data-icon': child.icon } : {}"
						>
							{{ child.label }}
						</a>
						<router-link
							v-else-if="child.path"
							:to="child.path"
							@click="goToPage(child.path)"
							class="tree-page"
							:data-state="child.id === selectedId ? 'selected' : null"
							v-bind="child.icon ? { 'data-icon': child.icon } : {}"
						>
							{{ child.label }}
						</router-link>
						<span v-else>{{ child.label }}</span>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'UiTree',
	props: {
		menu: {
			type: Array,
			required: true
		},
		dataStyle: {
			type: String,
			default: 'base'
		},
		selectedId: {
			type: [String, Number],
			default: null
		}
	},
	data() {
		return {
			openMenus: []
		};
	},
	methods: {
		toggleMenu(id) {
			if (this.openMenus.includes(id)) {
				this.openMenus = this.openMenus.filter(menuId => menuId !== id);
			} else {
				this.openMenus.push(id);
			}
		},
		isOpen(id) {
			return this.openMenus.includes(id);
		},
		goToPage(path) {
			if (path) this.$router.push(path);
		},
		openExternal(url) {
			window.open(url, 'popup', 'width=800,height=600');
		}
	}
};
</script>

<style lang="scss" scoped>
.tree-menu {
	list-style: none;
	padding: 0;
	margin: 0;
}
.tree-menu > li {
	margin-bottom: 8px;
}
.tree-toggle {
	background: none;
	border: none;
	cursor: pointer;
	font-weight: bold;
}
.tree-link, .tree-page {
	text-decoration: none;
	color: #007bff;
	cursor: pointer;
}
.tree-submenu {
	list-style: none;
	padding-left: 16px;
}

.base-nav[data-style="base"] {
  position: relative;
  padding: 1.5rem;
  li {
    margin: 0;
  }
  .tree-menu {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap:1rem;
  }
  .tree-page,
  .tree-toggle,
  .tree-link {
    display: flex;
    min-height: 3.6rem;
    justify-content: flex-start;
    align-items: center;
    padding-left: 2rem;
    font-size: 1.6rem;
    font-weight: 700;
    color:#fff;
    border-radius: .5rem;
  }
  .router-link-active {
    background-color: var(--color-secondary-blue);
  }

  [data-icon="document"]::before {
    content:"";
    display: block;
    background: url('/images/icon/icon-aspect-nav8.svg') no-repeat 50% 50% / 2.4rem;
    width: 2.4rem;
    height: 3.4rem;
  }
}
</style>
