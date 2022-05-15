<script>
import { ref } from 'vue'
const { ipcRenderer } = window.require('electron')
export default {
  name:'Layer',
  props:{
    pageTitle:{
      type:String,
      default:'老万录屏'
    }
  },
  setup(){
    const handleDrag = (pos) => {
      ipcRenderer.send('move-main', {
        baseX: pos.x,
        baseY: pos.y
      })
    }
    // 最小化
    const minWin = function () {
      ipcRenderer.send('mainWin:minimize')
    }
    // 最大化
    const isMax = ref(false)
    const maxWin = function () {
      if (isMax.value) {
        ipcRenderer.send('mainWin:restore')
      } else {
        ipcRenderer.send('mainWin:maximize')
      }
      isMax.value = !isMax.value
    }
    // 关闭
    const closeWin = function () {
      ipcRenderer.send('mainWin:close')
    }

    return {
      isMax,
      handleDrag,
      minWin,
      maxWin,
      closeWin
    }
  }
}
</script>
<template>
<div class="layer-wrapper">
  <div class="drag-header" v-mouse-drag="handleDrag">
    <div class="header-content">
      <div class="header-logo">
        <i class="icon"></i>
        <p class="title">{{pageTitle}}</p>
      </div>
      <div class="header-operate">
          <div class="btn-box" @click="minWin">
            <i class="icon min"></i>
          </div>
          <div class="btn-box" @click="maxWin">
            <i :class="['icon',isMax ? 'reset' : 'max']"></i>
          </div>
          <div class="btn-box" @click="closeWin">
            <i class="icon close"></i>
          </div>
        </div>
    </div>
  </div>
  <div class="layer-container">
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</div>
</template>
<style lang="scss" scoped>
.layer-wrapper{
  width:100%;
  height:100%;
  position:relative;
  .drag-header{
    width:100%;
    height:$header-height;
    background:$color-bg-theme;
    border-bottom:1px solid $color-border;
    .header-content{
      width:100%;
      height:100%;
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:0 20px;
    }
    .header-logo{
      display:flex;
      align-items:center;
      .icon{
        display:block;
        width:30px;
        height:30px;
        background:url('../assets/images/record-img.png') no-repeat center;
        background-size:contain;
        margin-right:10px;
      }
      .title{
        color:#fff;
        font-size:18px;
        font-weight:bold;
      }
    }
    .header-operate{
      display:flex;
      align-items:center;
      .btn-box{
        width: 30px;
        height: 30px;
        background: $color-header-bg;
        border: 1px solid $color-border;
        box-sizing: border-box;
        border-radius: 30px;
        margin-right: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .icon{
          display:block;
          width:12px;
          height:12px;
          &.min{
            background:url(../assets/images/min-icon.png) no-repeat center;
            background-size:contain;
          }
          &.max{
            background:url(../assets/images/max-icon.png) no-repeat center;
            background-size:contain;
          }
          &.reset{
            background:url(../assets/images/reset-icon.png) no-repeat center;
            background-size:contain;
          }
          
          &.close{
            background:url(../assets/images/close-icon.png) no-repeat center;
            background-size:contain;
          }
        }
        &:hover{
          background:$color-border;
        }
      }
    }
  }
  .layer-container{
    position:absolute;
    width:100%;
    left:0;
    top:$header-height;
    bottom:0;
    .page-content{
      width:100%;
      height:100%;
      position:relative;
    }
  }
}
</style>