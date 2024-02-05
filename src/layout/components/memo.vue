<template>
    <div class="flex justify-center items-center">
        <el-row>
            <el-col :span="4" class="m-0"></el-col>
            <el-col :span="16" class="m-0" >
                <el-calendar>
                    <template #date-cell="{ data }">
                        <div class="cell" @click="addTips">
                            <p :class="data.isSelected ? 'is-selected' : ''" >
                                {{ data.day.split('-').slice(1).join('-') }}
                                <!-- {{ data.isSelected }} -->
                            </p>
                            
                        </div>
                    </template>
                </el-calendar>
            </el-col>
            <el-col :span="4" class="m-0"></el-col>

        </el-row>
    </div>
</template>
  
<script  setup>
import { ref } from 'vue'
const value = ref(new Date())

function addTips() {
    
}

</script>


<style>
.is-selected {
    color: #1989fa;
}
.el-calendar {
    width: 100%;
}

</style>