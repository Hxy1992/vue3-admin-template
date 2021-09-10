<template>
  <div class="app-side-menu">
    <el-menu
      default-active="1-4-1"
      class="side-menu"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="rgb(18, 13, 73)"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-sub-menu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template #title>分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>导航三</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const isCollapse = ref(false)
    const handleOpen = (key: string, keyPath: string) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string) => {
      console.log(key, keyPath)
    }
    return {
      isCollapse,
      handleOpen,
      handleClose
    }
  }
})
</script>

<style lang="scss" scoped>
.app-side-menu{
  position: absolute;
  left: 0;
  top: 50px;
  width: 250px;
  height: calc(100% - 50px);
  background-color: rgb(18, 13, 73);
  z-index: 9;
  .side-menu:not(.el-menu--collapse) {
    width: 100%;
  }
  // ::v-deep .el-menu{
  //   color: white;
  //   background-color: rgb(18, 13, 73);
  //   .el-menu-item{
  //     color: white;
  //   }
  //   .el-menu-item-group__title{
  //     color: white;
  //   }
  // }
}
</style>
