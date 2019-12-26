<template>
  <div class="et-picker" v-if="show">
    <div class="et-picker__mask" @click="sync?close():''">
    </div>
    <div class="et-picker__main">
      <div class="et-picker__title">
        <div class="et-picker__title__left"
             v-if="!sync"
             @click.stop="!sync?close():''">
          取消
        </div>
        <div class="et-picker__title__mid">
          {{title}}
        </div>
        <div class="et-picker__title__right"
             v-if="!sync" @click.stop="!sync?ok():''">
          确定
        </div>
      </div>
      <div class="et-picker__body">
        <div class="et-picker__bar"></div>
        <template v-for="(col,colIndex) in (listType>0?cList.length:1)">
          <div :key="colIndex"
               :ref="`swiper-${colIndex}`"
               class="swiper-container">
            <div class="swiper-wrapper">
              <template v-if="listType<2">
                <div class="swiper-slide"
                     :key="colIndex+''+rowIndex"
                     v-for="(row, rowIndex) in (listType>0?cList[colIndex]:cList)">
                  <div class="swiper-inner" @click="bindClick(colIndex,rowIndex)">{{row}}</div>
                </div>
              </template>
              <template v-else-if="listType === 2">
                <div class="swiper-slide"
                     :key="colIndex+''+rowIndex"
                     v-for="(row, rowIndex) in cList[colIndex]">
                  <div class="swiper-inner" @click="bindClick(colIndex,rowIndex)">{{row}}</div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'

  export default {
    name: "et-picker",
    props: {
      //值
      value: {
        type: [String, Array]
      },
      show: {
        type: Boolean,
        default: false,
      },
      //类型，不填/normal普通，license车牌，date日期，·time时间
      type: {
        type: String,
        default: "normal"
      },
      //是否同步
      sync: {
        type: Boolean,
        default: false,
      },
      //数据
      list: {
        type: Array,
      },
      //标题
      title: {
        type: String,
      }
    },
    data() {
      return {
        cList: [],
        listType: 0,//数据类型，0单列，1多列，2响应式
        swiperArr: [],
        swiperIndexArr: [],
        valueArr: [],
      }
    },
    mounted() {
      this.cList = this.list;
      if (this.cList) {
        if (typeof this.cList[0] === 'string') {
          this.listType = 0;
        } else if (this.cList[0] instanceof Array) {
          this.listType = 1;
        } else {
          this.listType = 2;
        }
      }
      if (this.listType === 0) {
        this.swiperIndexArr[0] = 0;
        this.cList.every((item, index) => {
          if (item == this.value) {
            this.swiperIndexArr[0] = index;
            return false;
          }
          return true;
        });
        this.valueArr = [this.value];
      } else if (this.listType === 1) {
        this.valueArr = this.value;
        this.cList.forEach((item, index) => {
          this.swiperIndexArr.push(0);
          item.every((item2, index2) => {
            if (item2 == this.value[index]) {
              this.swiperIndexArr[index] = index2;
              return false;
            }
            return true;
          });
        });
      } else if (this.listType === 2) {
        this.valueArr = this.value;
        this.cList = [];
        this.filterList(this.list);
        this.cList.forEach((item, index) => {
          this.swiperIndexArr.push(0);
          item.every((item2, index2) => {
            if (item2 == this.value[index]) {
              this.swiperIndexArr[index] = index2;
              return false;
            }
            return true;
          });
        });
      }

      if (this.show) {
        this.display();
      }
    },
    beforeDestroy() {
      this.swiperArr = [];
    },
    methods: {
      display() {
        setTimeout(() => {
          this.initSwiper();
        });
      },
      initSwiper() {
        let that = this;
        this.swiperArr = [];
        if (this.listType == 0) {
          this.swiperArr.push(new Swiper(this.$refs['swiper-0'], {
            initialSlide: that.swiperIndexArr[0],
            direction: 'vertical',
            centeredSlides: true,
            slidesPerView: 5,
            on: {
              slideChange: function () {
                that.swiperIndexArr[0] = this.activeIndex;
                that.valueArr[0] = that.cList[that.swiperIndexArr[0]];
                if (that.sync) {
                  that.syncValue();
                }
              }
            }
          }));
        } else if (this.listType == 1) {
          this.cList.forEach((item, index) => {
            this.swiperArr.push(new Swiper(this.$refs[`swiper-${index}`], {
              initialSlide: that.swiperIndexArr[index],
              direction: 'vertical',
              centeredSlides: true,
              slidesPerView: 5,
              on: {
                slideChange: function () {
                  that.swiperIndexArr[index] = this.activeIndex;
                  that.valueArr[index] = that.cList[index][that.swiperIndexArr[index]];
                  if (that.sync) {
                    that.syncValue();
                  }
                }
              }
            }));
          })
        } else {
          //TODO
          let init3 = () => {
            this.cList.forEach((item, index) => {
              if (this.swiperArr[index]) {
                this.swiperArr[index].update();
              } else {
                this.swiperArr[index] = new Swiper(this.$refs[`swiper-${index}`], {
                  initialSlide: that.swiperIndexArr[index],
                  direction: 'vertical',
                  centeredSlides: true,
                  slidesPerView: 5,
                  on: {
                    slideChange: function () {
                      that.swiperIndexArr[index] = this.activeIndex;
                      that.valueArr[index] = that.cList[index][that.swiperIndexArr[index]];
                      if (that.sync) {
                        that.syncValue();
                      }
                      that.cList = []
                      that.filterList(that.list, 0);
                      init3();
                    }
                  }
                });
              }
            })
          }
          init3();
        }
      },
      close() {
        this.swiperArr = [];
        this.$emit('update:show', false);
        this.$emit('close');
      },
      ok() {
        this.syncValue();
        this.close();
      },
      syncValue() {
        if (this.listType === 0) {
          this.$emit("input", this.valueArr[0]);
        } else {
          this.$emit("input", this.valueArr);
        }
      },
      bindClick(col, row) {
        this.swiperArr[col].slideTo(row);
      },
      //递归过滤数据
      filterList(data, deep = 0) {
        this.cList.push([]);
        data.forEach((item, index) => {
          let val = "";
          if (typeof item === "string") {
            val = item;
          } else {
            for (let key in item) {
              val = key;
              if (key === this.valueArr[deep]) {
                this.filterList(item[key], deep + 1);
              }
              break;
            }
          }
          this.cList[deep].push(val);
        });
      }
    },
    watch: {
      show() {
        if (this.show) {
          this.display();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .et-picker {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    z-index: 1001;
    &__mask {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.7);
    }
    &__main {
      position: absolute;
      bottom: 0;
      height: 660px;
      width: 100%;
      background: #fff;
      display: flex;
      flex-direction: column;
    }
    &__title {
      height: 118px;
      line-height: 118px;
      display: flex;
      border-bottom: 2px solid #ebebeb;
      box-sizing: border-box;
      &__left {
        padding: 0 40px;
        color: #999999;
        font-size: 28px;
      }
      &__mid {
        flex: 1;
        text-align: center;
        font-size: 32px;
        color: #222222;
      }
      &__right {
        padding: 0 40px;
        color: #d1a86a;
        font-size: 30px;
      }
    }
    &__body {
      flex: 1;
      display: flex;
      position: relative;
    }
    &__bar {
      position: absolute;
      height: 20%;
      width: 100%;
      background: #f9f9f9;
      top: 0;
      bottom: 0;
      margin: auto 0;
    }
    .swiper-container {
      flex: 1;
      height: 100%;
      text-align: center;
      .swiper-slide {
        font-size: 28px;
        color: #666666;
        /*height: 108px;*/
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        &-active {
          font-size: 32px;
          color: #222;
          font-weight: bold;
        }
        &-inner {
        }
      }
    }
  }
</style>