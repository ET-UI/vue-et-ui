<template>
  <div id="picker">
    <h3>选项：</h3>
    <div @click="isSync = !isSync">
      是否同步
      <div>{{isSync}}</div>
    </div>
    <br />
    <h3>demo</h3>
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
    <ETPicker :show.sync="visible1"
              :z-index="10001"
            v-model="value1"
            :list="list1"
            :sync="isSync"
            title="单列picker"></ETPicker>

    <!--多列picker-->
    <ETPicker :show.sync="visible2"
            v-model="value2"
            :list="list2"
            :sync="isSync"
            title="多列picker"></ETPicker>

    <!--多列响应式picker-->
    <ETPicker :show.sync="visible22"
            v-model="value22"
            :list="list22"
            :sync="isSync"
            @cancel="cancel22"
            @slideChange="slideChange22"
            title="多列响应式"></ETPicker>

    <!--对象数据响应式picker-->
    <ETPicker :show.sync="visible3"
            v-model="value3"
            :list="list3"
            :sync="isSync"
            title="对象数据响应式"></ETPicker>

    <!--日期picker-->
    <ETDatePicker v-model="value4"
                  :z-index="10001"
                :sync="isSync"
                title="日期picker"
                :range="['2018-06-20','2020-02-15']"
                :show.sync="visible4"></ETDatePicker>
    <!--日期picker-时间-->
    <ETDatePicker v-model="value5"
                :sync="isSync"
                type="time"
                title="日期picker-时间"
                :range="['2018-11-15 12:30','2020-03-15 12:30']"
                :show.sync="visible5"></ETDatePicker>
  </div>
</template>

<script>
  import {ETPicker, ETDatePicker} from '@/components/index'

  export default {
    components: {
      ETPicker, ETDatePicker
    },
    name: 'picker',
    data() {
      return {
        isSync: false,
        value1: "选项2",
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

        value3: ["选项2", "子项5", "孙项0"],
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

        value4: "2019-12-04",
        // value4: "",
        visible4: false,

        value5: "",
        visible5: false,
      }
    },
    mounted() {
      setTimeout(()=>{
        this.value4 = '2020-01-01';
        this.value5 = '2020-01-01 13:30';
      })
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
