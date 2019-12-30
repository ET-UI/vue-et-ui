<template>
  <div class="et-date-picker">
    <Picker :show.sync="cShow"
            v-model="pickerValue"
            :list="pickerList"
            :sync="sync"
            :title="title"></Picker>
  </div>
</template>

<script>
  import Picker from "./Picker"
  import {formatDate} from "./utils"


  export default {
    components: {
      Picker
    },
    name: "et-date-picker",
    props: {
      //picker属性
      //是否显示
      show: {
        type: Boolean,
      },
      value: {
        type: String,
      },
      //是否同步
      sync: {
        type: Boolean,
        default: false,
      },
      //标题
      title: {
        type: String,
      },

      //私有属性
      //类型：默认date日期选择，time时间选择
      type: {
        type: String,
        default: "date"
      },
      //范围，默认
      range: {
        type: Array,
      },
      //格式化
      format: {
        type: String,
      }
    },
    data() {
      return {
        cShow: false,
        pickerValue: [],
        pickerList: [],
        cRange: [],
        cFormat: "",
      }
    },
    mounted() {
      if (this.format === undefined) {
        if (this.type === "date") {
          this.cFormat = "yyyy-MM-dd";
        } else if (this.type === "time") {
          this.cFormat = "yyyy-MM-dd HH:mm";
        }
      } else {
        this.cFormat = this.format;
      }
      this.initVal();
      this.init();
    },
    beforeDestroy() {
    },
    methods: {
      //初始化值
      initVal() {
        let cur = new Date();
        if (this.value) {
          cur = new Date(this.value.replace(/-/g, "/"));
        }
        if (this.type === 'date') {
          this.pickerValue = [
            cur.getFullYear() + "",
            ((cur.getMonth() + 1) + "").padStart("2", "0"),
            (cur.getDate() + "").padStart("2", "0")]
        } else if (this.type === 'time') {
          this.pickerValue = [
            cur.getFullYear() + "",
            ((cur.getMonth() + 1) + "").padStart("2", "0"),
            (cur.getDate() + "").padStart("2", "0"),
            (cur.getHours() + "").padStart("2", "0"),
            (cur.getMinutes() + "").padStart("2", "0"),
          ]
        }
      },
      //初始化数据
      init() {
        let cur = new Date();
        // let startDate = new Date("1970/01/01 00:00:00");
        let endDate = new Date();
        endDate.setFullYear(cur.getFullYear() + 10);
        endDate = new Date(endDate);
        //处理2月29日的10年后没有2月29日，变为2月28日
        if (cur.getMonth() != endDate.getMonth()) {
          endDate.setDate(endDate.getDate() - 1);
        }
        if (this.range === undefined) {
          this.cRange = ["1970/01/01 00:00:00", formatDate(endDate, "yyyy/MM/dd") + " 23:59:59"]
        } else {
          this.cRange[0] = this.range[0] ? this.range[0].replace(/-/g, "/") : '';
          this.cRange[1] = this.range[1] ? this.range[1].replace(/-/g, "/") : '';
          if (!this.cRange[0] && this.cRange[1]) {
            this.cRange = ["1970/01/01 00:00:00", this.cRange[1]];
          } else if (this.cRange[0] && !this.range[1]) {
            this.cRange = [this.cRange[0], formatDate(endDate, "yyyy/MM/dd") + " 23:59:59"];
          } else {
            this.cRange = this.cRange;
          }
        }

        // 数据起始日期
        let startListDate = new Date(this.cRange[0]);
        let endListDate = new Date(this.cRange[1]);
        this.pickerList = this.initData([
          [
            startListDate.getFullYear(),
            startListDate.getMonth() + 1,
            startListDate.getDate(),
          ],
          [
            endListDate.getFullYear(),
            endListDate.getMonth() + 1,
            endListDate.getDate(),
          ],
        ])

        /*
        let startYear = startListDate.getFullYear();
        let endYear = endListDate.getFullYear();
        while (startYear <= endYear) {
          let yearObj = {};
          yearObj[startYear] = [];

          //起始月
          let startMonth = 1;
          if (startYear === startListDate.getFullYear()) {
            startMonth = startListDate.getMonth() + 1;
          }
          //终结日
          let endMonth = 12;
          if (startYear === endListDate.getFullYear()) {
            endMonth = endListDate.getMonth() + 1;
          }
          while (startMonth <= endMonth) {
            let monthObj = {};
            monthObj[(startMonth + "").padStart("2", "0")] = [];

            //起始日
            let startDay = 1;
            if (startYear === startListDate.getFullYear()
                && startMonth === startListDate.getMonth() + 1) {
              startDay = startListDate.getDate();
            }

            //终结日
            let lastDay = 28;
            if (startYear === endListDate.getFullYear()
                && startMonth === endListDate.getMonth() + 1) {
              lastDay = endListDate.getDate();
            } else {
              let tempDate = new Date();
              tempDate.setDate(1);
              tempDate.setMonth(startMonth);
              tempDate.setFullYear(startYear);
              tempDate.setDate(tempDate.getDate() - 1);
              lastDay = tempDate.getDate();
            }
            while (startDay <= lastDay) {
              let dayObj = {};
              if (this.type === "time") {
                dayObj[(startDay + "").padStart("2", "0")] =
                    this.initTimeData(startMonth, startMonth, startDay);
              } else {
                dayObj = (startDay + "").padStart("2", "0");
              }
              monthObj[(startMonth + "").padStart("2", "0")].push(dayObj);
              startDay++;
            }

            yearObj[startYear].push(monthObj);
            startMonth++;
          }
          this.pickerList.push(yearObj);
          startYear++;
        }*/
      },
      // deep
      initData(range = [], cur = [], deep = 0) {
        let r = [];
        let start;
        let end;
        console.log(cur, deep);
        switch (deep) {
          case 0: {//年
            start = range[0][deep];
            end = range[1][deep];
            break;
          }
          case 1: {//月
            start = 1;
            end = 12;
            if (cur[0] == range[0][0]) {
              start = range[0][deep];
            }
            if (cur[0] == range[1][0]) {
              end = range[1][deep];
            }
            break;
          }
          case 2: {//日
            start = 1;
            if (cur[0] == range[0][0]
                && cur[1] == range[0][1]) {
              start = range[0][deep];
            }
            end = 28;
            if (cur[0] == range[1][0]
                && cur[1] == range[1][1]) {
              end = range[1][deep];
            } else {
              let tempDate = new Date();
              tempDate.setDate(1);
              tempDate.setMonth(cur[1]);
              tempDate.setFullYear(cur[0]);
              tempDate.setDate(tempDate.getDate() - 1);
              end = tempDate.getDate();
            }
            break;
          }
        }

        let key = start;
        // console.log(key, end);
        while (key <= end) {
          let obj = {};
          cur[deep] = (key + "").padStart("2", "0");
          if (deep < range[0].length - 1) {
            obj[(key + "").padStart("2", "0")] = this.initData(range, cur, deep + 1);
          } else {
            obj = (key + "").padStart("2", "0");
          }
          r.push(obj);
          key++;
        }
        return r;
      }
    },
    watch: {
      show() {
        this.cShow = this.show;
      },
      cShow() {
        this.$emit("update:show", this.cShow);
      },
      pickerValue(nVal) {
        let valDate = "";
        if (this.type === "date") {
          valDate = new Date(`${nVal[0]}/${nVal[1]}/${nVal[2]}`);
        } else {
          valDate = new Date(`${nVal[0]}/${nVal[1]}/${nVal[2]} ${nVal[3]}:${nVal[4]}`);
        }

        this.$emit("input", formatDate(valDate, this.cFormat));
      }
    }
  }
</script>

<style lang="scss" scoped>
  .et-date-picker {
  }
</style>