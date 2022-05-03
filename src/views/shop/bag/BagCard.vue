<template>
  <div class="bag-warp" :class="{ 'selected': selected }">
    <div class="bag-selected">
      <el-checkbox v-model="selected" size="medium" @change="handleChange"></el-checkbox>
    </div>
    <div class="bag-img-warp">
      <div class="bag-view-img" :style="{ backgroundImage: `url('${activeImg}')` }"></div>
      <div class="bag-view-bar">
        <span v-for="(img, index) of goodInfo.good_img"
              :key="img"
              :style="{ backgroundImage: `url('${img}')` }"
              :class="active === index ? 'active' : ''"
              @click="active = index"></span>
      </div>
    </div>
    <div class="bag-content">
      <div class="good-name">{{ goodInfo.good_name }}</div>
      <div class="good-desc">{{ goodInfo.good_desc }}</div>
      <div class="good-price">
        <img src="@/assets/images/rmb.png" alt="¥">
        {{ goodInfo.price }}
      </div>
      <div class="good-num">
        <el-input-number size="mini"
                         v-model="num"
                         :min="0"
                         @change="handleChange"></el-input-number>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'BagCard',
  props: {
    goodInfo: Object,
    value: Boolean,
    number: Number
  },
  data() {
    return {
      active: 0,
      selected: this.value,
      num: this.number
    }
  },
  computed: {
    activeImg() {
      return this.goodInfo.good_img[this.active]
    }
  },
  methods: {
    handleChange() {
      console.log('change', {
        number: this.num,
        good_ig: this.goodInfo.id,
        selected: this.selected
      });
      this.$emit('change', {
        number: this.num,
        good_id: this.goodInfo.id,
        selected: this.selected
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bag-warp {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
  box-sizing: border-box;
  border: 1px solid transparent;
  padding: 12px;
  overflow: hidden;
  &.selected {
    border-color: #333333;
  }
  .bag-selected {
    position: absolute;
    top: 15px;
    right: 15px;
  }
  .bag-img-warp {
    float: left;
    width: 180px;
    height: 100%;

    .bag-view-img {
      width: 100%;
      height: 180px;
      background-color: #666666;
      background-position: 50% 50%;
      background-size: cover;
      border: 1px solid #dddddd;
      margin-bottom: 8px;
      box-sizing: border-box;
    }
    .bag-view-bar {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        width: 40px;
        height: 40px;
        background-color: #666666;
        background-position: 50% 50%;
        background-size: cover;
        border: 1px solid #dddddd;
        box-sizing: border-box;
      }
      span + span {
        margin-left: 10px;
      }
      span.active, span:hover {
        border-color: #f15c5c;
      }
    }
  }
  .bag-content {
    margin-left: 180px;
    padding-left: 20px;
    height: 100%;

    .good-name {
      font-size: 18px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 10px;
    }

    .good-desc {
      font-size: 15px;
      color: #404040;
      margin-bottom: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
<style lang="scss">
.good-num {
  margin-top: 10px;
}
</style>