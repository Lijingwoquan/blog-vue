<template>
    <el-card shadow="never" style="width: 100%;">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">关键字排行</span>
                <div>
                    <el-check-tag v-for="(item, index) in options" :key="index" :checked="current == item.value"
                        @click="handerlChose(item.value)" type="primary" style="margin-right:8px;">
                        {{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>

        <div ref="el" id="chart" style="height: 300px; width: 100%;" class="">

        </div>
    </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue"
import * as echarts from 'echarts';
import { getKeywordsRank } from "~/api/count.js"
import { useResizeObserver } from '@vueuse/core'

const keywordRankArr = ref([])
const current = ref(0)
const options =
    [{
        text: "年排行",
        value: 0
    },
    {
        text: "月排行",
        value: 1
    },
    {
        text: "周排行",
        value: 2
    }]

const handerlChose = (index) => {
    current.value = index
    getData(index)
}

let myChart = null

const el = ref(null)


function getData(index) {
    let option = {
        xAxis: {
            data: keywordRankArr.value[index].x,
        },
        yAxis: {},
        legend: {
            data: ['搜索次数']
        },
        series: [
            {
                name: "搜索次数",//配合 legend 配置项，可进行图例筛选
                type: "bar",//必须
                data:keywordRankArr.value[index].y,
                label: {//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                    show: true,//是否显示
                    position: 'top'//标签的位置
                },
                itemStyle: { //图形样式
                    color: "#59c4e6", //柱条的颜色(可配置渐变色)。 默认从全局调色盘 option.color 获取颜色。
                },
                barWidth: 30,//柱条的宽度，不设时自适应。
                selectedMode: true,//是否支持选中,默认false
                select: { //配置数据选中时的图形样式和标签样式。开启 selectedMode 后有效。
                    itemStyle: {
                        color: "#edafda", //选中的柱条颜色(可配置渐变色)
                    },
                }
            },
        ],
    }
    myChart.showLoading();
    myChart.setOption(option)
    myChart.hideLoading();

}

onBeforeMount(() => {
    if (myChart) {
        echarts.dispose(myChart)
    }
})

onMounted(async () => {
    await getKeywordsRank()
        .then(res => {
            keywordRankArr.value.push({ x: res.year.x, y: res.year.y })
            keywordRankArr.value.push({ x: res.month.x, y: res.month.y })
            keywordRankArr.value.push({ x: res.week.x, y: res.week.y })
        })
    let chartDom = document.getElementById("chart")
    if (chartDom) {
        myChart = echarts.init(chartDom)
        getData(0)
    }
})



useResizeObserver(el, (entries) => {
    myChart.resize()
})
</script>