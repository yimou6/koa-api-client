<template>
    <div id="salid-play">
        <!-- 滑动轮播图组件 -->
        <div class="lunbo-box" @mouseover="mouseOver" @mouseleave="mouseLeave">
            <button class="left-btn" @click="leftSlide">left</button>
            <button class="right-btn" @click="rightSlide">right</button>
            <template v-for="(item, index) in imgList" >
                <transition :name="transitionName" :key="index">
                    <img :src="item.imgPath" v-show="index === current">
                </transition>
            </template>
            <!-- 轮播盒子上的图片标题 -->
            <div class="img-title">
                <template v-for="(item, index) in imgList" >
                    <span v-show="index === current" :key="index">{{item.title}}</span>
                </template>
            </div>
            <!-- 轮播盒子上的切换圆点 -->
            <div class="round-dot">
                <template v-for="(item, index) in imgList">
                    <i :class="{active: index === current}" @click="curr(index)" :key="index"></i>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 轮播图片列表
            imgList: [
                {title:"img1",imgPath: './images/showphone0.jpg'},
                {title:"img2",imgPath: './images/showphone1.jpg'},
                {title:"img3",imgPath: './images/showphone2.jpg'},
                {title:"img4",imgPath: './images/showphone3.jpg'},
                {title:"img5",imgPath: './images/showphone4.jpg'},
                {title:"img6",imgPath: './images/showphone5.jpg'},
                {title:"img7",imgPath: './images/showphone6.jpg'},
            ],
            transitionName: 'slide-left',
            // 当前下标
            current: 0,
            // 自动定器
            autoTimer: '',
        }
    },
    computed: {
        // showList最大索引
        maxIndex() {
            return this.imgList.length-1;
        }
    },
    methods: {
        leftSlide() {
            this.transtionName = "slide-left";
            if (this.current == 0) {
                this.current = this.maxIndex;
            } else {
                this.current--;
            }
        },
        rightSlide() {
            this.transtionName = "slide-right";
            if (this.current == this.maxIndex) {
                this.current = 0;
            } else {
                this.current++;
            }
        },
        curr(index) {
            this.current = index;
        },
        mouseOver() {
            clearInterval(this.autoTimer)
        },
        mouseLeave() {
            this.timer();
        },
        timer() {
            this.autoTimer = setInterval(() => {
                this.transitionName = "slide-right";
                if (this.current == this.maxIndex) {
                    this.current = 0;
                } else {
                    this.current++;
                }
            },2000);
        }
    },
    mounted() {
        this.timer();
    }
}
</script>

<style scoped>
    #salid-play {
        margin: 0;
        padding: 0;
    }
    .lunbo-box {

        /* margin-left: 55%; */
        margin: 0 auto;
        margin-top: 20px;
        position: relative;
        width: 500px;
        height: 300px;
        overflow: hidden;
        
        border: 1px solid #ccc;
    }
    .lunbo-box img {
        position: absolute;
        top: 0;
        left: 0;
        width: 500px;
        height: 300px;
        z-index: 99;
    }
    
    .left-btn {
      position: absolute;
      left: 20px;
      top: 140px;
      z-index: 100;
    }

    .right-btn {
      position: absolute;
      right: 20px;
      top: 140px;
      z-index: 100;
    }

    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition: all 2s ease;
    }
    .slide-left-enter {
        transform: translateX(500px);
    }
    .slide-left-leave-to {
        transform: translateX(-500px);
    }
    .slide-right-enter {
        transform: translateX(-500px);
    }
    .slide-right-leave-to { 
        transform: translateX(500px);
    }
    .img-title {
        position: absolute;
        bottom: 0;
        width: 500px;
        height: 50px;
        background-color: rgba(0,0,0,.5);
        color: pink;
        line-height: 50px;
        text-align: center;
        z-index: 100;
    }
    .round-dot {
        position: absolute;
        float: right;
        z-index: 1000;
    }
    i {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #ccc;
        border-radius: 50%;
        margin: 0 5px;
    }
    .active {
        background-color: aqua;
    }
</style>