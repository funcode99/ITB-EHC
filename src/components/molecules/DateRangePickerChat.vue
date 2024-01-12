<script setup>
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useStore } from 'vuex'

const date = ref();

const store = useStore()

const startDate = store.getters.startDateChat;
const endDate = store.getters.endDateChat;

date.value = [startDate, endDate]

const handleDate = (modelData) => {
    store.commit('startDateChat', modelData[0])
    store.commit('endDateChat', modelData[1])
}

</script>

<template>
    <Datepicker v-model="date" @update:model-value="handleDate" range :partial-range="false" :enable-time-picker="false"
        placeholder="Pilih Tanggal" format="MMMM dd, yyyy" />
</template>

<style>
.dp__input {
    border-radius: 10px;
}
</style>