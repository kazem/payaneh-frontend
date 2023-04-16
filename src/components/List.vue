<template>
  <div
    class="selection"
   >
      <el-select @change="changeValue" :value="value" size="small" :placeholder="placeholder" :disabled="disable">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.title"
            :value="item.value"                                              
        >
        </el-option>
    </el-select>
  </div>
</template>

<script>
import { observer } from "mobx-vue";
import { Option, Select } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
export default observer ({    
    name: 'List',
    data() {
        return {
            value: ''
        }
    },
    components: {
        elSelect: Select,
        elOption: Option
    },
    props: {
        options: {
            type: Array
        },
        placeholder: {
            type: String,
            default: 'Select'
        },
        disable: {
            type: Boolean,
            default: false
        }
    }, 
    methods: {
        changeValue(value) {         
            this.value = value;
            this.$emit('changeValue', value)
        },
    }
})
</script>

<style lang="less">
    .selection {
        width: 100%;
        font-family: 'iranyekan-num-regular';

        .el-select {
            width: 100%;
        }
    }
</style>



