<template>
  <div class="container mall-bag">
    <template v-if="goodList.length > 0">
      <bag-card v-for="item of goodList"
                :key="item.id"
                :value="item.selected"
                :number="item.number"
                :good-info="item.good_info"
                @change="handleChange($event, item.id)" />

      <div class="user-addr">
        <el-select v-model="address_id">
          <el-option v-for="addr of addressList" :key="addr.id" :value="addr.id" :label="addr.consignee"></el-option>
        </el-select>
        <div class="user-addr-consignee">{{ addressInfo.consignee }} / {{ addressInfo.phone }}</div>
        <div class="user-addr-address">{{ addressInfo.address }}</div>
      </div>
      <div class="good-price total-price">
        <img src="@/assets/images/rmb.png" alt="¥">
        {{ totalPrice }}
      </div>
      <div class="buy-btn">
        <el-button size="medium" @click="handleSubmit" :disabled="totalPrice === 0">去付款</el-button>
      </div>
    </template>
    <el-empty v-else></el-empty>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import BagCard from './BagCard'
export default {
  name: 'MallBag',
  components: { BagCard },
  data() {
    return {
      goodList: [],
      address_id: '',
      addressList: []
    }
  },
  watch: {
    '$store.getters.address': {
      immediate: true,
      deep: true,
      handler: function (val) {
        if (val.length > 0) {
          let temp = val.find(it => it.is_default)
          this.address_id = temp ? temp.id : val[0].id
        } else {
          this.address_id = ''
        }
        this.addressList = val
      }
    }
  },
  computed: {
    totalPrice: function () {
      let price = 0
      this.goodList.forEach(good => {
        if (good.selected) {
          price = price + (good.good_info.price * good.number)
        }
      })
      return price
    },
    addressInfo() {
      return this.addressList.find(item => item.id === this.address_id)
    }
  },
  mounted() {
    this.getGoodList()
  },
  methods: {
    getGoodList() {
      axios.get('/cart').then(res => {
        const { code, data } = res
        if (code === 0) {
          this.goodList = data
          this.$store.commit('SET_SHOP_CAR', {
            type: 'init',
            value: data
          })
        }
      })
    },
    handleChange({ number, good_id, selected }, id) {
      axios.patch('/cart', {
        good_id,
        number,
        selected
      }).then(res => {
        const { code } = res
        if (code === 0) {
          if (number === 0) {
            this.getGoodList()
          } else {
            this.$store.commit('SET_SHOP_CAR', {
              type: 'change',
              value: id,
              number,
              selected
            })
          }
        }
      })
    },
    handleSubmit() {
      if (this.totalPrice > 0) {
        const goods_info = this.goodList.filter(item => item.selected)
        axios.put('/order', {
          address_id: this.address_id,
          goods_info: JSON.stringify(goods_info),
          total: this.totalPrice
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$router.push({ path: '/order' })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.mall-bag {
  padding: 20px 0;
}
.good-price {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img {
    width: 24px;
    height: 24px;
    padding-bottom: 3px;
  }
  color: #f15c5c;
  font-size: 20px;
  font-weight: bold;
}
.total-price {
  justify-content: flex-end;
}
.buy-btn {
  text-align: right;
}
.user-addr {
  text-align: right;
  &-consignee {
    padding-top: 10px;
    font-size: 14px;
    color: #555555;
  }
  &-address {
    font-size: 13px;
    color: #666666;
    padding-bottom: 10px;
  }
}
</style>