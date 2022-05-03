<template>
  <div>
    <order-card v-for="item of orderList" :key="item.id" :data="item" :status="status" @refresh="getList"></order-card>
    <el-empty v-if="orderList.length === 0"></el-empty>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import OrderCard from './OrderCard'
export default {
  name: 'OrderList',
  components: { OrderCard },
  props: {
    status: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      orderList: [],
      total: 0
    }
  },
  watch: {
    status: function () {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      axios.post('/order', {
        pageNum: 1,
        pageSize: 100,
        status: Number(this.status)
      }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.orderList = data
          this.total = count
        }
      })
    }
  }
}
</script>

<style scoped>

</style>