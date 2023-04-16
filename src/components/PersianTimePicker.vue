<template>
<div class="persian-date-picker">
    <date-picker        
        v-bind="$attrs"
        v-model="date"
        type="time"       
        auto-submit
        :placeholder="placeholder"
        @input="changeValue"
        :min="getMinValue()"
        :jump-minute="30"
        :round-minute="true"
    />
</div>
  
</template>

<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

export default {
    data(){
        return {
            date: '',
        }                
    },
    props: {
        type: {
            type: String,
            default: "date"
        },
        placeholder: {
            type: String            
        }
    },
    components: {
        datePicker: VuePersianDatetimePicker
    },
    methods: {
        getMinValue(){          
            return new Date().toLocaleDateString('fa-IR-u-nu-latn') + ' 08:00';
        },
        changeValue(value){
            this.$emit('changeValue', value)
        }
    }

}
</script>

<style lang="less">


.persian-date-picker{
    font-family: 'iranyekan-num-regular';
    .vpd-input-group {
        display: flex;
        position: relative;
        input {
            flex-grow: 1;
            border: 1px solid #dadada; 
            border-radius: 5px;                      
            line-height: 30px;
            padding: 0 10px;
            text-align: center;

            &:not(.vpd-is-editable) {
                    cursor: pointer;
                }
                        
        }
        ::placeholder{
            text-align: center;
        }
            
        label {
            display: none;
            color: white;
            white-space: nowrap;
            background-color: rgb(65, 125, 244);

            svg + span {
                display: inline-block;
                margin-right: 4px;
                vertical-align: middle;
            }
        }
    }
}

.vpd-wrapper {
    font-family: 'iranyekan-num-regular';    
    .vpd-content {
        
        border-radius: 5px;
    }
    
}

</style>