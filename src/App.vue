<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
ul,ol {
  list-style: none;
}
.container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
.el-menu--horizontal,
.el-menu--horizontal>.el-menu-item,
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none!important;
}
</style>
