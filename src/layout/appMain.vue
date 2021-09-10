<template>
  <div class="app-main-content">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
  }
})
export default class AppMain extends Vue {}
</script>

<style lang="scss" scoped>
.app-main-content{
  position: absolute;
  left: 250px;
  top: 50px;
  width: calc(100% - 250px);
  height: calc(100% - 50px);
  background-color: white;
}
</style>
