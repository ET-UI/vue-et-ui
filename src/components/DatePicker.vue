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
      }
    },
    mounted() {
      if (this.format === undefined) {
        if (this.type === "date") {
          this.format = "yyyy-MM-dd";
        } else if (this.type === "time") {
          this.format = "yyyy-MM-dd HH:mm:ss";
        }
      }
      this.initVal();
      this.initData();
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
        this.pickerValue = [
          cur.getFullYear() + "",
          ((cur.getMonth() + 1) + "").padStart("2", "0"),
          (cur.getDate() + "").padStart("2", "0")]
      },
      //初始化数据
      initData() {
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
          this.cRange[0] = this.cRange[0] ? this.cRange[0].replace(/-/g, "/") : '';
          this.cRange[1] = this.cRange[1] ? this.cRange[1].replace(/-/g, "/") : '';
          if (!this.range[0] && this.range[1]) {
            this.cRange = ["1970/01/01 00:00:00", this.range[1]];
          } else if (this.range[0] && !this.range[1]) {
            this.cRange = [this.range[0], formatDate(endDate, "yyyy/MM/dd") + " 23:59:59"];
          } else {
            this.cRange = this.range;
          }
        }

        // 列表日期起始
        let startListDate = new Date(this.cRange[0]);
        let endListDate = new Date(this.cRange[1]);
        let startYear = startListDate.getFullYear();
        let endYear = endListDate.getFullYear();
        while (startYear <= endYear) {
          let yearObj = {};
          yearObj[startYear] = [];
          let startMonth = 1;
          if (startYear === startListDate.getFullYear()) {
            startMonth = startListDate.getMonth() + 1;
          }
          while (startMonth <= 12) {
            let monthObj = {};
            monthObj[(startMonth + "").padStart("2", "0")] = [];

            let startDay = 1;
            if (startYear === startListDate.getFullYear()) {
              startDay = startListDate.getDate();
            }
            let lastDay = 28;
            let tempDate = new Date();
            tempDate.setDate(1);
            tempDate.setMonth(startMonth);
            tempDate.setFullYear(startYear);
            tempDate.setDate(tempDate.getDate() - 1);
            lastDay = tempDate.getDate();

            while (startDay <= lastDay) {
              let dayObj = (startDay + "").padStart("2", "0");
              monthObj[(startMonth + "").padStart("2", "0")].push(dayObj);
              startDay++;
            }

            yearObj[startYear].push(monthObj);
            startMonth++;
          }
          this.pickerList.push(yearObj);
          startYear++;
        }
      },
    }
    ,
    watch: {
      show() {
        this.cShow = this.show;
      },
      cShow() {
        this.$emit("update:show", this.cShow);
      },
      pickerValue(nVal) {
        if (this.type === "date") {
          let valDate = new Date(nVal[0] + "/" + nVal[1] + "/" + nVal[2])
          this.$emit("input", formatDate(valDate, this.format));
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .et-date-picker {
  }
</style>