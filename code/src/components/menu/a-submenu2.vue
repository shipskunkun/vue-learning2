
<!--
思路：
接受个可配置的 title , 可以配置，可以控制孩子的是否显示，箭头
孩子，孩子距离父亲 20px

只要有箭头的，我们都可以认为是一个 可点击显示的 a-submenu

-->
<template>
  <ul class="a-submenu">
    <div class="a-submenu-title" @click="handleClick">
      <slot name="title"></slot>
      <span class="shrink-icon" :style="{ transform: `rotateZ(${showChild ? 0 : 180}deg)` }">^</span>
    </div>
    <div class="a-submenu-child-box" v-show="showChild">
      <slot></slot>
    </div>
  </ul>
</template>

<script>
export default {
  nmae: 'ASubmenu',
  data () {
    return {
      showChild: false
    }
  },
  methods: {
    handleClick () {
      this.showChild = !this.showChild
    }
  }
}
</script>

<style lang="less">
.a-submenu{
  background: rgb(33, 35, 39);
  &-title{
    color: #fff;
    position: relative;
    .shrink-icon{
      position: absolute;
      top: 4px;
      right: 10px;
    }
  }
  &-child-box{
    overflow: hidden;
    padding-left: 20px;
  }
  li{
    background: rgb(33, 35, 39);
  }
}
</style>
