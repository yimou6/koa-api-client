<template>
  <div id="show-phone">

    <div id="showphone-content">
      <div class="showphone-content-left">
        <div class="content-left-header">
          <template v-for="(item, index) in test">
            <img
              :src="test[current]"
              alt=""
              :key="index"
              v-show="index === current"
            />
          </template>
        </div>
        <div class="content-left-footer">
          <i class="iconfont icon-arrow-left" @click="arrowLeft"></i>
          <ul>
            <li v-for="(item, index) in test" :key="index">
              <img :src="test[index]" @mouseover="changeItem(index)" />
            </li>
          </ul>
          <i class="iconfont icon-arrow-right" @click="arrowRight"></i>
        </div>
      </div>
      <div class="showphone-content-right">
        <div class="content-right-header">
          <i><img src="../../../assets/images/jpphone.png" alt="" /></i>
          <span>{{ showInformation.good_desc }}</span>
        </div>
        <div class="content-right-middle">
          <div class="item-header">
            <i class="iconfont icon-dingshi"></i>
            <span>商城秒杀</span>
          </div>
          <div class="item-middle">
            <div class="seckill">
              <ul>
                <li>秒杀价</li>
                <li>￥</li>
                <li>{{ showInformation.price }}</li>
                <li>累计评论: 100+</li>
              </ul>
            </div>
            <div class="promote">
              <ul>
                <li>当前库存: {{ showInformation.stock }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content-right-footer">
          <div class="shopcar">
            <input
              v-model.number="num"
              @blur="chushiNum"
              @mouseleave="chushiNum"
              maxlength="4"
            />
            <button
              class="jia"
              :class="btnClass"
              @click="addNum"
              @mouseover="forbid2"
            >
              +
            </button>
            <button
              class="jian"
              :class="btnClass"
              @click="reduceNum"
              @mouseover="forbid"
            >
              -
            </button>
            <button>加入购物车</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  name: "PhoneShow",
  data() {
    return {
      current: 0,
      // 用来保存展示图片 也就是goodImages
      test: [],
      // 用来保存展示信息
      showInformation: {},
      // 购物车初始数量
      num: 1,
      // 初始数量为 1 或 最大库存时 按钮状态
      btnClass: {
        isForbid: true,
        isAllow: true,
      },
    };
  },
  mounted() {
    this.getGoodInfo(this.$route.params.id);
    // console.log(this.getGoodInfo(this.$route.params.id))
  },
  methods: {
    changeItem(index) {
      this.current = index;
    },
    arrowLeft() {
      // 向左滑 设置ul中的margin-left的值
      //
      // this.changeClass.marginLeft = "200px"
      // this.animate.animation = !this.animate.animation
    },
    arrowRight() {
      // 向右滑
      // this.changeClass.marginLeft = "-400px"
    },
    getGoodInfo(id) {
      axios
        .get("/mall/good", {
          params: {
            id,
          },
        })
        .then((response) => {
          const { good_name } = response.result
          this.$store.commit('SET_TITLES', [good_name])
          this.test = response.result.goodImages;
          this.showInformation = response.result;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    toZhuye() {
      this.$router.push("/");
    },
    // btn +
    addNum() {
      if (this.num > 0 && this.num < this.showInformation.stock) {
        this.num++;
      }
    },
    // btn -
    reduceNum() {
      if (this.num > 1 && this.num <= this.showInformation.stock) {
        this.num--;
      } else {
        // this.btnClass.isForbid = true;
        this.btnClass.isAllow = false;
      }
    },
    forbid() {
      if (this.num == 1) {
        this.btnClass.isForbid = true;
        this.btnClass.isAllow = false;
      } else {
        this.btnClass.isAllow = true;
      }
    },
    forbid2() {
      if (this.num >= this.showInformation.stock) {
        this.btnClass.isAllow = false;
        this.btnClass.isForbid = true;
      } else {
        this.btnClass.isAllow = true;
      }
    },
    chushiNum() {
      if (
        this.num < 1 ||
        this.num > this.showInformation.stock ||
        typeof this.num !== "number"
      ) {
        this.num = this.showInformation.stock;
      }
    },
  },
};
</script>

<style scoped>
.isForbid {
  cursor: not-allowed;
}
.isAllow {
  cursor: pointer;
}
i {
  font-style: normal;
}
ul {
  padding: 0;
}

/* header */
.header {
  width: 100%;
  height: 40px;
  background-color: #e3e4e5;
}
.header-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: pink;
}
.header-register,
.header-islogin {
  margin-left: 12px;
  font-size: 12px;
}
.header-islogin {
  color: #999999;
}




#show-phone {
  margin: 0 auto;
  width: 100vw;
}
#showphone-nav {
  height: 44px;
  background-color: #eee;
}
.showphone-nav-left,
.showphone-nav-right {
  width: 50%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 14px;
}
.showphone-nav-left {
  float: left;
}
.showphone-nav-right {
  float: right;
}
.showphone-nav-left span,
.showphone-nav-right a {
  color: #666666;
}
.showphone-nav-left i,
.showphone-nav-left a {
  margin-right: 10px;
  cursor: pointer;
}
.showphone-nav-right a {
  margin-right: 10px;
  cursor: pointer;
}
.showphone-nav-right i {
  margin: 0 4px;
  cursor: pointer;
}
.showphone-nav-right a:first-child {
  background-color: #e4393c;
  color: #fff;
}
.showphone-nav-right a:nth-child(2) {
  font-size: 13px;
}
.showphone-nav-right a:last-child {
  margin-right: 30px;
}
#showphone-content {
  margin: 0 auto;
  width: 80%;
  height: 100%;
  overflow: hidden;
}
.showphone-content-left {
  float: left;
  margin-top: 10px;
  width: 38%;
  height: 100%;
}
.content-left-header {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
}
.content-left-header img {
  width: 100%;
  height: 100%;
}
.content-left-footer {
  position: relative;
  height: 100px;
  background-color: #eee;
  overflow: hidden;
}
.content-left-footer i:first-child {
  position: absolute;
  top: 14px;
  left: -20px;
  font-size: 70px;
  color: #ccc;
}
.content-left-footer i:last-child {
  position: absolute;
  top: 14px;
  right: -20px;
  font-size: 70px;
  color: #ccc;
}
.content-left-footer ul {
  margin: 20px 0 0 0;
  padding: 0;
  width: 680px;
  height: 56px;
  /* background-color: pink; */
  transition: 0.5s linear;
}
.content-left-footer ul li {
  float: left;
  margin-right: 15px;
  width: 58px;
  height: 56px;
  text-align: center;
  line-height: 56px;
  box-sizing: border-box;
  background-color: #ccc;
}
.content-left-footer ul li:first-child {
  margin-left: 58px;
}
.content-left-footer ul li img {
  width: 100%;
  height: 100%;
}
.content-left-footer ul li:hover {
  border: 2px solid #e43949;
}
.showphone-content-right {
  float: right;
  margin-top: 10px;
  padding: 15px 0 0 5px;
  width: 61%;
  height: 100%;
  box-sizing: border-box;
}
.content-right-header i {
  margin-right: 4px;
  vertical-align: middle;
}
.content-right-header span {
  font-size: 16px;
  color: #666666;
}
.content-right-middle {
  font-size: 14px;
}
.item-header {
  margin-top: 10px;
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: left;
  background-image: linear-gradient(to right, #ff9000, #fe0851);
  color: #fff;
}
.item-header i {
  margin: 0 5px 0 8px;
  font-size: 26px;
}
.item-header span {
  display: inline-block;
  margin-bottom: 10px;
  height: 36px;
  width: 47%;
  box-sizing: border-box;
  font-size: 14px;
  vertical-align: middle;
}
.item-header span:last-child {
  padding-right: 10px;
  text-align: right;
  color: #666;
}
.item-middle {
  padding: 10px;
  height: 200px;
  border: 1px solid #ccc;
  background-color: #eee;
}
.seckill {
  text-align: left;
  height: 40px;
  line-height: 40px;
}
.seckill ul {
  margin: 0;
  padding: 0;
}
.seckill ul li {
  float: left;
  margin-right: 10px;
  height: 40px;
  text-align: center;
}
.seckill ul li:nth-child(2) {
  margin-right: 1px;
  color: #e43949;
}
.seckill ul li:nth-child(3) {
  cursor: pointer;
  font-size: 26px;
  color: #e43949;
}
.seckill ul li:last-child {
  float: right;
  margin-right: 20px;
  padding-left: 10px;
  border-left: 1px solid #ccc;
  cursor: pointer;
  color: skyblue;
}
.promote {
  margin-top: -14px;
}
.promote ul {
  padding: 0;
}
.promote ul li {
  margin-top: 5px;
  font-size: 12px;
  height: 20px;
}
.promote-footer {
  height: 50px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
.content-right-footer {
  margin-top: 5px;
  height: 350px;
  border-radius: 3px;
  border: 1px solid #ccc;
}
.choice-type ul {
  padding: 0 0 0 10px;
}
.choice-type ul li {
  margin-bottom: 18px;
}
.choice-type ul li span {
  margin-right: 20px;
  font-size: 14px;
  color: #999999;
}
.choice-type ul li i {
  display: inline-block;
  padding: 5px;
  height: 24px;
  line-height: 24px;
  margin-right: 8px;
  color: black;
  font-size: 12px;
  border: 1px solid #999;
}
.choice-type ul li i:hover {
  border-color: #e43949;
}
.shopcar {
  position: relative;
  margin-left: 10px;
  height: 50px;
  /* background-color: pink; */
}
.shopcar input {
  float: left;
  margin-right: 35px;
  width: 60px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border: 1px solid #eee;
  /* background-color: blue; */
}
.jia,
.jian {
  position: absolute;
  top: 0;
  left: 62px;
  width: 25px;
  height: 26px;
  border: none;
}
.jian {
  top: 26px;
  border-top: 1px solid #ccc;
}
.shopcar button:last-child {
  width: 120px;
  height: 50px;
  border: 0;
  background-color: #df3033;
  font-size: 18px;
  color: #fff;
}
</style>
