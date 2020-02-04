<template>
  <div class="et-date-picker">
    <Picker :show.sync="cShow"
            :z-index="zIndex"
            v-model="pickerValue"
            :list="pickerList"
            :sync="sync"
            @cancel="cancel"
            :insert-text="['-','-','',':']"
            @slideChange="slideChange"
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
      },
      //层级
      zIndex:{
        type: Number,
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
        let startDate = new Date();
        //默认前后5年
        startDate.setFullYear(cur.getFullYear() - 5);
        startDate = new Date(startDate);
        let endDate = new Date();
        endDate.setFullYear(cur.getFullYear() + 5);
        endDate = new Date(endDate);
        //处理2月29日的10年后没有2月29日，变为2月28日
        if (cur.getMonth() != endDate.getMonth()) {
          endDate.setDate(endDate.getDate() - 1);
        }
        if (this.range === undefined) {
          this.cRange = [formatDate(startDate, "yyyy/MM/dd") + " 00:00:00", formatDate(endDate, "yyyy/MM/dd") + " 23:59:59"]
        } else {
          this.cRange[0] = this.range[0] ? this.range[0].replace(/-/g, "/") : '';
          this.cRange[1] = this.range[1] ? this.range[1].replace(/-/g, "/") : '';
          if (!this.cRange[0] && this.cRange[1]) {
            this.cRange = [formatDate(startDate, "yyyy/MM/dd") + " 00:00:00", this.cRange[1]];
          } else if (this.cRange[0] && !this.range[1]) {
            this.cRange = [this.cRange[0], formatDate(endDate, "yyyy/MM/dd") + " 23:59:59"];
          }
        }

        if (this.type === 'date') {
          this.pickerList = this.initData(this.pickerValue[0], this.pickerValue[1], this.pickerValue[2]);
        } else if (this.type === 'time') {
          this.pickerList = this.initData(this.pickerValue[0],
              this.pickerValue[1],
              this.pickerValue[2],
              this.pickerValue[3],
              this.pickerValue[4],
          );
        }
      },
      /**
       * 初始化数据
       * @param year
       * @param month
       * @param day
       * @param hour
       * @param minutes
       * @return {Array}
       */
      initData(year, month, day, hour, minutes) {
        let result = [];
        let yearList = [];
        let monthList = [];
        let dayList = [];
        let hourList = [];
        let minuteList = [];

        let startDate = new Date(this.cRange[0]);
        let endDate = new Date(this.cRange[1]);

        //年
        let startYear = startDate.getFullYear();
        let endYear = endDate.getFullYear();
        for (let y = startYear; y <= endYear; y++) {
          yearList.push(y + "");
        }

        //月
        let startMonth = 1;
        let endMonth = 12;
        if (year <= startYear) {
          startMonth = startDate.getMonth() + 1;
          endMonth = 12;
        }
        if (year >= endYear) {
          startMonth = 1;
          endMonth = endDate.getMonth() + 1;
        }
        for (let M = startMonth; M <= endMonth; M++) {
          monthList.push((M + "").padStart("2", "0"));
        }

        //日
        let startDay = 1;
        let endDay = 31;
        let tempDate = new Date();
        tempDate.setDate(1);
        tempDate.setMonth(month);
        tempDate.setFullYear(year);
        tempDate.setDate(tempDate.getDate() - 1);
        endDay = tempDate.getDate();

        if (year <= startYear && month <= startMonth) {
          startDay = startDate.getDate();
        }
        if (year >= endYear && month >= endMonth) {
          endDay = endDate.getDate();
        }
        for (let d = startDay; d <= endDay; d++) {
          dayList.push((d + "").padStart("2", "0"));
        }

        result.splice(0, 1, yearList);
        result.splice(1, 1, monthList);
        result.splice(2, 1, dayList);

        if (this.type === 'time') {
          //时
          let startHour = 0;
          let endHour = 23;

          if (year <= startYear
              && month <= startMonth
              && day <= startDay) {
            startHour = startDate.getHours();
          }
          if (year >= endYear
              && month >= endMonth
              && day >= endDay) {
            endHour = endDate.getHours();
          }
          for (let h = startHour; h <= endHour; h++) {
            hourList.push((h + "").padStart("2", "0"));
          }

          result.splice(3, 1, hourList);

          //分
          let startMinute = 0;
          let endMinute = 59;

          if (year <= startYear
              && month <= startMonth
              && day <= startDay
              && hour <= startHour) {
            startMinute = startDate.getMinutes();
          }
          if (year >= endMonth
              && month >= endMonth
              && day >= endDay
              && hour >= endHour) {
            endMinute = endDate.getMinutes();
          }
          for (let m = startMinute; m <= endMinute; m++) {
            minuteList.push((m + "").padStart("2", "0"));
          }

          result.splice(4, 1, minuteList);
        }

        // console.log(result);
        return result;
      },
      //取消
      cancel() {
        if (this.type === 'date') {
          this.pickerList = this.initData(this.pickerValue[0], this.pickerValue[1], this.pickerValue[2]);
        } else if (this.type === 'time') {
          this.pickerList = this.initData(
              this.pickerValue[0],
              this.pickerValue[1],
              this.pickerValue[2],
              this.pickerValue[3],
              this.pickerValue[4],
          );
        }
      },
      /**
       * picker的值被修改时处理数据
       * @param val
       */
      slideChange(val) {
        // console.log(val);
        if (this.type === 'date') {
          this.pickerList = this.initData(val[0], val[1], val[2]);
        } else if (this.type === 'time') {
          this.pickerList = this.initData(
              val[0],
              val[1],
              val[2],
              val[3],
              val[4],
          );
        }
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