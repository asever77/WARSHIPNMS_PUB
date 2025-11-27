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

    <button type="button" aria-label="열고닫기" class="base-nav--toggle" @click="toggleSide"></button>
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
		},
		toggleSide() {
			const baseSide = this.$el.closest('.base-side');
			if (baseSide) {
				const current = baseSide.getAttribute('data-state');
				baseSide.setAttribute('data-state', current === 'open' || !current ? 'close' : 'open');
			}
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
  flex: 1;
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
    padding-left: 2.4rem;
    gap:1.5rem;
    font-size: 1.6rem;
    font-weight: 700;
    color:#fff;
    border-radius: .5rem;
  }
  .router-link-active {
    background-color: var(--color-secondary-blue);
  }
  .tree-submenu {
    .tree-page,
    .tree-toggle,
    .tree-link {
      display: flex;
      min-height: 2.8rem;
      justify-content: flex-start;
      align-items: center;
      padding-left: 4.9rem;
      gap:1.5rem;
      font-size: 1.2rem;
      font-weight: 400;
      color:#fff;
      position: relative;
      &:hover {
        color: var(--color-secondary-yellow);
      }
    }
    .router-link-active {
      background-color:  transparent;
      color: var(--color-secondary-yellow);
      font-weight: 700;

      &::before {
        content:"";
        display: block;
        position: absolute;
        left: 3.5rem;
        width: .6rem;
        height: 1rem;
        background-image: url("data:image/svg+xml,%3Csvg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.667802C0 0.0998024 0.7395 -0.196864 1.21725 0.145802L1.28025 0.196469L5.78025 4.19647C5.90938 4.31126 5.98696 4.464 5.99842 4.62602C6.00988 4.78803 5.95444 4.9482 5.8425 5.07647L5.78025 5.13914L1.28025 9.13914L1.20975 9.19447L1.152 9.23047L1.08 9.26647L1.053 9.2778L1.00275 9.2958L0.92175 9.31714L0.882 9.3238L0.837 9.33047L0.79425 9.33314L0.75 9.33447L0.70575 9.33314L0.66225 9.3298L0.61725 9.3238L0.57825 9.31714L0.49725 9.2958L0.447 9.2778L0.348 9.23114L0.2805 9.1878L0.21975 9.13914L0.1575 9.07647L0.117 9.02514L0.0765002 8.96114L0.06375 8.93714L0.0434997 8.89247L0.0195 8.82047L0.0119998 8.78514L0.00449967 8.74514L0.00149989 8.70714L0 0.667802Z' fill='%23F8E56C'/%3E%3C/svg%3E%0A");
      }
    }
  }
  [data-icon]::before {
    content:"";
    display: block;
    background: url('/images/icon/icon-aspect-nav8.svg') no-repeat 50% 50% / 2.4rem;
    width: 2.4rem;
    height: 2.4rem;
  }
  [data-icon="nav1"]::before {
    background: url('/images/icon/icon-aspect-nav1.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav2"]::before {
    background: url('/images/icon/icon-aspect-nav2.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav3"]::before {
    background: url('/images/icon/icon-aspect-nav3.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav4"]::before {
    background: url('/images/icon/icon-aspect-nav4.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav5"]::before {
    background: url('/images/icon/icon-aspect-nav5.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav6"]::before {
    background: url('/images/icon/icon-aspect-nav6.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav7"]::before {
    background: url('/images/icon/icon-aspect-nav7.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav8"]::before {
    background: url('/images/icon/icon-aspect-nav8.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav9"]::before {
    background: url('/images/icon/icon-aspect-nav9.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav10"]::before {
    background: url('/images/icon/icon-aspect-nav10.svg') no-repeat 50% 50% / 2.4rem;
  }
}
.base-nav--toggle {
  position: absolute;
  bottom: 1.3rem;
  right: 2.2rem;
  width: 2.4rem;
  height: 2.4rem;
  background: url('/images/icon/icon-aspect-nav-menu.svg') no-repeat 50% 50% / contain;
  border: none;
  cursor: pointer;
}

.base-side[data-state="close"] .base-nav[data-style="base"] {
  padding: 1.5rem 0 0 0.7rem;
  .tree-page,
  .tree-toggle,
  .tree-link {
    min-height: 3.4rem;
    max-height: 3.4rem;
    overflow: hidden;
    padding-left: 1rem;
    gap:0;
    font-size: .1rem;
    color: transparent;
    border-radius: 0.5rem 0 0 .5rem;
  }
  .base-nav--toggle{
    right: 1.2rem;
    transform: rotate(180deg);
  }
}
</style>
