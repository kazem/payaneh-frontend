<template>

<div>
    <div v-if="payanehStore.sourceProvinces" class="selection-form">
        <PersianDatePicker placeholder="تاریخ سفر" @changeValue="changeDateHandler"/>
        <div class="flex items-center justify-center mt-2 flex-col md:flex-row">
            <PersianTimePicker class="md:ml-1 w-full" placeholder="از ساعت" @changeValue="changeFromTimeHandler"/>
            <PersianTimePicker class="md:mr-1 md:mt-0 w-full mt-2" placeholder="تا ساعت" @changeValue="changeToTimeHandler"/>
        </div>
        <div class="source mt-8">
            <List class="ml-1" @changeValue="getSrcCities" :options="payanehStore.sourceProvinces" placeholder="استان مبدا"/>
            <List class="mr-1" @changeValue="getDestProvs" placeholder="شهر مبدا" :options="payanehStore.sourceCities" :disable="srcCitiesLoading"/>
        </div>
        <div class="source mt-8">
            <List class="ml-1" @changeValue="getDestCities" :options="payanehStore.destProvs" placeholder="استان مقصد" :disable="destProvsLoading"/>
            <List class="mr-1" @changeValue="setDestCity" placeholder="شهر مقصد" :options="payanehStore.destCities" :disable="destCitiesLoading"/>
        </div>
        <div class="notif-date my-8 p-4">
            <p>
                بازه اطلاع‌رسانی
            </p>
            <div class="source mt-4 flex-col md:flex-row">
                <PersianDatePicker class="md:ml-1 w-full" placeholder="از" type="datetime" @changeValue="changeNotifFromHandler"/>
                <PersianDatePicker class="md:mr-1 md:mt-0 w-full mt-2" placeholder="تا" type="datetime" @changeValue="changeNotifToHandler"/>
            </div>
        </div>
        <div class="btn flex align-center gap-2">
            <button :disabled="!ckeckValidation" @click="register" :class="['btn_register', 'p-2', 'w-full', 'text-white', !ckeckValidation ? 'btn_register_disabled' : '']">
                ثبت
            </button>
            <!-- <button :disabled="!checkSearchValidation" @click="search" :class="['btn_search', 'p-2', 'w-full', 'text-white', !checkSearchValidation ? 'btn_search_disabled' : '']">
                <p v-if="!searchLoading">جستجو</p>
                <div v-else class="btn_loader"></div>
            </button> -->
        </div>
        <my-table class="mt-3" v-if="tickets.length > 0" :data="tickets"/>
        <Dialog ref="detailsDialog"/>
    </div>
    <div v-else>Loading</div>
</div>
  
</template>

<script>
import PersianDatePicker from '../components/PersianDatePicker.vue'
import PersianTimePicker from '../components/PersianTimePicker.vue'
import List from '../components/List.vue'
import Dialog from '../components/Dialog.vue'
import Table from '../components/Table.vue'
import { payanehStore } from "@/store"
import { observer } from "mobx-vue";

export default observer ({
    name: 'Payaneh',
    components: {
        PersianDatePicker,
        PersianTimePicker,
        List,
        Dialog,
        myTable: Table
    },  
    data() {
        return {     
            payanehStore: payanehStore,
            srcCitiesLoading:  true,
            destProvsLoading: true,
            destCitiesLoading: true,
            searchLoading: false,
            srcProv: null,
            srcCity: null,
            destProv: null,
            destCity: null,
            date: null,
            fromTime: null,
            toTime: null,
            notifFrom: null,
            notifTo: null,
            showDialog: true,   
            tickets: []         
        }
    },
    computed: {
        ckeckValidation() {
            if(this.srcCity && this.destCity && this.date && this.notifFrom && this.notifTo)
                return true;
            return false;
        },
        checkSearchValidation() {
            //if(this.srcCity && this.destCity && this.date)
                return true;
            //return false;
        }
    },
    methods: {    
        changeFromTimeHandler(value){         
            this.fromTime = value
        },
        changeToTimeHandler(value){     
            this.toTime = value
        },
        changeNotifFromHandler(value){
            this.notifFrom = value;      
        },

        changeNotifToHandler(value) {
            this.notifTo = value;         
        },

        async getSrcProvinces() {            
            await this.payanehStore.GetSrcProvinces();                
        },

        async getSrcCities(provinceId) { 
            this.srcProv = provinceId;
            this.srcCitiesLoading = true;             
            await this.payanehStore.getSrcCities(provinceId);
            this.srcCitiesLoading = false;        
        },

        async getDestProvs(cityId) {   
            this.destProvsLoading = true;     
            this.srcCity = cityId;     
            await this.payanehStore.getDestProvs(cityId);
            this.destProvsLoading = false;                  
        },

        async getDestCities(destProvinceId) { 
            this.destProv = destProvinceId;
            this.destCitiesLoading = true;            
            await this.payanehStore.getDestCities(destProvinceId, this.srcCity);
            this.destCitiesLoading = false;        
        },

        setDestCity(destCityId) {
            this.destCity = destCityId
        },

        changeDateHandler(value) {           
            this.date = value
        },
        register(){
            console.log('this.$refs.detailsDialog.details: ', this.$refs.detailsDialog.details);
            this.$refs.detailsDialog.details = {
                srcCity: this.payanehStore.sourceCities.find(c => c.value === this.srcCity).title,
                destCity: this.payanehStore.destCities.find(c => c.value === this.destCity).title,
                date: this.date,
                fromTime: this.fromTime,
                toTime: this.toTime,
                notifFrom: this.notifFrom,
                notifTo: this.notifTo
            }
            console.log('this.$refs.detailsDialog.details: ', this.$refs.detailsDialog.details);
            var modal = document.getElementById("myModal");
            modal.style.display = "block";          
        },
        async search(){
            this.searchLoading = true;
            this.tickets = await this.payanehStore.getTickets(this.srcCity, this.destCity, this.date);
            this.searchLoading = false;
        }
    },  
    async created(){
        await this.getSrcProvinces();
    }              
})
</script>

<style lang="less" scoped>
.selection-form {
    margin: 10% auto;   
    max-width: 500px;   
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 2rem 2rem;

    .source {        
        display: flex;
        justify-content: center;
        align-items: center;        
    }

    .notif-date {
        font-family: 'iranyekan-num-regular';
        border-radius: 10px;
        border: 1px solid rgba(99, 99, 99, 0.2);
    }

    .btn {
        font-family: 'iranyekan-num-bold';        
        &_register {
            background-color: #409eff;
            border: 1px solid #409eff;
            border-radius: 10px;
            &_disabled {
                background-color: #a0cfff;
                border: 1px solid #a0cfff;
                cursor: not-allowed;
            }
        }

        &_search {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ff409e;
            border: 1px solid #ff409e;
            border-radius: 10px;
            &_disabled {
                background-color: #ffddee;
                border: 1px solid #ffddee;
                cursor: not-allowed;
            }
        }

        &_loader {
            border: 2px solid #ff409e;
            border-radius: 50%;
            border-top: 2px solid #fff;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        }
    }   
}
</style>