import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import {  getData, postData } from "../../helper/http";
import { showError, successMsg } from "../../helper/utils";
export const usePaymentStore = defineStore("payment-store", () => {

    const paymentData = ref({});
    const loading = ref(false);


    

    async function refundPayment(payment) {
        try {
            loading.value = true;
            const data = await postData(`/payments/refund`,{
                id:payment?.paymentID,
                payment_id:payment.payment_id
            });
           successMsg(data?.message)
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }


    async function getPayments() {
        try {
            loading.value = true;
            const data = await getData(`/payments`);
            paymentData.value = data;
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

    
    return {
       
        paymentData,
        loading,
        refundPayment,
        getPayments
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePaymentStore, import.meta.hot));
}