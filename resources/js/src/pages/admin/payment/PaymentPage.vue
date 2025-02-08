<script setup>
import { onMounted } from "vue";
import PaymentTable from './components/PaymentTable.vue'
import { usePaymentStore } from "../../../stores/payments/payment-store";
import { promptUser } from "../../../helper/utils";
// import CustomerTable from "./components/CustomerTable.vue";



const paymentStore=usePaymentStore()


async function refund(payment){

    promptUser('do you want to refund the payment ?').then(async function(){
        await paymentStore.refundPayment(payment)
        await paymentStore.getPayments()

    }).catch((error)=>console.log(error))

}


onMounted(async () => {
    await paymentStore.getPayments()
});
</script>
<template>
    <div class="ml-4 mr-4">

       
        <h1 class="text-2xl mb-4">Payments</h1>
        
        <PaymentTable @refund="refund" :payments="paymentStore.paymentData" />

        
    </div>
</template>

