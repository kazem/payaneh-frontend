<template>
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content flex flex-col">
            <div class="flex justify-between items-center mb-6">
                <span @click="closeDialog" class="close">&times;</span>
                <p class="header text-3xl">بررسی درخواست</p>
                <p></p>
            </div>
            <div class="flex flex-col">
                <div class="flex justify-center items-center flex-col md:flex-row mb-4">
                    <p class="light md:ml-3">
                    از   
                    </p> 
                    <p class="bold">{{details?.srcCity}}</p>
                </div>
                <div class="flex justify-center items-center flex-col md:flex-row mb-4">
                    <p class="light md:ml-3">
                        به
                    </p>
                    <p class="bold">{{details?.destCity}}</p>
                </div>

                <div class="flex justify-center items-center flex-col mb-4">
                    <p class="light ml-3">
                        در تاریخ
                    </p>
                    <p class="bold">{{details?.date}}</p>                    
                </div>

                <div class="flex flex-col">
                    <p class="light">
                        ساعت حرکت
                    </p>
                    <div class="flex flex-row items-center justify-center w-full mb-4">
                        <p class="light ml-1">از <span class="bold">{{details?.fromTime}}</span></p>
                        <p class="light mr-1">تا <span class="bold">{{details?.toTime}}</span></p>
                    </div>
                </div>

                <div class="flex justify-center items-center flex-col md:flex-row mb-4">
                    <p class="light md:ml-3 mb-2 md:mb-0" style="direction: rtl;">
                         تاریخ اطلاع‌رسانی:
                    </p>
                    <div class="flex flex-col items-center justify-end">
                        <p class="light mb-1">از <span class="bold">{{details?.notifFrom}}</span></p>
                        <p class="light mt-1">تا <span class="bold">{{details?.notifTo}}</span></p>
                    </div>
                </div>                    
            </div>
            <button @click="confirm" :class="['confirm-btn', 'p-2', 'w-full', 'text-white']">
                تایید
            </button>     
        </div>
    </div>
</template>

<script>   
import { Observer } from 'mobx-vue';
  export default Observer ({
    name: 'Dialog',
    data() {
        return {
            details: null
        }
    },
    methods: {
        closeDialog(){
            console.log(' close dialog');
            var modal = document.getElementById("myModal");
            modal.style.display = "none";         
            this.$emit('closeDialog')
        },
        confirm(){

        }
    }
  });
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  overflow: hidden;
}

.modal-content {
  background-color: #fefefe;
  margin: 20% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 10px;
  max-width: 500px;  
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.header {
    font-family: 'iranyekan-num-bold';
}

.bold {
    font-family: 'iranyekan-num-bold';
}

.light {
    font-family: 'iranyekan-light';
}

.confirm-btn {
    font-family: 'iranyekan-num-bold';
    border-radius: 10px;
    background-color: #67c23a;
    border: 1px solid #67c23a;
}
</style>