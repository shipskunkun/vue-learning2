<!--

slot: 网站logo
不折叠的时候，显示 submenu 组件
  menu:
    active-name 激活菜单的 name 值
    open-names: 展开的 Submenu 的 name 集合
  为什么需要传递name?
    name  菜单项的唯一标识，必填
    name  子菜单的唯一标识，必填

折叠时候，显示 dropdown 组件
  icon: 'ios-alarm'

自己修改了list，加上icon试试
解决问题：
  解决没有 trigger 的问题，dropdown失效的问题
  解决没有 title 的问题
  

-->
<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" :active-name="$route.name" :open-names="openNames" v-show="!collapsed" width="auto" theme="dark" @on-select="handleSelect">
      <template v-for="item in list2">
        <re-submenu
          v-if="item.children"
          :key="`menu_${item.name}`"
          :name="item.name"
          :parent="item"
        >
        </re-submenu>
        <menu-item v-else :key="`menu_${item.name}`" :name="item.name">
          <Icon :type="item.icon" />
          {{ item.meta.title }}
        </menu-item>
      </template>
    </Menu>
    <div v-show="collapsed" class="drop-wrapper">
      <template v-for="item in list2">
        <re-dropdown @on-select="handleSelect" v-if="item.children" :show-title="false" icon-color="#fff" :key="`drop_${item.name}`" :parent="item"></re-dropdown>
        <Tooltip v-else transfer :content="item.title" placement="right" :key="`drop_${item.name}`">
          <span @click="handleClick(item.name)" class="drop-menu-span">
            <Icon :type="item.icon" color="#fff" :size="20"></Icon>
          </span>
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<script>
import ReSubmenu from './re-submenu2.vue'
import ReDropdown from './re-dropdown2.vue'
import { mapState } from 'vuex'
import { getOpenArrByName } from '@/lib/util'
export default {
  name: 'SideMenu',
  components: {
    ReSubmenu,
    ReDropdown
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    
    console.log('side-menu', this.list)
  },
  computed: {
    ...mapState({
      routers: state => state.router.routers
    }),
    openNames () {
      return getOpenArrByName(this.$route.name, this.routers)
    },
    list2() {
      return this.list.map((item)=>{
        item.icon = 'ios-alarm';
        item.title = item.name || "";
        return item;
      })
    }
  },
  watch: {
    openNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  methods: {
    handleSelect (name) {
      this.$router.push({
        name
      })
    },
    handleClick (name) {
      console.log(name)
    }
  }
}
</script>

<style lang="less">
.side-menu-wrapper{
  width: 100%;
  .ivu-tooltip, .drop-menu-span{
    display: block;
    width: 100%;
    text-align: center;
    padding: 5px 0;
  }
  .drop-wrapper > .ivu-dropdown{
    display: block;
    padding: 5px;
    margin: 0 auto;
  }
}
</style>
