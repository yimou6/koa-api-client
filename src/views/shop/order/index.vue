<template>
  <div class="container">
    <el-tabs v-model="active">
      <el-tab-pane name="0" label="待支付"></el-tab-pane>
      <el-tab-pane name="1" label="已支付"></el-tab-pane>
      <el-tab-pane name="2" label="已发货"></el-tab-pane>
      <el-tab-pane name="3" label="已签收"></el-tab-pane>
      <el-tab-pane name="4" label="已取消"></el-tab-pane>
    </el-tabs>

    <order-list :status="active"></order-list>
  </div>
</template>

<script>
import OrderList from './OrderList'
export default {
  name: 'MallOrder',
  components: { OrderList },
  data() {
    return {
      active: '0'
    }
  }
}
</script>

<style scoped>

</style>