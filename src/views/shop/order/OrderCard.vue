<template>
  <div class="order-card">
    <div class="order-important">
      <div class="order-num">
        <span>{{ info.order_number }}</span>
        <span>{{ info.createdAt }}</span>
      </div>
      <span>¥{{ info.total }}</span>
    </div>
    <div class="order-good" v-for="item of info.goods_info" :key="item.id">
      <span>{{ item.good_info.good_name }}</span>
      <span>{{ item.good_info.good_desc }}</span>
      <span>¥{{ item.good_info.price }}</span>
      <span> x {{ item.number }}</span>
    </div>
    <div class="order-btn">
      <el-button size="mini" type="danger" v-if="status === '0'" @click="handleUpdateStatus(info.id, 4)">取消订单</el-button>
      <el-button size="mini" type="success" v-if="status === '0'" @click="handleUpdateStatus(info.id, 1)">去支付</el-button>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  name: 'OrderCard',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    status: {
      type: String,
      default: '0'
    }
  },
  computed: {
    info: function () {
      const { goods_info, ...other } = this.data
      return {
        ...other,
        goods_info: JSON.parse(goods_info)
      }
    }
  },
  methods: {
    handleUpdateStatus(id, status) {
      axios.patch('/order', { id, status }).then(res => {
        const { code } = res
        if (code === 0) {
          if (status === 1) this.$message.success('订单支付成功')
          else this.$message.success('订单取消成功')
          this.$emit('refresh')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.order-card {
  margin-bottom: 20px;
}
.order-important {
  border-bottom: 1px solid #eaeaea;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .order-num {
    span:nth-child(1) {
      font-weight: bold;
      font-size: 16px;
    }
    span:nth-child(2) {
      font-weight: lighter;
      font-size: 14px;
      padding-left: 10px;
    }
  }
  & > span:nth-child(2) {
    font-weight: normal;
    font-size: 14px;
    color: #f15c5c;

  }
}
.order-good {
  padding: 10px 0 0;
  span:nth-child(1) {
    font-size: 16px;
    font-weight: bold;
    color: #404040;
  }
  span:nth-child(2) {
    font-size: 14px;
    color: #404040;
    padding-left: 20px;
  }
  span:nth-child(3) {
    font-size: 14px;
    font-weight: bold;
    color: #f15c5c;
    padding-left: 20px;
  }
  span:nth-child(4) {
    font-weight: lighter;
    font-size: 14px;
    color: #404040;
  }
}
.order-btn {
  padding-top: 20px;
  text-align: right;
}
</style>