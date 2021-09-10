<template>
  <div class="layout">
    <Header />
    <SideMenu />
    <AppMain />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AppMain from './appMain.vue'
import Header from './header.vue'
import SideMenu from './sideMenu.vue'

@Options({
  components: {
    AppMain,
    Header,
    SideMenu
  }
})
export default class Layout extends Vue {}
</script>
