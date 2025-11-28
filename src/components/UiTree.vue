<template>
  <nav aria-label="Main menu" class="base-nav" :data-style="dataStyle" :data-dep1="activeDep1">
		<ul class="tree-menu">
      <li v-for="item in menu" :key="item.id" :class="{ 'has-children': item.children }">
        <button
          v-if="item.children"
          type="button"
          @click="toggleMenu(item.id)"
          :aria-expanded="isSubmenuVisible(item)"
          class="tree-toggle"
          :data-name="item.dep1"
          v-bind="item.icon ? { 'data-icon': item.icon } : {}"
        >
          <span>{{ item.label }}</span>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L13 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <a
          v-else-if="item.popup"
          :href="item.popup"
          target="_blank"
          rel="noopener"
          @click.prevent="openExternal(item.popup)"
          class="tree-link"
          v-bind="item.icon ? { 'data-icon': item.icon } : {}"
        >
          <span>{{ item.label }}</span>
        </a>
        <router-link
           v-else-if="item.path"
           :to="item.path"
           @click="goToPage(item.path, item.path)"
           class="tree-page"
           active-class="router-link-active"
           v-bind="item.icon ? { 'data-icon': item.icon } : {}"
           :class="{ 'router-link-active': isParentActive(item) }"
        >
          <span>{{ item.label }}</span>
        </router-link>
				<span v-else>{{ item.label }}</span>
        <transition name="tree-submenu-slide">
          <template v-if="item.children">
            <ul :aria-hidden="!isSubmenuVisible(item)" :class="['tree-submenu', { active: isSubmenuVisible(item) }]">
              <li v-for="child in item.children" :key="child.id">
                <button
                  v-if="child.children"
                  type="button"
                  @click="toggleMenu(child.id)"
                  :aria-expanded="isSubActive(child) || isOpen(child.id)"
                  :class="['tree-toggle', { active: isSubActive(child) }]"
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
                  v-bind="child.icon ? { 'data-icon': child.icon } : {}"
                >
                  {{ child.label }}
                </a>
                <router-link
                  v-else-if="child.path"
                  :to="child.path"
                  @click="goToPage(child.path, item.path)"
                  class="tree-page"
                  active-class="router-link-active"
                  v-bind="child.icon ? { 'data-icon': child.icon } : {}"
                  :class="{ 'router-link-active': isSubActive(child) }"
                >
                  {{ child.label }}
                </router-link>
                <span v-else>{{ child.label }}</span>
              </li>
            </ul>
          </template>
        </transition>
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
    // ...existing code...
    dataStyle: {
      type: String,
      default: 'base'
    }
  },
  data() {
      return {
        openMenus: [],
        dep1: '',
        isInitialLoad: true // 초기 진입 플래그 추가
      };
  },
  computed: {
    activeDep1() {
      // 자식 중 isSubActive(child)가 true인 첫번째 child의 data-name 반환
      if (this.menu && this.menu.length > 0) {
        for (const item of this.menu) {
          if (item.children) {
            const activeChild = item.children.find(child => this.isSubActive(child));
            if (activeChild) {
              return item.dep1 || '';
            }
          }
        }
      }
      return this.dep1;
    }
  },
    mounted() {
      this.setDep1ByRoute();
    },
    watch: {
      '$route.path': {
        handler() {
          this.setDep1ByRoute();
        },
        immediate: true
      }
    },
  methods: {
    // 현재 경로의 첫 디렉토리 반환
    getFirstDir(path) {
      if (!path) return '';
      const segments = path.split('/').filter(Boolean);
      return segments.length > 0 ? '/' + segments[0] : '';
    },
    getSecondDir(path) {
      if (!path) return '';
      const segments = path.split('/').filter(Boolean);
      return segments.length > 1 ? '/' + segments[1] : '';
    },

    // 현재 경로와 메뉴 path의 첫 디렉토리로 비교
    isParentActive(item) {
      if (!item.path) return false;
      const currentFirstDir = this.getFirstDir(this.$route.path);
      const itemFirstDir = this.getFirstDir(item.path);

      return currentFirstDir === itemFirstDir;
    },
    isSubActive(child) {
      if (!child.path) return false;
      const currentSecondDir = this.getSecondDir(this.$route.path);
      const childSecondDir = this.getSecondDir(child.path);

      return currentSecondDir === childSecondDir;
    },
    isSubmenuVisible(item) {
      const open = this.isOpen(item.id);
      const subActive = item.children && item.children.some(child => this.isSubActive(child));

      if (this.isInitialLoad) {
        return open || subActive;
      } else {
        return open;
      }
    },

    toggleMenu(id, isDep1 = false) {
      // 첫 클릭에서 route 기반으로 열린 상태라면 바로 닫히도록 처리
      if (isDep1) {
        this.isInitialLoad = false;
        this.openMenus = [id];
      } else {
        const n = this.isInitialLoad ? true : this.openMenus.includes(id);
        if (n) {
          // route 기반으로 열린 상태에서 첫 클릭이면 바로 닫기
          if (this.isInitialLoad) {
            this.isInitialLoad = false;
          }
          this.openMenus = this.openMenus.filter(menuId => menuId !== id);
        } else {
          this.isInitialLoad = false;
          this.openMenus = [...this.openMenus, id];
        }
      }
    },
    isOpen(id) {
      const result = this.openMenus.includes(id);
      return result;
    },
    goToPage(path, dep1) {
      if (path) {
        this.dep1 = dep1 || '';
        this.$router.push(path);
      }
    },
    setDep1ByRoute() {
      // dep1: 첫번째 메뉴 path 기준
      this.isInitialLoad = true; // 라우트 변경 시 초기 진입
      if (this.menu && this.menu.length > 0) {
        for (const item of this.menu) {
          if (item.path && this.$route.path.startsWith(item.path)) {
            this.dep1 = item.dep1;
            this.openMenus = [item.id];
            return;
          }
          if (item.children) {
            for (const child of item.children) {
              if (child.path && this.$route.path === child.path) {
                this.dep1 = item.dep1;
                this.openMenus = [item.id, child.id];
                return;
              }
            }
          }
        }
      }
      this.dep1 = '';
      this.openMenus = [];
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

.tree-toggle {
	background: none;
	border: none;
	cursor: pointer;
}

.base-nav[data-style="base"] {
  position: relative;
  flex: 1;
  padding: 1.5rem 1.5rem 4rem;
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
    width: 100%;
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
    position: relative;
    text-decoration: none;

    svg {
      position: absolute;
      right: 1rem;
    }
    &.active {
      background-color: var(--color-secondary-blue);
      color: var(--color-primary);
    }
  }
  .tree-toggle[aria-expanded="true"]{
    svg {
      transform: rotate(180deg);
    }
  }
  &[data-dep1="settings"] .tree-toggle[aria-expanded="true"] {
    background-color: var(--color-secondary-blue);
    color: var(--color-primary);
    path {
      stroke: var(--color-primary);
    }
    &::before {
      background: url('@/assets/images/icon/icon-aspect-nav2-on.svg') no-repeat 50% 50% / 2.4rem;
    }
  }
  .router-link-active {
    background-color: var(--color-secondary-blue);
    color: var(--color-primary);

    &[data-icon="nav1"]::before {
      background: url('@/assets/images/icon/icon-aspect-nav1-on.svg') no-repeat 50% 50% / 2.4rem;
    }
    &[data-icon="nav2"]::before {
      background: url('@/assets/images/icon/icon-aspect-nav2-on.svg') no-repeat 50% 50% / 2.4rem;
    }
    &[data-icon="nav3"]::before {
      background: url('@/assets/images/icon/icon-aspect-nav3-on.svg') no-repeat 50% 50% / 2.4rem;
    }
    &[data-icon="nav4"]::before {
      background: url('@/assets/images/icon/icon-aspect-nav4-on.svg') no-repeat 50% 50% / 2.4rem;
    }
    &[data-icon="nav5"]::before {
      background: url('@/assets/images/icon/icon-aspect-nav5-on.svg') no-repeat 50% 50% / 2.4rem;
    }
    &[data-icon="nav6"]::before {
      background: url('@/assets/images/icon/icon-aspect-nav6-on.svg') no-repeat 50% 50% / 2.4rem;
    }
    &[data-icon="nav7"]::before {
      background: url('@/assets/images/icon/icon-aspect-nav7-on.svg') no-repeat 50% 50% / 2.4rem;
    }
    &[data-icon="nav8"]::before {
      background: url('@/assets/images/icon/icon-aspect-nav8-on.svg') no-repeat 50% 50% / 2.4rem;
    }
    &[data-icon="nav9"]::before {
      background: url('@/assets/images/icon/icon-aspect-nav9-on.svg') no-repeat 50% 50% / 2.4rem;
    }
    &[data-icon="nav10"]::before {
      background: url('@/assets/images/icon/icon-aspect-nav10-on.svg') no-repeat 50% 50% / 2.4rem;
    }
  }
  .tree-submenu {
    margin: 1rem 0 2rem;
    &[aria-hidden="true"] {
      display: none;
    }
    .tree-page,
    .tree-toggle,
    .tree-link {
      display: flex;
      width: 100%;
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
      /* tree-toggle 버튼이 active일 때도 pointer-events를 막지 않음 */
      &.tree-toggle {
        pointer-events: auto !important;
      }
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
    background: url('@/assets/images/icon/icon-aspect-nav8.svg') no-repeat 50% 50% / 2.4rem;
    width: 2.4rem;
    height: 2.4rem;
  }
  [data-icon="nav1"]::before {
    background: url('@/assets/images/icon/icon-aspect-nav1.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav2"]::before {
    background: url('@/assets/images/icon/icon-aspect-nav2.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav3"]::before {
    background: url('@/assets/images/icon/icon-aspect-nav3.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav4"]::before {
    background: url('@/assets/images/icon/icon-aspect-nav4.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav5"]::before {
    background: url('@/assets/images/icon/icon-aspect-nav5.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav6"]::before {
    background: url('@/assets/images/icon/icon-aspect-nav6.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav7"]::before {
    background: url('@/assets/images/icon/icon-aspect-nav7.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav8"]::before {
    background: url('@/assets/images/icon/icon-aspect-nav8.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav9"]::before {
    background: url('@/assets/images/icon/icon-aspect-nav9.svg') no-repeat 50% 50% / 2.4rem;
  }
  [data-icon="nav10"]::before {
    background: url('@/assets/images/icon/icon-aspect-nav10.svg') no-repeat 50% 50% / 2.4rem;
  }
}
.base-nav--toggle {
  position: absolute;
  bottom: 1.3rem;
  right: 2.2rem;
  width: 2.4rem;
  height: 2.4rem;
  background: url('@/assets/images/icon/icon-aspect-nav-menu.svg') no-repeat 50% 50% / contain;
  border: none;
  cursor: pointer;
}

.base-side[data-state="close"] {
  .admin-area--info {
    display: none;
  }
  .base-nav[data-style="base"] {
    padding: 1.5rem 0 10rem 0.7rem;
    li {position: relative;}
    .tree-page,
    .tree-toggle,
    .tree-link {
      min-height: 3.4rem;
      max-height: 3.4rem;
      overflow: hidden;
      padding-left: 0.6rem;
      gap:0;
      font-size: .1rem;
      color: transparent;
      border-radius: 0.5rem 0 0 .5rem;
      span,
      svg{display: none;}
    }
    .base-nav--toggle{
      right: 1.2rem;
      transform: rotate(180deg);
    }
    .tree-submenu {
      position: absolute;
      top:-2rem;
      left:calc(100% + 1rem);
      background-color: var(--color-primary);

      &::after {
        content: "◀";
        color: var(--color-primary);
        position: absolute;
        display: block;
        left: -1.2rem ;
        top:1.2rem;
        font-size: 2rem;
      }
      .tree-page,
      .tree-toggle,
      .tree-link {
        font-size: 1.2rem;
        color: #fff;
        text-decoration: none;
        min-height: 2.8rem;
      }
      .router-link-active {
        color:var(--color-secondary-yellow);
        &::before {
          display:none;
        }
      }

    }
  }

  .tree-submenu {
    position: absolute;
    left: 100%;
    top: 0;
    background-color: var(--color-primary-dark);
    padding: 1rem;
    border-radius: .5rem;
    box-shadow: 0 0 1rem 0 #00000040;
    z-index: 10;
    width: max-content;
    min-width: 15rem;
    li {
      margin-bottom: 0.5rem;
    }
    .tree-page,
    .tree-toggle,
    .tree-link {
      min-height: 2.8rem;
      max-height: 2.8rem;
      overflow: hidden;
      padding-left: 1.5rem;
      gap:0;
      font-size: 1.2rem;
      color: #fff;
      border-radius: 0.5rem;
      span,
      svg{display: none;}
    }
  }
}

.tree-submenu-slide-enter-active,
.tree-submenu-slide-leave-active {
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.tree-submenu-slide-enter-from,
.tree-submenu-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.tree-submenu-slide-enter-to,
.tree-submenu-slide-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
