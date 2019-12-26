<template>
  <div id="picker">
    <div @click="visible1 = true">
      picker - 单列
      <div>{{value1}}</div>
    </div>
    <div @click="visible2 = true">
      picker - 多列
      <div>{{value2}}</div>
    </div>
    <div @click="visible3 = true">
      picker - 响应式
      <div>{{value3}}</div>
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
    <!--响应式picker-->
    <Picker :show.sync="visible3"
            v-model="value3"
            :list="list3"
            :sync="false"
            title="响应式picker"></Picker>
  </div>
</template>

<script>
  import {Picker} from '@/components/index'

  export default {
    components: {
      Picker
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

        value3: ["选项2", "子项4"],
        visible3: false,
        list3: [
          {
            "选项1": [
              '子项1',
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
        ]
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  #picker {
  }
</style>
