<template>
    <div class="split-pane-wrapper">
        <div class="pane pane-left" :style= { width: `${this.leftOffsetPercent}`>
            <slot name="left"></slot>
        </div>
        <div class="pane pane-right" :style= {left: `${this.leftOffsetPercent}`>
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script >
export default {
  name: 'split-pane',
  props: {
    offset: {
      type: Number,
      default: 0.5
    }
  },
  data () {
    return {

    }
  },
  computed: {
    leftOffsetPercent () {
      // 返回的是字符串
      return `${this.offset * 100}%`
    }
  }
}
</script>
<style lang="less">
.split-pane-wrapper{
  height: 100%;
  width: 100%;
  position: relative;
  .pane{
    position: absolute;
    top: 0;
    height: 100%;
    &-left{
      // width: 30%;
      background: palevioletred;
    }
    &-right{
      right: 0;
      bottom: 0;
      background: paleturquoise;
    }
    &-trigger-con{
      height: 100%;
      background: red;
      position: absolute;
      top: 0;
      z-index: 10;
      user-select: none;
      cursor: col-resize;
    }
  }
}
</style>
