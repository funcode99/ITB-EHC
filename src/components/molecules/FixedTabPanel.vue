<script setup>
import Api from '@/utils/Api';
import { TabPanel } from '@headlessui/vue';
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from '@headlessui/vue'
import { ref, onBeforeMount } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const selectedItems = ref([])

const items = []

const store = useStore()

const toast = useToast();

onBeforeMount(() => {
    fetch()
})

const fetch = async () => {
    store.commit('isLoading', true);

    const token = JSON.parse(localStorage.getItem('token'))

    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const data = await Api.get('/leads/ehc-list')

    const config = await Api.get('/leads/share-leads-config')

    const configData = config.data.data.receivers

    items.push(...data.data.data)

    items.map(item => item.value = configData.find(e => e?.id == item?.id)?.value ?? 0)

    configData.map(item => {
        const data = items.find(e => e?.id == item?.id)
        selectedItems.value.push(data)
    })

    store.commit('isLoading', false);
}

const onReset = () => {
    selectedItems.value = []
    fetch()
}

const onSave = async () => {
    store.commit('isLoading', true);

    const receivers = selectedItems.value.map((item) => { return { id: item?.id, value: item?.value } })

    const params = {
        type: 'FIXED',
        receivers
    }

    await Api.put('/leads/share-leads-config', params)

    store.commit('isLoading', false);

    toast.success('Leads Distribution Sukses Diubah', { position: 'top-center', timeout: 1200 })
}

const removeItem = (item) => {
    selectedItems.value = selectedItems.value.filter((t) => t !== item)
}

</script>

<template>
    <TabPanel>

        <Listbox v-model="selectedItems" multiple>
            <div class="relative mt-1">
                <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span class="block truncate">{{
                        selectedItems.length > 0 ? selectedItems.map((item) =>
                            item?.name).join(', ') : 'Kosong'
                    }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-5 w-5 text-gray-400" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                        <ListboxOption v-slot="{ active, selected }" v-for="item in items" :key="item?.name" :value="item"
                            as="template">
                            <li :class="[
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-10 pr-4',
                            ]">
                                <span :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate',
                                ]">{{ item?.name }}</span>
                                <span v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="h-5 w-5" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
        <div :class="[
            'rounded-t-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 mt-2',
        ]">
            <ul>
                <li v-for="item in selectedItems" :key="item?.id">
                    <div class="flex justify-between">
                        <p>{{ item?.name }}</p>
                        <button @click="removeItem(item)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="flex gap-[15px] items-center">
                        <p>{{ item.value }}</p>
                        <input type="range" min="0" max="100" v-model="item.value" class="bg-[#d9d9d9] h-6 w-full" />
                    </div>
                </li>
            </ul>
        </div>



        <div class="bg-[#d9d9d9] rounded-b-xl py-[8px]">
            <div class="flex justify-end pr-[9px] text-[8px] gap-[5px]">
                Total Rates: {{
                    selectedItems.map(item => item.value)?.reduce((prev, next) => parseInt(prev) +
                        parseInt(next), 0)
                }}
                <div class="w-[11px] h-[11px] bg-[#838383] rounded-full text-white text-center">i</div>
            </div>
        </div>


        <!-- button -->
        <div class="flex justify-end gap-[7px] text-[8px] mt-[10px]">
            <button class="bg-white rounded-[10px] w-[63px] h-[20px]" @click="onReset">Reset</button>
            <button class="bg-[#37c200] rounded-[10px] w-[63px] h-[20px]" @click="onSave">Save</button>
        </div>
    </TabPanel>
</template>