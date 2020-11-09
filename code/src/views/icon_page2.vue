<template>
  <div>
   <!--  <myicon :class="icon-shouye5" :style="{color:blue, size: 50 }"></myicon> -->
   <my-icon icon="shouye5" :size="40" color="red"></my-icon>
   <my-svg icon="shouye5" :size="50"></my-svg>
    <!-- <icon-font icon="shouye3" :size="50" color="blue"></icon-font>
    <icon-svg icon="zhuye-" :size="100"></icon-svg> -->
  </div>
</template>

<script>
import MyIcon from '_c/icon-font'
import MySvg from '_c/icon-svg'
export default {
  components: {
    MyIcon,
    MySvg
  }
}
</script>

<style>
.smile{
  color: red;
}
</style>
