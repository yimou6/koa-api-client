<template>
  <div class="layout">
    <header-bar />
    <router-view class="layout-content" />
    <footer-bar />
  </div>
</template>

<script>
import HeaderBar from './HeaderBar'
import FooterBar from './FooterBar'
export default {
  name: 'LayoutPage',
  components: { HeaderBar, FooterBar }
}
</script>

<style scoped>
.layout {
  height: 100%;
}
.layout-content {
  min-height: calc(100% - 394px);
}
</style>