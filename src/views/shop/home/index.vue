<template>
  <div class="home container">
    <el-carousel height="400px" :autoplay="true" :initial="5000">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <div class="banner-warp">
          <div class="banner-img" :style="{ backgroundImage: `url('${item.banner_img}')` }"></div>
          <div class="banner-content">
            <h3>{{ item.good_name }}</h3>
            <p>{{ item.good_desc }}</p>
            <div>
              <button>查看</button>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <el-row class="goods-warp">
      <el-col class="goods-warp-item" :xs="24" :sm="12" :md="8" v-for="good of goodList" :key="good.id">
        <good-card :images="good.good_img"
                   :good-name="good.good_name"
                   :good-desc="good.good_desc"
                   :good-id="good.id"
                   :price="good.price"></good-card>
      </el-col>
      <el-col class="goods-warp-item" :xs="24" :sm="12" :md="8" v-for="item of emptyCard" :key="item">
        <good-card empty></good-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import GoodCard from './GoodCard'
import { debounce } from 'lodash'
export default {
  name: 'HomePage',
  components: { GoodCard },
  data() {
    const width = document.body.scrollWidth || document.body.clientWidth || document.body.offsetWidth
    return {
      bannerList: [],
      goodList: [],
      clientWidth: width
    }
  },
  computed: {
    // 使用空card补全商品列表
    emptyCard() {
      if (this.clientWidth > 768 && this.clientWidth < 992) {
        console.log('768', this.goodList.length % 2)
        return this.goodList.length % 2 === 0 ? 0 : 1
      }
      if (this.clientWidth > 992) {
        console.log('992', this.goodList.length % 3)
        return this.goodList.length % 3 === 0 ? 0 : 3 - this.goodList.length % 3
      }
      return 0
    }
  },
  mounted() {
    this.getList()
    this.__resize = debounce(() => {
      this.clientWidth = document.body.scrollWidth || document.body.clientWidth || document.body.offsetWidth
    }, 100)
    window.addEventListener('resize', this.__resize)
  },
  methods: {
    getList() {
      axios.post('/good', {
        pageNum: 1,
        pageSize: 100
      }).then(res => {
        const { code, data = [] } = res
        if (code === 0) {
          data.forEach(item => {
            if (item.banner) {
              this.bannerList.push(item)
            } else {
              this.goodList.push(item)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  margin-top: 20px;
}


.banner-warp {
  height: 100%;
  position: relative;
  overflow: hidden;
  .banner-img {
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .banner-content {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(50px);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h3 {
      font-size: 22px;
      font-weight: bold;
      color: #ffffff;
      padding-left: 10px;
      margin: 0;
    }

    p {
      font-size: 14px;
      color: #797979;
      display: block;
      margin: 0;
    }

    button {
      display: inline-block;
      color: #333333;
      outline: none;
      border: 1px solid #333333;
      background-color: transparent;
      border-radius: 2px;
      padding: 6px 16px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: #333333;
        color: #ffffff;
      }
    }
  }


  @media screen and (min-width: 375px){
    .banner-content {
      width: 100%;
      height: 25%;
      bottom: 0;
      top: auto;
      left: 0;
      right: auto;
      flex-direction: row;
      justify-content: space-evenly;
      p {
        display: none;
      }
    }
  }
  @media screen and (min-width: 900px){
    .banner-content {
      bottom: 0;
      top: auto;
      left: auto;
      right: 0;
      width: 45%;
      height: 100%;
      flex-direction: column;
      justify-content: space-evenly;
      p {
        display: block;
      }
    }
  }
}

.goods-warp {
  margin: 20px auto 50px;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
}
</style>