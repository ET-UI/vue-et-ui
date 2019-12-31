<template>
  <div id="picker">
    <div @click="visible1 = true">
      picker - 单列
      <div>{{value1}}</div>
    </div>
    <br />
    <div @click="visible2 = true">
      picker - 多列
      <div>{{value2}}</div>
    </div>
    <br />
    <div @click="visible22 = true">
      picker - 多列响应式
      <div>{{value22}}</div>
    </div>
    <br />
    <div @click="visible3 = true">
      picker - 对象数据响应式
      <div>{{value3}}</div>
    </div>
    <br />
    <div @click="visible4 = true">
      datePicker - 日期选择
      <div>{{value4}}</div>
    </div>
    <br />
    <div @click="visible5 = true">
      datePicker - 时间选择
      <div>{{value5}}</div>
    </div>

    <!--单列picker-->
    <Picker :show.sync="visible1"
            v-model="value1"
            :list="list1"
            title="单列picker"></Picker>

    <!--多列picker-->
    <Picker :show.sync="visible2"
            v-model="value2"
            :list="list2"
            title="多列picker"></Picker>

    <!--多列响应式picker-->
    <Picker :show.sync="visible22"
            v-model="value22"
            :list="list22"
            @cancel="cancel22"
            @slideChange="slideChange22"
            title="多列响应式"></Picker>

    <!--对象数据响应式picker-->
    <Picker :show.sync="visible3"
            v-model="value3"
            :list="list3"
            :sync="true"
            title="对象数据响应式"></Picker>

    <!--日期picker-->
    <DatePicker v-model="value4"
                :sync="false"
                title="日期picker"
                :range="['2018-11-15','2020-03-15']"
                :show.sync="visible4"></DatePicker>
    <!--日期picker-时间-->
    <DatePicker v-model="value5"
                :sync="true"
                type="time"
                title="日期picker-时间"
                :range="['2018-11-15 12:30','2020-03-15 12:30']"
                :show.sync="visible5"></DatePicker>
  </div>
</template>

<script>
  import {Picker, DatePicker} from '@/components/index'

  export default {
    components: {
      Picker, DatePicker
    },
    name: 'picker',
    data() {
      return {
        value1: "选项4",
        visible1: false,
        list1: [
          '选项1',
          '选项2',
          '选项3',
          '选项4',
          '选项5',
        ],

        value2: ["选项2", "选项4"],
        visible2: false,
        list2: [
          [
            '选项1',
            '选项2'
          ],
          [
            '选项3',
            '选项4'
          ]
        ],

        value22: ["选项2", "选项4"],
        visible22: false,
        list22: [
          [
            '选项1',
            '选项2'
          ],
          [
            '选项3',
            '选项4'
          ]
        ],

        value3: ["选项2", "子项4"],
        visible3: false,
        list3: [
          {
            "选项1": [
              {'子项1': ['孙项1', '孙项1.1', '孙项2', '孙项3']},
              '子项2'
            ]
          },
          {
            "选项2": [
              {'子项3': ['孙项1', '孙项1.1', '孙项2', '孙项3']},
              '子项4',
              {'子项5': ['孙项1', '孙项2', '孙项1.1', '孙项3']}
            ]
          },
        ],

        value4: "2018-11-20",
        // value4: "",
        visible4: false,

        value5: "",
        visible5: false,
      }
    },
    mounted() {

    },
    methods: {
      cancel22() {
        this.list22 = [
          [
            '选项1',
            '选项2',
          ],
          [
            '选项3',
            '选项4'
          ]
        ]
      },
      slideChange22(valArr) {
        if (valArr[0] == "选项1") {
          this.list22 = [
            [
              '选项1',
              '选项2',
            ],
            [
              '选项5',
              '选项6',
              '选项4',
            ]
          ];
        } else {
          this.cancel22();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #picker {
  }
</style>
