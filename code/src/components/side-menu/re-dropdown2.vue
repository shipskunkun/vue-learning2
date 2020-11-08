<!--
on-click  点击菜单项时触发
placement 下拉菜单出现的位置
-->
<template>
  <Dropdown @on-click="handleClick">
    <span class="drop-menu-span" :style="titleStyle" trigger="hover">
      <Icon :type="parent.icon" :color="iconColor" :size="20"></Icon>
      <span v-if="showTitle">{{ parent.title }}</span>
    </span>
    <DropdownMenu slot="list" >
      <template v-for="item in parent.children">
        <re-dropdown v-if="item.children" :key="`drop_${item.name}`" :parent="item"></re-dropdown>
        <DropdownItem v-else :key="`drop_${item.name}`" :name="item.name">
          <Icon :type="item.icon" color="#515a6e" :size="20"></Icon>
          {{ item.title || item.name}}
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name: 'ReDropdown',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    iconColor: {
      type: String,
      default: '#515a6e'
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    // console.log('drop_', this.parent)
  },
  computed: {
    titleStyle () {
      return {
        textAlign: this.showTitle ? 'left' : 'center',
        paddingLeft: this.showTitle ? '16px' : ''
      }
    }
  },
  methods: {
    handleClick (name) {
      if (!this.showTitle) this.$emit('on-select', name)
    }
  }
}
</script>

<style>
  .ivu-dropdown-menu {
    z-index: 999;
  }

</style>
