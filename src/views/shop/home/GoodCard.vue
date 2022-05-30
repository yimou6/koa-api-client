<template>
  <div class="good-card">
    <div class="good-empty" v-if="empty"></div>
    <template v-else>
      <div class="good-img">
        <img v-lazy="images[activeImageIndex]" alt="img">
      </div>
      <div class="good-info">
        <div class="good-name">{{ goodName }}</div>
        <div class="good-desc">{{ goodDesc }}</div>
        <div class="good-footer">
          <div class="good-price">
            <img src="./rmb.png" alt="¥">
            {{ price }}
          </div>
          <el-badge v-if="goodNumber > 0" :value="goodNumber">
            <button @click="handleAddCar">{{ $t('text.addCar') }}</button>
          </el-badge>
          <button v-else @click="handleAddCar">{{ $t('text.addCar') }}</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  name: 'GoodCard',
  props: {
    images: {
      type: Array,
      default: () => ([])
    },
    goodName: {
      type: String,
      default: '-'
    },
    goodDesc: {
      type: String,
      default: '-'
    },
    price: {
      type: Number
    },
    goodId: Number,
    empty: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeImageIndex: 0
    }
  },
  computed: {
    goodNumber: function () {
      const temp = this.$store.getters.shopCar.find(it => it.good_id === this.goodId)
      return temp ? temp.number : 0
    }
  },
  methods: {
    handleAddCar() {
      axios.patch('/cart', {
        good_id: this.goodId,
        number: this.goodNumber + 1
      }).then(res => {
        const { code } = res
        if (code === 0) {
          this.$store.commit('SET_SHOP_CAR', {
            type: 'change',
            value: this.goodId,
            number: this.goodNumber + 1
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.good-card {
  width: 100%;
  border-top: 1px solid #f0f0f0;
  border-left: 1px solid #f0f0f0;
  box-sizing: border-box;
  .good-empty {
    height: 431px;
  }

  .good-img {
    width: 100%;
    height: 320px;
    //background-color: #dddddd;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 200px;
      height: 200px;
    }
  }

  .good-info {
    padding: 0 10px 10px;
    height: 90px;
  }

  .good-name {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    margin: 10px auto 4px;
    height: 26px;
  }

  .good-desc {
    font-size: 15px;
    color: #404040;
    margin-bottom: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .good-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

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

    button {
      outline: none;
      background: transparent;
      color: #404040;
      font-size: 14px;
      border: 1px solid #404040;
      border-radius: 2px;
      padding: 4px 14px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        background-color: #404040;
        color: #ffffff;
      }
    }
  }

}
</style>