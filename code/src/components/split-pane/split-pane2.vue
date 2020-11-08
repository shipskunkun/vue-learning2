<!--
思考各种距离：
中间的间隔默认有宽度，为10, 但是注意，不占总宽度，只是 z-index 比较高
所以是覆盖在 left 和 right 中间

trigger 的 left = leftOffsetPercent - 自身宽度的一半

left, 宽度假如50%算
right, 宽度， 100% - left


calc 如何计算？当有百分号的时候如何和数值一起计算？
calc(100% - 100px); 但是记住，我们需要的是字符串
注意给，style 直接赋值的，后面肯定是个字符串
动态绑定 style 时候，必须使用驼峰模式，不能写 padding-left, 而是 paddingLeft
R


问题：
如何处理鼠标行为？
梳理：开始不能移动，当鼠标按下去的时候，可以移动
此时，leftOffsetPercent = 中间div相对父亲左侧的距离
mousemove 的时候，就在改leftOffsetPercent 值
mouseup的时候，停止移动


如何获取，鼠标距离，中间div 左侧的距离？
我们可以拿到鼠标，距离outer 左侧的距离，定义为 initOffset

event.srcElement， 对于生成事件的 Window 对象、Document 对象或 Element 对象的引用。


.sync 的使用，为了在子组件中更新父组件传入的值
this.$emit("update: ***", newValue)

几种距离之间的差异：
offsetLeft offsetX pageX  clientX的差异

首先，X是event才有的
offsetLeft， 是 event所在区域的div，相对于父元素的距离
offsetX， 是事件元素相对于父元素的距离
当没有滚动条的时候，pageX 和 clientX 是一样的

设置 scrollLeft 
记住，是给 document设置的，不是给元素设置的
-->
<template>
    <div class="split-pane-wrapper" ref="outer">
        <div class="pane pane-left" :style= "{ width: leftOffsetPercent}">
            <slot name="left"></slot>
        </div>

        <div class="pane-trigger-con" @mousedown="handleMousedown" :style="{ left: triggerLeft, width: `${triggerWidth}px` }"></div>

        <div class="pane pane-right" :style= "{left: leftOffsetPercent}"> 
            <span>坤华测试</span>
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script >
export default {
  name: 'SplitPane',
  props: {
    value: {
      type: Number,
      default: 0.5
    },
    triggerWidth: {
      type: Number,
      default: 10
    },
    min: {
      type: Number,
      default: 0.1
    },
    max: {
      type: Number,
      default: 0.9
    }
  },
  data () {
    return {
      canMove: false,
      initOffset: 0
    }
  },
  computed: {
    leftOffsetPercent () {
      // 返回的是字符串
      return `${this.value * 100}%`
    },
    triggerLeft () {
      return `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)`
    }
  },
  methods: {
    handleMousedown(event) {
      //按需鼠标的时候，鼠标距离浏览器左边 - 中间长方形到浏览器左侧位置 = 鼠标点到拖动长方形左边的距离  

      document.addEventListener('mousemove', this.handleMousemove)
      document.addEventListener('mouseup', this.handleMouseup) 
      this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left
      // 其实这里作者写复杂了，直接使用 offsetX 就能拿到

      console.log('this.initOffset', event.clientX, event.offsetX , event.srcElement.offsetLeft, event.pageX, this.initOffset)
      //180 5 175 180 5

      this.canMove = true
    },
    handleMousemove(event) {
      if(! this.canMove) return
        // 现在点到左边的距离 - （开始状态下点到左边的距离 - 左边区域宽度）
      const outerRect = this.$refs.outer.getBoundingClientRect()

      // (event.pageX - this.initOffset + this.triggerWidth / 2 - outerRect.left) / outerRect.width

      let leftOffsetPercent = (event.pageX - this.initOffset + this.triggerWidth / 2 - outerRect.left) / outerRect.width

      // 到底怎么来的？其实是为了拿到，

      if (leftOffsetPercent < this.min) leftOffsetPercent = this.min
      if (leftOffsetPercent > this.max) leftOffsetPercent = this.max
      // this.$emit('input', offsetPercent)
      this.$emit('update:value', leftOffsetPercent)
      this.canMove = true
    },
    handleMouseup() {
      this.canMove = false
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
