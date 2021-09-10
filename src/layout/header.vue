<template>
  <div class="app-header">
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
  }
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.app-header{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: rgb(22, 21, 34);
  z-index: 99;
}
</style>
