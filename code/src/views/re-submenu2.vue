<!--
对于最外层的 a-menu
如果有没有孩子，直接使用 a-menu-item
如果有，可能是个递归组件，我们把当前 item {} 传给递归组件


接受的参数：
(item, index)

list:
[{
  title: '1111'
  },
  {
    title: '2222'
  },
  {
    title: '3333',
    children: [
      {
        title: '3333-1'
      },
      {
        title: '3333-2',
        children: [
          {
            title: '3333-2-1'
          },
          {
            title: '3333-2-2'
          },
          {
            title: '3333-2-3',
            children: [
              {
                title: '3333-2-3-1'
              },
              {
                title: '3333-2-3-2'
              }
            ]
          }
        ]
      }
    ]

遇到的问题：
a-menu-item  和  item.title 怎么放置？

第一次写失败的原因是什么？
没有用到a-submenu，封装的方法，点击显示子组件等
-->

<!-- <template>
  <div>
    <a-menu-item>
      <slot name="title"> {{ parent.title }}</slot>
      <span class="shrink-icon" :style="{ transform: `rotateZ(${showChild ? 0 : 180}deg)` }">^</span>
    </a-menu-item>
    <template v-for="(item, i) of parent.children">
      <a-menu-item v-if="!item.children" :key="`menu_item_${index}_${i}`">{{ item.title }}</a-menu-item>
      <re-submenu v-else :key="`menu_item_${index}_${i}`" :parent="item" :index="i">
      </re-submenu>
    </template>
  </div>
</template> -->

<template>
   <a-submenu>
    <!-- 这个被放到头中 -->
    <div slot="title">{{ parent.title }}</div>
    
    <!-- 这个补充showChild 中的slot -->
    <template v-for="(item, i) of parent.children">
      <a-menu-item v-if="!item.children" :key="`menu_item_${index}_${i}`">{{ item.title }}</a-menu-item>
      <re-submenu v-else :key="`menu_item_${index}_${i}`" :parent="item" :index="i">
      </re-submenu>
    </template>
  </a-submenu>
</template>

<script>
import menuComponents from '_c/menu'
const { AMenuItem, ASubmenu } = menuComponents
export default {
  name: 'ReSubmenu',
  components: {
    AMenuItem,
    ASubmenu
  },
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    index: Number
  }
}
</script>
