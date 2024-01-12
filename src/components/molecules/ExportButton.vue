<script setup>
import Api from '@/utils/Api';
import moment from 'moment';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const store = useStore()
const toast = useToast()

const onClick = async () => {
    store.commit('isLoading', true)

    const start_date = moment(store.getters.startDate).format('YYYY-MM-DD')
    const end_date = moment(store.getters.endDate).format('YYYY-MM-DD')

    const params = {
        params: {
            start_date,
            end_date
        },
        responseType: 'blob'
    }

    await Api.get('/leads/export-leads', params).then((response) => {
        console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/xlsx' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `leads-${start_date}s.d${end_date}.xlsx`);
        document.body.appendChild(link);
        link.click();
    })

    store.commit('isLoading', false)

    toast.success('Sukses Export Leads', { position: 'top-center', timeout: 1200 })
}
</script>

<template>
    <button @click="onClick" type="button"
        class="inline-flex w-full items-center bg-white px-4 py-2 text-sm font-medium text-[#626262] hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-[10px]">
        <img class="w-[14px] h-[14px] mr-[6px]" src="@/assets/export.svg" alt="export">
        Export
    </button>
</template>