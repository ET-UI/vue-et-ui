<template>
  <div class="et-picker" v-if="show">
    <div class="et-picker__mask" @click="sync?close():''">
    </div>
    <div class="et-picker__main">
      <div class="et-picker__title">
        <div class="et-picker__title__left"
             v-if="!sync"
             @click.stop="!sync?cancel():''">
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
      //是否显示
      show: {
        type: Boolean,
        default: false,
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
      },
      //比例
      scale: {
        type: Array,
      }
    },
    data() {
      return {
        oldValue: null,
        cList: [],//当前数据
        listType: 0,//数据类型，0单列，1多列，2对象
        swiperArr: [],//swiper数组
        swiperIndexArr: [],//swiper下标数组
        valueArr: [],//值数组
      }
    },
    mounted() {
      this.init();
      if (this.show) {
        this.display();
      }
    },
    beforeDestroy() {
      this.swiperArr = [];
    },
    methods: {
      init() {
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
          this.valueArr = JSON.parse(JSON.stringify(this.value));
          this.cList.forEach((item, index) => {
            this.swiperIndexArr.splice(index, 1, 0);
            item.every((item2, index2) => {
              if (item2 == this.value[index]) {
                this.swiperIndexArr[index] = index2;
                return false;
              }
              return true;
            });
          });
        } else if (this.listType === 2) {
          this.valueArr = JSON.parse(JSON.stringify(this.value));
          this.cList = [];
          this.filterList(this.list);
          this.cList.forEach((item, index) => {
            this.swiperIndexArr.splice(index, 1, 0);
            item.every((item2, index2) => {
              if (item2 == this.value[index]) {
                this.swiperIndexArr[index] = index2;
                return false;
              }
              return true;
            });
          });
        }
      },
      display() {
        setTimeout(() => {
          this.initSwiper();
        });
      },
      initSwiper(isRefresh) {
        let that = this;
        if (!isRefresh) {
          this.swiperArr = [];
        }
        if (this.listType == 0) {
          this.swiperArr.splice(0, 1, new Swiper(this.$refs['swiper-0'], {
            initialSlide: that.swiperIndexArr[0],
            direction: 'vertical',
            centeredSlides: true,
            slidesPerView: 5,
            on: {
              slideChange: function () {
                that.swiperIndexArr[0] = this.activeIndex;
                that.valueArr.splice(0, 1, that.cList[that.swiperIndexArr[0]]);
                that.$emit("slideChange", that.valueArr);
                if (that.sync) {
                  that.syncValue();
                }
              }
            }
          }));
        } else if (this.listType == 1 || this.listType == 2) {
          //长度调整，重置siwper
          if (this.swiperArr.length != this.cList.length) {
            this.swiperArr.forEach((item, index) => {
              item && item.destroy();
            });
            this.swiperArr = [];
            this.valueArr.splice(this.cList.length);
          }

          this.cList.forEach((item, index) => {
            // 选项是否不同
            let isItemDifferent = (item.indexOf(this.valueArr[index]) != this.swiperIndexArr[index]);
            // console.log('跳到顶部1');
            let valIndex = 0;
            if (item.indexOf(this.valueArr[index]) > 0) {
              valIndex = item.indexOf(this.valueArr[index]);
            }
            if (isItemDifferent) {
              this.valueArr.splice(index, 1, item[valIndex]);
              this.swiperIndexArr.splice(index, 1, valIndex);
            }

            if (this.swiperArr[index]) {
              this.swiperArr[index].update();
              if (isItemDifferent) {
                this.swiperArr[index] && this.swiperArr[index].slideTo(valIndex);
              }
            } else {
              this.swiperArr.splice(index, 1,
                  new Swiper(this.$refs[`swiper-${index}`], {
                    initialSlide: that.swiperIndexArr[index],
                    direction: 'vertical',
                    centeredSlides: true,
                    slidesPerView: 5,
                    on: {
                      slideChange: function () {
                        that.swiperIndexArr[index] = this.activeIndex;
                        that.valueArr.splice(index, 1, that.cList[index][that.swiperIndexArr[index]])
                        if (that.sync) {
                          that.syncValue();
                        }

                        if (that.listType == 1) {
                          that.$emit("slideChange", that.valueArr);
                          that.$nextTick(() => {
                            that.cList = [];
                            that.cList = that.list;
                            that.$nextTick(() => {
                              that.initSwiper(true);
                            });
                          });
                        } else if (that.listType == 2) {
                          that.cList = []
                          that.filterList(that.list, 0);
                          that.$nextTick(() => {
                            that.initSwiper(true);
                          });
                        }
                      }
                    }
                  })
              );
            }
          });
        }
      },
      close() {
        this.swiperArr = [];
        this.$emit('update:show', false);
        this.$emit('close');
      },
      cancel() {
        this.$emit("cancel");
        this.$emit("input", this.oldValue);
        this.close();
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
      //对象数据-递归过滤数据
      filterList(data, deep = 0) {
        this.cList.splice(deep, 1, []);
        data.forEach((item, index) => {
          let val = "";
          if (typeof item === "string") {
            val = item;
          } else {
            let key = Object.keys(item)[0];
            val = key;
            //校验数组，检测当前选择是否可选
            let checkArray = data.filter(item2 => {
              let key2 = "";
              if (typeof item2 === "string") {
                key2 = item2;
              } else {
                key2 = Object.keys(item2)[0];
              }
              return key2 == this.valueArr[deep];
            });
            if (checkArray.length > 0) {
              if (key === this.valueArr[deep]) {
                this.filterList(item[key], deep + 1);
              }
            } else {
              let firstItem = data[0];
              let firstKey = Object.keys(data[0])[0];
              this.filterList(firstItem[firstKey], deep + 1);
            }
          }
          this.cList[deep].push(val);
        });
      }
    },
    watch: {
      show() {
        if (this.show) {
          this.oldValue = JSON.parse(JSON.stringify(this.value));
          this.init();
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