<template>
  <div>
    <el-table
    ref="multipleTable"
    :data="data"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      property="time"
      label="ساعت"
      width="120">
      <!-- <template slot-scope="scope">{{ scope.row.time }}</template> -->
    </el-table-column>
    <el-table-column
      property="price"
      label="قیمت"
      width="120">
    </el-table-column>
    <el-table-column
      property="capacity"
      label="ظرفیت"
      show-overflow-tooltip>
    </el-table-column>
    </el-table>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">Toggle selection status of second and third rows</el-button>
      <el-button @click="toggleSelection()">Clear selection</el-button>
    </div> -->
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { observer } from 'mobx-vue';
export default observer ({
    components: {
        elTable: Table,
        elTableColumn: TableColumn
    },
    data () {    
      return {  
        multipleSelection: []
      }
    },
    props: {
      data: {
        type: Array
      }
    },
    mounted() {
      this.data = this.data.map(t => {
        console.log(t);
        return {...t, price: t.price.toLocaleString()}
      })
    },
    methods: {      
      handleSelectionChange(val) {        
        this.multipleSelection = val;
        console.log('this.multipleSelection: ', this.multipleSelection);
      }
    }
})
</script>

<style>
.is-leaf {
  font-family: 'iranyekan-num-bold'; 
}
.el-table__cell {
  font-family: 'iranyekan-num-regular';
}
</style>