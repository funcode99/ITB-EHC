<script setup>
import { ref } from 'vue'
import { TabGroup, TabList, Tab } from '@headlessui/vue'
import { useStore } from 'vuex';

const store = useStore()

const tabs = ref([
    "Semua",
    "Landing Page",
    "Chatbot",
    "Chatbot RO"
])

const changeTab = (index) => {
    store.commit('activeFilterTab', index)
}
</script>

<template>
    <TabGroup @change="changeTab">
        <TabList class="flex space-x-1 rounded-[10px] bg-[#227900] p-1">
            <Tab v-for="item in tabs" as="template" :key="item" v-slot="{ selected }">
                <button :class="[
                    'w-full rounded-full py-[3px] text-[10px] font-bold leading-5 text-white',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                    selected
                        ? 'bg-white text-[#227900]'
                        : 'text-green-100 hover:bg-white/[0.12] hover:text-white',
                ]">
                    {{ item }}
                </button>
            </Tab>
        </TabList>
    </TabGroup>
</template>
